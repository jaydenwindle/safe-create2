// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library StringCasing {
    function toLower(bytes calldata str) internal returns (string memory) {
        bytes memory bLower = new bytes(str.length);
        for (uint256 i = 0; i < str.length; i++) {
            // Uppercase character...
            if ((uint8(str[i]) >= 65) && (uint8(str[i]) <= 90)) {
                // So we add 32 to make it lowercase
                bLower[i] = bytes1(uint8(str[i]) + 32);
            } else {
                bLower[i] = str[i];
            }
        }
        return string(bLower);
    }
}
