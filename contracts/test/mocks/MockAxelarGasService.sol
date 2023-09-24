// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract MockAxelarGasService {
    function payNativeGasForContractCall(
        address sender,
        string calldata destinationChain,
        string calldata destinationAddress,
        bytes calldata payload,
        address refundAddress
    ) external payable {}
}
