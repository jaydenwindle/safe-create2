// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IAxelarGateway} from "axelar-gmp-sdk-solidity/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "axelar-gmp-sdk-solidity/interfaces/IAxelarGasService.sol";
import {Strings} from "openzeppelin/utils/Strings.sol";
import {MerkleProof} from "openzeppelin/utils/cryptography/MerkleProof.sol";

import {StringCasing} from "./lib/StringCasing.sol";

contract SafeCrossChainFactory {
    error Create2FailedDeployment();
    error InvalidContractHash();
    error GasPaymentRequired();
    error NotApprovedByGateway();
    error InvalidCaller();

    event ContractCreated(address created);

    bytes32 public immutable bridgeRoot;

    IAxelarGateway public gateway;
    IAxelarGasService public gasService;

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

    function setContractHashRemote(
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

        bytes memory _bytecode = abi.encodePacked(bytecode, bridgeRoot, creator);

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

        emit ContractCreated(addr);
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

        string memory _source = StringCasing.toLower(bytes(sourceAddress));
        string memory _self = Strings.toHexString(address(this));

        if (!Strings.equal(_source, _self)) {
            revert InvalidCaller();
        }

        (uint256 originChainId, address creator, bytes32 salt, bytes32 _contractHash) =
            abi.decode(payload, (uint256, address, bytes32, bytes32));

        contractHash[originChainId][creator][salt] = _contractHash;
    }

    function setContractHash(bytes32 salt, bytes memory bytecode, bytes calldata initData) public {
        if (getContractHash(block.chainid, msg.sender, salt) != bytes32(0)) revert InvalidContractHash();
        contractHash[block.chainid][msg.sender][salt] = keccak256(abi.encode(bytecode, initData));
    }

    function getContractHash(uint256 originChainId, address creator, bytes32 salt) public view returns (bytes32) {
        return contractHash[originChainId][creator][salt];
    }
}
