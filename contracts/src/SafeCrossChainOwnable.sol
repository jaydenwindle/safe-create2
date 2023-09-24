// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IAxelarGateway} from "axelar-gmp-sdk-solidity/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "axelar-gmp-sdk-solidity/interfaces/IAxelarGasService.sol";
import {Strings} from "openzeppelin/utils/Strings.sol";
import {MerkleProof} from "openzeppelin/utils/cryptography/MerkleProof.sol";

contract SafeCrossChainOwnable {
    error NotApprovedByGateway();
    error InvalidCaller();

    bytes32 public immutable bridgeRoot;

    IAxelarGateway public gateway;
    IAxelarGasService public gasService;

    address public owner;

    modifier onlyCrossChainOwner() {
        if (msg.sender != address(this)) revert InvalidCaller();
        _;
    }

    constructor(bytes32 _bridgeRoot, address crossChainOwner) {
        bridgeRoot = _bridgeRoot;
        owner = crossChainOwner;
    }

    function enableBridge(address _gateway, address _gasService, bytes32[] calldata proof) external {
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(block.chainid, _gateway, _gasService))));
        require(MerkleProof.verify(proof, bridgeRoot, leaf), "Invalid proof");
        gateway = IAxelarGateway(_gateway);
        gasService = IAxelarGasService(_gasService);
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

        if (!Strings.equal(sourceAddress, Strings.toHexString(address(this)))) revert InvalidCaller();

        (bool success, bytes memory result) = address(this).call(payload);

        if (!success) {
            assembly {
                revert(add(32, result), mload(result))
            }
        }
    }
}
