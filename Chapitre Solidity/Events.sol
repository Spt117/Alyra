// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;

contract Whitelist {

    mapping(address => bool) whitelist;

    event Autorized(address _address); // évènement

    function authorize(address _address) public {
        whitelist[_address] = true;
        emit Autorized(_address); //déclenchement de l'évènement 
    }
}
