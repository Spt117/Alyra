// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

//Declares a new contract
contract Simple1 {
    //Storage. Persists in between transactions
    uint x;

    //Allows the unsigned integer stored to be changed
    function set(uint newValue) public {
        x = newValue;
    }
    
    //Returns the currently stored unsigned integer
    function get() public view returns (uint) {
        return x;
    }
}
