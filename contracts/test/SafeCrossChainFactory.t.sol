// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/SafeCrossChainFactory.sol";
import "./mocks/MockAxelarGateway.sol";
import "./mocks/MockAxelarGasService.sol";
import "./Counter.sol";

import {Strings} from "openzeppelin/utils/Strings.sol";

contract SafeCrossChainFactoryTest is Test {
    SafeCrossChainFactory public factory;
    MockAxelarGateway mockAxelarGateway = new MockAxelarGateway();
    MockAxelarGasService mockAxelarGasService = new MockAxelarGasService();
    address gateway = vm.addr(123);
    address gasService = vm.addr(456);

    function setUp() public {
        // uint256 fork1 = vm.createFork("https://ethereum-goerli.publicnode.com");
        // uint256 fork2 = vm.createFork("https://polygon-mumbai-bor.publicnode.com");

        factory = new SafeCrossChainFactory(0xffdf566c663ff519680a0b5383b9d70c3a83cda0b191d9eca4cfd6471520f64d);

        vm.etch(gateway, address(mockAxelarGateway).code);
        vm.store(gateway, 0, bytes32(uint256(1)));

        vm.etch(gasService, address(mockAxelarGasService).code);
    }

    function testEnableBridge() public {
        bytes32[] memory proof = new bytes32[](0);
        factory.enableBridge(gateway, gasService, proof);

        assertEq(address(factory.gateway()), gateway);
        assertEq(address(factory.gasService()), gasService);
    }

    function testRemoteChainDeployment() public {
        bytes memory bytecode = type(Counter).creationCode;
        console.logBytes(bytecode);
        bytes memory initData = new bytes(0);

        bytes32[] memory proof = new bytes32[](0);
        factory.enableBridge(gateway, gasService, proof);

        bytes memory payload = abi.encode(block.chainid, address(this), bytes32(0), bytecode, initData);

        factory.execute("", "", Strings.toHexString(address(factory)), payload);

        address deployed = 0x8D8D03e85Cf061b7669e32eC83269c561d775523;
        Counter counter = Counter(deployed);

        assertTrue(deployed.code.length > 0);
        counter.enableBridge(gateway, gasService, proof);
        counter.execute("", "", Strings.toHexString(address(this)), abi.encodeWithSignature("increment()"));
        assertEq(counter.number(), 1);
    }

    function testOriginChainDeployment() public {
        bytes memory bytecode = type(Counter).creationCode;
        bytes memory initData = new bytes(0);

        bytes32[] memory proof = new bytes32[](0);
        factory.enableBridge(gateway, gasService, proof);

        factory.createLocal(bytes32(0), bytecode, initData);

        address deployed = 0x8D8D03e85Cf061b7669e32eC83269c561d775523;
        Counter counter = Counter(deployed);

        assertTrue(deployed.code.length > 0);
        counter.enableBridge(gateway, gasService, proof);
        counter.execute("", "", Strings.toHexString(address(this)), abi.encodeWithSignature("increment()"));
        assertEq(counter.number(), 1);
    }
}
