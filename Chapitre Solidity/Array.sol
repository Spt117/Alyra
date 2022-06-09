// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;

contract Whitelist {
    struct Person {
        //structure de données
        string name;
        uint256 age;
    }

    Person[] public persons; //tableau public de type Person

    function add(string memory _name, uint256 _age) public {
        Person memory person = Person(_name, _age); // Création d'un nouvel objet
        persons.push(person); // Ajout de l'ojet au tableau
    }

    function remove() public {
        persons.pop(); // Supression du dernier objet dans le tableau
    }
}
