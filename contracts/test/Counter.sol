// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../src/SafeCrossChainOwnable.sol";

contract Counter is SafeCrossChainOwnable {
    uint256 public number = 0;

    constructor(bytes32 _bridgeRoot, address crossChainOwner) SafeCrossChainOwnable(_bridgeRoot, crossChainOwner) {}

    event Transfer(address indexed from, address indexed to, uint256 value);

    function setNumber(uint256 newNumber) public onlyCrossChainOwner {
        number = newNumber;
    }

    function increment() public onlyCrossChainOwner {
        number++;
    }
}
