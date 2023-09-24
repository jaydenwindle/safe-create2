// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import "../src/SafeCrossChainFactory.sol";

contract DeployFactoryScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();

        bytes32 testnetBridgeRoot = 0x62566b41f41e3edf91fd48bf6b8a1899aeb12d3397323b765047785362656188;
        bytes32 mainnetBridgeRoot = 0xbbde743624b222577f21892dad00f94469e297a08c507f9d83bc2abc6afe65a3;

        new SafeCrossChainFactory{salt: 0x1234500000000000000000000000000000000000000000000000000000000000}(testnetBridgeRoot);
    }
}
