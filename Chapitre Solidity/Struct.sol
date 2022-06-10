// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;

contract Whitelist {
    struct Person {
        string name;
        uint256 age;
    }

    // function addPerson(string memory _name, uint256 _age) public {
    //     Person memory person = Person(_name, _age);
    // }

    function addPerson(string memory _name, uint256 _age) public pure{
        Person memory person;
        person.name = _name;
        person.age = _age;
    }
}
