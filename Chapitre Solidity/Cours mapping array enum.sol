// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.9;

contract test {
    //mapping(string=>(adress=>apprenant)) Ropsten //Mapping en cascasde

    struct Apprenant{
        string name; 
        uint note;
    }

    enum Statut{apprenti, certifie, recale}
    Statut public statut;

    mapping (address=>Apprenant) apprenantsMapping;
    Apprenant[] apprenantsArray;

    //maping

    function setAppMapp(address _addr, string calldata _name, uint _note) public {
        apprenantsMapping[_addr]=Apprenant(_name, _note);
        //ou
        apprenantsMapping[_addr].name=_name;
        apprenantsMapping[_addr].note=_note;
        //ou
        Apprenant memory apprenantFort = Apprenant(_name, _note);
        apprenantsMapping[_addr]=apprenantFort;
    }

    function delete1AppMap(address _addr) public  {
        delete apprenantsMapping[_addr];
        //dans ce cas : apprenantMapping[_addr]=Apprenant ["",0]

    }

    //array

    function addAppAray(string calldata _name, uint _note) public {
        apprenantsArray.push(Apprenant(_name, _note)); //Moins cher
        //ou
        Apprenant memory app = Apprenant(_name, _note); //création de l'apprenant
        apprenantsArray.push(app); // ajout de l'apprenant
               
    }

    function setAppArray(uint _id, string calldata _name, uint _note) public {
        require (_id<apprenantsArray.length, "cet apprenant n'existe pas");
        apprenantsArray[_id] = Apprenant(_name, _note);
    }

    function delLastAppArray() public {
        apprenantsArray.pop();
    }

    function delAllAppArray() public {
        delete apprenantsArray;
        //ici : apprenantsArray =[] un tableau vide
    }

    //Enum
    //    enum Statut{apprenti, certifie, recale}


    
    function setStatutCertifie() public {
        statut = Statut.certifie;
        //ou
        statut = Statut(1);
    }

    function changeStatut(Statut _num) public {
        require (uint (_num)<3, "ce statut n'existe pas");
        statut = _num;

    } 

    function incrementStatut() public {
        require (uint (statut)<2, "ce statut n'existe pas");
        statut= Statut (uint (statut)+1);
    }
}