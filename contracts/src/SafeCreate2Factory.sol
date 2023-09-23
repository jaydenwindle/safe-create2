// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IAxelarGateway} from "axelar-gmp-sdk-solidity/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "axelar-gmp-sdk-solidity/interfaces/IAxelarGasService.sol";
import {Strings} from "openzeppelin/utils/Strings.sol";
import {MerkleProof} from "openzeppelin/utils/cryptography/MerkleProof.sol";

contract SafeCreate2Factory {
    error Create2FailedDeployment();
    error InvalidContractHash();
    error GasPaymentRequired();
    error NotApprovedByGateway();

    bytes32 immutable bridgeRoot;

    IAxelarGateway gateway;
    IAxelarGasService gasService;

    // origin chain ID => creator address => salt => keccack256(abi.encode(bytecode, initData))
    mapping(uint256 => mapping(address => mapping(bytes32 => bytes32))) contractHash;

    constructor(bytes32 _bridgeRoot) {
        bridgeRoot = _bridgeRoot;
    }

    function enableBridge(address _gateway, address _gasService, bytes32[] calldata proof) external {
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(block.chainid, _gateway, _gasService))));
        require(MerkleProof.verify(proof, bridgeRoot, leaf), "Invalid proof");
        gateway = IAxelarGateway(_gateway);
        gasService = IAxelarGasService(_gasService);
    }

    function setRemoteContractHash(
        bytes32 salt,
        bytes memory bytecode,
        bytes calldata initData,
        string calldata destinationChain
    ) external payable {
        if (getContractHash(block.chainid, msg.sender, salt) == bytes32(0)) setContractHash(salt, bytecode, initData);
        if (msg.value == 0) revert GasPaymentRequired();

        bytes memory payload = abi.encode(block.chainid, msg.sender, salt, keccak256(abi.encode(bytecode, initData)));
        string memory _self = Strings.toHexString(address(this));

        gasService.payNativeGasForContractCall{value: msg.value}(
            address(this), destinationChain, _self, payload, msg.sender
        );

        gateway.callContract(destinationChain, _self, payload);
    }

    function create(
        uint256 originChainId,
        address creator,
        bytes32 salt,
        bytes calldata bytecode,
        bytes calldata initData
    ) external returns (address addr) {
        bytes32 _contractHash = keccak256(abi.encode(bytecode, initData));
        if (_contractHash != getContractHash(originChainId, creator, salt)) revert InvalidContractHash();

        bytes32 _contractSalt = keccak256(abi.encode(originChainId, creator, salt));

        bytes memory _bytecode = abi.encodePacked(bytecode, creator);

        assembly {
            addr := create2(0, add(_bytecode, 0x20), mload(_bytecode), _contractSalt)
        }

        if (addr == address(0)) {
            revert Create2FailedDeployment();
        }

        if (initData.length > 0) {
            (bool success,) = addr.call(initData);
            if (!success) revert Create2FailedDeployment();
        }
    }

    function execute(
        bytes32 commandId,
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload
    ) external {
        bytes32 payloadHash = keccak256(payload);

        if (!gateway.validateContractCall(commandId, sourceChain, sourceAddress, payloadHash)) {
            revert NotApprovedByGateway();
        }

        (uint256 originChainId, address creator, bytes32 salt, bytes32 _contractHash) =
            abi.decode(payload, (uint256, address, bytes32, bytes32));

        contractHash[originChainId][creator][salt] = _contractHash;
    }

    function setContractHash(bytes32 salt, bytes memory bytecode, bytes calldata initData) public {
        contractHash[block.chainid][msg.sender][salt] = keccak256(abi.encode(bytecode, initData));
    }

    function getContractHash(uint256 originChainId, address creator, bytes32 salt) public view returns (bytes32) {
        return contractHash[originChainId][creator][salt];
    }
}
