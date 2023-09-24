// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract MockAxelarGateway {
    bool valid;

    function validateContractCall(bytes32, string calldata, string calldata, bytes32) external view returns (bool) {
        return valid;
    }
}
