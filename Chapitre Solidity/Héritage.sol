// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;

contract parent {

    uint pomme;

    function ajoutpomme(uint _ajout) external {
        pomme = _ajout;
    }

}


contract enfant is parent {
    function retour() external view returns(uint) {
        return pomme;
    }
}


contract caller {
    enfant DD = new enfant();

    function testinstance (uint _ajout) public returns (uint){
        DD.ajoutpomme(_ajout);
        return DD.retour();
    }
}