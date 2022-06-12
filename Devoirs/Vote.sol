// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;
import "@openzeppelin/contracts/access/Ownable.sol";


contract Voting is Ownable {
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedProposalId;
        address voterAddress;                //ajout d'une addresse pour les électeurs 
    }
    //Voter[] public voters;                   //tableau pour stocker les électeurs
    mapping(address=>Voter) private voters;        //mapping associant les électeurs à leur adresse eth




    struct Proposal {
        string description;
        uint256 voteCount;
        uint256 proposalId;                     //ajout d'un id 
    }
    //uint id;                              //Variable qui va définir proposalId
    //Proposal[] public proposals;        //tableau des propositions
    mapping(string=>Proposal)proposals;   //mapping associant les proposition à leur description
    mapping(uint=>Proposal)proposalIds;   //mapping associant les propositions à leur proposalId


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
       // require (uint (statut)<6, "Ce statut n'existe pas");    //require inutil
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
        //voters.push(Voter(true, false, 0, _voterAddress));                   //enregistrement avec tableau
        voters[_voterAddress].voterAddress=_voterAddress;                      //enregistrement du voter avec mapping
        voters[_voterAddress].isRegistered=true; 
        emit VoterRegistered(_voterAddress);                               //déclenchement de l'event enregistrement
    }
        

    



    //admin commence la session d'enregistrement de proposition
    //ChooseStatut(1);


    //électeurs inscrits peuvent enregistrer leurs propositions tant que la session est active
    //faire une fonction pour enregistrer une proposal et mettre un require électeurs inscrits
    
    function registerProposal(string calldata _description, uint _proposalid) public {
        require(voters[msg.sender].isRegistered==true,
        "Vous n'etes pas enregistre !");                                       //vérification de l'enregistrement de l'électeur
        require(statut==WorkflowStatus.ProposalsRegistrationStarted,           //vérification du statut
        "Vous ne pouvez pas faire de proposition pour le moment !");
                                                                         //on incrémente pour définir nos id
        //proposals.push(Proposal(_description, 0));                           //l'électeur enregistre sa proposition en array
        //voters[msg.sender].votedProposalId=;                                 //donner à votedProposalId l'index de la proposal
        proposals[_description].description=_description;                      //l'électeur enregistre sa proposition en mapping
        proposals[_description].proposalId=_proposalid;                                 //On donne l'id à proposalId
        emit ProposalRegistered(_proposalid);
        
    } 



    //admin met fin à la session d'enregistrement
    //ChooseStatut(2)

    //admin commence session de vote
    //ChooseStatut(3)

    //électeurs inscrits votent pour leur proposition préférée
    //faire une fonction pour que les électeurs votent
    function voterProposal (uint _proposalid) public {
        require(voters[msg.sender].isRegistered==true,                           
        "Vous n'etes pas enregistre !");                                         //vérification de l'enregistrement
        require(statut==WorkflowStatus.VotingSessionStarted,                     //vérification du statut
        "Vous ne pouvez pas voter pour le moment !");
        require(voters[msg.sender].hasVoted==false,                              //vérification que l'électeur n'a pas déjà voté
        "Vous avez deja vote !");
        require(_proposalid==proposalIds[_proposalid].proposalId,                //vérification que la proposition existe
        "Cette proposition n'est pas valide");                                  
        
        proposalIds[_proposalid].voteCount++;                                    //on incrémente le vote
        voters[msg.sender].votedProposalId=_proposalid;
        voters[msg.sender].hasVoted=true;                                        //l'électeur a voté  
        emit Voted(msg.sender, _proposalid);

    }
    //admin met fin à la session de vote




    //admin comptabilise les votes




    //tout le monde peut vérifier le résultat ??? à vérifier car "derniers détails de la proposition gagnante ?"



    //retourner le gagnant avec uint winningProposalId (id du gagnant) ou une fonction getWinner DESCRIPTION ET NOMBRE DE VOTES


}
