// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Voting is Ownable {
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedProposalId;
        //address voterAddress;                //ajout d'une addresse pour les électeurs 
    }
    //Voter[] public voters;                   //tableau pour stocker les électeurs
    mapping(address=>Voter) public voters;        //mapping associant les électeurs à leur adresse eth




    struct Proposal {
        string description;
        uint256 voteCount;
        //uint256 proposalId;                     //ajout d'un id 
    }
    Proposal[] public proposals;              // tableau qui contiendra le ou les vainqueurs
    uint Id;                                  //Variable qui va définir proposalId
    //Proposal[] public proposals;            //tableau des propositions
   // mapping(string=>Proposal)proposals;     //mapping associant les proposition à leur description
    mapping(uint=>Proposal) proposalIds;      //mapping associant les propositions à leur proposalId


    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }
    WorkflowStatus public statut;     
    function NextStatut() external onlyOwner {                              //fonction pour définir le statut du contrat
       // require (uint (statut)<6, "Ce statut n'existe pas");               //require inutile
        if (statut==WorkflowStatus.VotesTallied){
            statut=WorkflowStatus(0);
        }
        else statut=WorkflowStatus(uint(statut)+1);
       
       //déclenchement de l'event 
        if (statut==WorkflowStatus.RegisteringVoters) {
            emit WorkflowStatusChange(WorkflowStatus(5),WorkflowStatus(0));
        }
        else {emit WorkflowStatusChange(WorkflowStatus (uint (statut)-1), WorkflowStatus(uint(statut)));}        
    }     
    


    event VoterRegistered(address _voterAddress);
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint256 proposalId);
    event Voted(address voter, uint256 proposalId);



    //admin enregistre les électeurs avec leur addresse eth

    //ChooseStatut(0);   //admin met le statut en RegisteringVote (statut par défaut donc pas obligé d'appeler la fonction)

    function registered(address _voterAddress) public onlyOwner{
        require(statut==WorkflowStatus.RegisteringVoters, 
        "Vous ne pouvez pas enregistrer de votant pour le moment !");          //vérification du statut
        require(!voters[_voterAddress].isRegistered, 
        "Cet electeur est deja enregistre");                                   //vérification que l'électeur n'est pas enregistré


        //voters.push(Voter(true, false, 0, _voterAddress));                   //enregistrement avec tableau
        voters[_voterAddress]=Voter(true, false, 0);                      //enregistrement du voter avec mapping
        emit VoterRegistered(_voterAddress);                               //déclenchement de l'event enregistrement électeur
    }
        

    



    //admin commence la session d'enregistrement de proposition
    //ChooseStatut(1);


    //électeurs inscrits peuvent enregistrer leurs propositions tant que la session est active
    //faire une fonction pour enregistrer une proposal et mettre un require électeurs inscrits
    
    function registerProposal(string memory _description) public {
        require(voters[msg.sender].isRegistered==true,
        "Vous n'etes pas enregistre !");                                       //vérification de l'enregistrement de l'électeur
        require(statut==WorkflowStatus.ProposalsRegistrationStarted,           //vérification du statut
        "Vous ne pouvez pas faire de proposition pour le moment !");
                                                                        
        //proposals.push(Proposal(_description, 0));                           //l'électeur enregistre sa proposition en array
        //voters[msg.sender].votedProposalId=;                                 //donner à votedProposalId l'index de la proposal
        Id++;                                                                  //Incrémentation de l'Id pour que propsalId commence à 1
        proposalIds[Id]=Proposal(_description, 0);                            //l'électeur enregistre sa proposition en mapping
        //proposals.push(proposalIds[Id]);                                        //On remplis le tableau avec les votes des proposals
        emit ProposalRegistered(Id);                                          //Déclenchement de l'event enregistrement proposition
        
    } 



    //admin met fin à la session d'enregistrement
    //ChooseStatut(2)

    //admin commence session de vote
    //ChooseStatut(3)

    //électeurs inscrits votent pour leur proposition préférée
    //faire une fonction pour que les électeurs votent
    function voterProposal (uint _proposalId) public {
        require(voters[msg.sender].isRegistered==true,                           
        "Vous n'etes pas enregistre !");                                         //vérification de l'enregistrement
        require(statut==WorkflowStatus.VotingSessionStarted,                     //vérification du statut
        "Vous ne pouvez pas voter pour le moment !");
        require(voters[msg.sender].hasVoted==false,                              //vérification que l'électeur n'a pas déjà voté
        "Vous avez deja vote !");
        require(_proposalId<Id+1 && 0<_proposalId,                               //vérification que la proposition existe
        "Cette proposition n'est pas valide");                                   //on peut considérer que 0 est le vote blanc

        proposalIds[_proposalId].voteCount++; 
        voters[msg.sender]=Voter(true, true, _proposalId);                        //on incrémente le vote
        // voters[msg.sender].votedProposalId=_proposalId;
        // voters[msg.sender].hasVoted=true;                                        //l'électeur a voté  
        emit Voted(msg.sender, _proposalId);

    }
    //admin met fin à la session de vote
    //admin comptabilise les votes
    // function countVote() public view onlyOwner returns (uint) {    //fonction pour vérifier le nombre de votes
    //     uint sum;
    //     for (uint i; i<Id;i++){
    //         uint[] votes;
    //         votes.push(proposalIds[i].voteCount);
    //     }
    //     return sum ;
        
    // }
    
    function findWinner() public  onlyOwner  returns (uint){
        require(statut==WorkflowStatus.VotingSessionEnded,                     //vérification du statut
        "La session de vote est pas finie !");
        uint max;
        uint winner;
        for (uint i; i<Id+1;i++){            
           
            if(proposalIds[i].voteCount>max){
                max = proposalIds[i].voteCount;
                winner = i;
            }
        }
        proposals.push(proposalIds[winner]);
    return winner ;        
    }




    //tout le monde peut vérifier le résultat ??? à vérifier car "derniers détails de la proposition gagnante ?"
    //retourner le gagnant avec uint winningProposalId (id du gagnant) ou une fonction getWinner DESCRIPTION ET NOMBRE DE VOTES
    function getWinner()public view returns(Proposal[] memory){
        require(statut==WorkflowStatus.VotesTallied,                     //vérification du statut
        "Le decompte est pas encore fini !");
        return proposals;
    }

}