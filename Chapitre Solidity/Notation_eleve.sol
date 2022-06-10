// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;

contract Notation {
    struct Student {
        string name;
        uint noteBiologie;
        uint noteMath;
        uint noteFr;
    }
    mapping(address=>Student) students;

    struct Prof {
        string matiere;
        address Address;
    }
    
    



    // mapping(address=>Prof) profs;
    // modifier onlyProf(){
    //     require(msg.sender == profs.[address]);
    //     _;
    // }


    function addstudents (address _address, string memory _name) public { //ajout des élèves
        students[_address].name=_name;
    }

  
}






    // students[Student].noteFr=15;

    // Student[] public students;

    // uint[] Bio;

    // function addnoteBio(uint _note) public {
    //     Bio.push(_note);

    //     uint sum;

    //     for (uint i = 0; i < Bio.length; i++) {
    //         sum += Bio[i];
    //     }
        
    //     Student[].noteBiologie = sum/Bio.length;
    //  }

