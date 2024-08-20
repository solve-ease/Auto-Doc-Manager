// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSSample {
    mapping(uint256 => string) private ipfsData;

    function storeData(uint256 key, string memory cid) public {
        ipfsData[key] = cid;
    }

    function retrieveData(uint256 key) public view returns (string memory) {
        return ipfsData[key];
    }
}
