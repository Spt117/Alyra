// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  struct Etudiant {
    string name;
    uint note;
  }

  mapping (address=>Etudiant) public EtudiantsMap;
  Etudiant[] public EtudiantsArray;

  enum classe {
    sixieme,
    cinquieme,
    quatrieme
  }

  classe public Classe;

    function setetudiant(address _addr, string memory _name, uint _note) public {
        EtudiantsMap[_addr]=Etudiant(_name, _note);
    }

    function deletetudiant(address _addr) public {
        EtudiantsMap[_addr]=Etudiant('', 0);
    }

    function setenum (classe _classe) public {
      Classe=classe(_classe);
    }
}