// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;

contract Whitelist {

    struct Person {  //structure de données
        string name;
        uint256 age;
    }

    Person[] public persons; //tableau public de type porsonne

}
