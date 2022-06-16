// SPDX-License-Identifier: GPL-3.0
import "@openzeppelin/contracts/access/Ownable.sol";


pragma solidity 0.8.13;

contract SimpleStorage {

    uint storageData;

    constructor(uint _num) payable{
        set(_num);
    }

    function get() public view returns (uint) {
        return storageData;
    }

    function set(uint _num) public {
        storageData = _num;
    }

}