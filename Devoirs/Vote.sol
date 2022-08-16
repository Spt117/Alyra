// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;

import "../../../node_modules/@openzeppelin/contracts/access/Ownable.sol";


contract Voting is Ownable {
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedProposalId; 
    }
    mapping(address=>Voter) public voters;             //mapping associant les électeurs à leur adresse je laisse en public pour que tout le monde puisse voir pour qui chacun vote
    address[] resetvoters;                               //tableau pour stockers les adresses des électeurs et reset en un clic



    struct Proposal {
        string description;
        uint256 voteCount;
    }
    uint Id;                                               //Variable qui va définir proposalId                     public pour vérifier contrat
    bool whitevote;                                        //vatiable pour prendre le vote blanc en compte          public pour vérifier contrat
    mapping(uint=>Proposal) proposalIds;                   //mapping associant les propositions à leur proposalId   public pour vérifier contrat
    Proposal[] proposalwinners;                           // tableau qui contiendra le ou les vainqueurs            

    


    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }
    WorkflowStatus public statut;                                             //je laisse en public pour que tout le monde puisse vérifier ou en est la session de vote
    
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
        else {
            emit WorkflowStatusChange(WorkflowStatus (uint (statut)-1), WorkflowStatus(uint(statut)));
            } 
        if(statut==WorkflowStatus.ProposalsRegistrationEnded && whitevote==false){                //Le vote blanc est enregistré en tant que proposition
            proposalIds[Id]=Proposal("Vote blanc", 0);                                           //on rajoute le vote blanc en cas d'égalité avec lui
        }      
    }                                                                                           

    event VoterRegistered(address _voterAddress);
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint256 proposalId);
    event Voted(address voter, uint256 proposalId);



    ///ajout d'un modifier pour vérifier qu'un électeur est enregistré
    modifier onlyRegistered(){
        require(
            voters[msg.sender].isRegistered==true,"Vous n'etes pas enregistre !"
        );
        _;
    }


    

    //admin met le statut en RegisteringVote (en place par défaut lors du premier vote)
    //admin enregistre les électeurs avec leur addresse eth

    function registered(address _voterAddress) external onlyOwner{
        require(statut==WorkflowStatus.RegisteringVoters, 
        "Vous ne pouvez pas enregistrer de votant pour le moment !");          //vérification du statut
        require(!voters[_voterAddress].isRegistered, 
        "Cet electeur est deja enregistre");                                   //vérification que l'électeur n'est pas enregistré

        voters[_voterAddress]=Voter(true, false, 0);                           //enregistrement du voter avec mapping
        resetvoters.push(_voterAddress);                                        //enregistrement des adresses électeurs dans le tableau
        emit VoterRegistered(_voterAddress);                                   //déclenchement de l'event enregistrement électeur
    }

    //J'ajoute en bonus une fonction pour retirer un électeur
    function unregistered(address _voterAddress) external onlyOwner{           
        require(statut==WorkflowStatus.RegisteringVoters, 
        "Vous ne pouvez pas retirer de votant pour le moment !");             //vérification du statut
        require(voters[_voterAddress].isRegistered, 
        "Cet electeur est pas enregistre");                                   //vérification que l'électeur est enregistré
        voters[_voterAddress]=Voter(false, false, 0);                         //supression du voters
    }
    
    

    //admin commence la session d'enregistrement de proposition
    //électeurs inscrits peuvent enregistrer leurs propositions tant que la session est active
    //faire une fonction pour enregistrer une proposal 
    
    function registerProposal(string memory _description) external onlyRegistered {
        require(statut==WorkflowStatus.ProposalsRegistrationStarted,           //vérification du statut
        "Vous ne pouvez pas faire de proposition pour le moment !");
                                                                        
        //proposals.push(Proposal(_description, 0));                           //l'électeur enregistre sa proposition en array
        //voters[msg.sender].votedProposalId=;                                 //donner à votedProposalId l'index de la proposal
        Id++;                                                                  //Incrémentation de l'Id pour que propsalId commence à 1
        proposalIds[Id-1]=Proposal(_description, 0);                            //l'électeur enregistre sa proposition en mapping
        //proposals.push(proposalIds[Id]);                                        //On remplis le tableau avec les votes des proposals
        emit ProposalRegistered(Id);                                          //Déclenchement de l'event enregistrement proposition
        
    } 



    //admin met fin à la session d'enregistrement
    //ajout d'une fonction pour supprimer une proposition (si des propositions sont trop similaires)
    function deleteproposal(uint _id) external onlyOwner{
        require(statut==WorkflowStatus.ProposalsRegistrationEnded,           //vérification du statut
        "Vous ne pouvez pas supprimer de proposition pour le moment !");
        proposalIds[_id]=Proposal("", 0);

    }

    //admin commence session de vote

    //électeurs inscrits votent pour leur proposition préférée
    //faire une fonction pour que les électeurs votent
    function voterProposal (uint _proposalId) external onlyRegistered {
        require(statut==WorkflowStatus.VotingSessionStarted,                     //vérification du statut
        "Vous ne pouvez pas voter pour le moment !");
        require(voters[msg.sender].hasVoted==false,                              //vérification que l'électeur n'a pas déjà voté
        "Vous avez deja vote !");
        require(keccak256(abi.encodePacked(proposalIds[_proposalId].description))!=keccak256(abi.encodePacked("")),                                                  //vérification que la proposition existe
        "Cette proposition n'est pas valide");                                   //on vérifie que la proposition est valide

        proposalIds[_proposalId].voteCount++;                                     //on incrémente le vote de la proposition  
        voters[msg.sender]=Voter(true, true, _proposalId);                        //l'électeur a voté et on indique son vote
        // voters[msg.sender].votedProposalId=_proposalId;
        // voters[msg.sender].hasVoted=true;                                         
        emit Voted(msg.sender, _proposalId);

    }



    //admin met fin à la session de vote
    //admin comptabilise les votes
    
    // function countVote() public view onlyOwner returns (uint) {                   //fonction pour vérifier le nombre de votes
    //     uint sum;
    //     for (uint i; i<Id;i++){
    //         uint[] votes;
    //         votes.push(proposalIds[i].voteCount);
    //     }
    //     return sum ;
        
    // }
    
    function findWinner() external  onlyOwner  returns (Proposal[]memory){
        require(statut==WorkflowStatus.VotingSessionEnded,                      //vérification du statut
        "La session de vote est pas finie !");

        uint max;                                                               
        uint winner;

        for (uint i; i<Id+1;i++){                                              //Boucle pour déterminer le maximum de voix             
            if(proposalIds[i].voteCount>max){
                max = proposalIds[i].voteCount;
                winner = i;
            }
        }
           
        for (uint i; i<Id+1;i++){                                               //Boucle pour enregistré les propositions avec le maximum de voix
            if (proposalIds[i].voteCount==proposalIds[winner].voteCount){
                proposalwinners.push(proposalIds[i]);
            }
        }

        if (proposalIds[Id].voteCount==proposalIds[winner].voteCount){
               whitevote=true;                                                  //on prend le vote blanc en compte en cas d'égalité 
            }
            else {whitevote=false;}                                             
        
        return proposalwinners;                                                 //L'administrateur peut regarder le résultat avant les autres 
    }                                                                           //(faut bien des avantages mais on peut lui enlever^^)



    //tout le monde peut vérifier le résultat ??? à vérifier car "derniers détails de la proposition gagnante ?"

        ///ajout d'un modifier pour vérifier les votes comptabilisés
    modifier VotesTallied(){
        require(
            statut==WorkflowStatus.VotesTallied, "Le decompte est pas encore fini"
        );
        _;
    }

    //retourner le gagnant avec uint winningProposalId (id du gagnant) ou une fonction getWinner DESCRIPTION ET NOMBRE DE VOTES
    function getWinner()external view VotesTallied returns(Proposal[] memory){
        return proposalwinners;
    }


    //faire un reset avant de recommencer une procédure de vote !
    //Il serait mieux d'ajouter un nouveau statut mais la consigne est de ne pas y toucher. 

    //j'ajoute une fonction de reset pour effacer les propositions et garder ou pas les mêmes électeurs
    function resetvote(bool _voters, bool _winners) external onlyOwner VotesTallied {

        uint reset;
        reset=resetvoters.length;
        if (_voters==true){
            for (uint i; i<reset; i++){voters[resetvoters[i]]=Voter(true, false, 0);}     // l'admin peut recommencer un vote avec les mêmes électeurs enregistrés,       
        }                                                                         //ou en rajouter ou supprimer individuellement avec unregistred !
        else {
            for (uint i; i<reset; i++){voters[resetvoters[i]]=Voter(false, false, 0);}    //l'admin peut recommencer un vote en enregistrant une nouvelle liste
        }
        
        for (uint i; i<Id+1;i++){proposalIds[i]=Proposal("", 0);}                 //on reset les Proposal qui ont été enregistrées
        Id =0;
               
        if (_winners==false){
            delete proposalwinners;                                                 //si pas d'égalité, on reset winners 
            whitevote=false;                                                        // si le gagnant était seulement le vote blanc, on le repasse en false
        }
        else{            
            uint resetwinners;                                                      //si égalité, on renvoie les propositions gagnantes
            resetwinners=proposalwinners.length;                                    //dans le tableau des propositions
            for(uint i;i<resetwinners;i++){           
            proposalIds[Id].description=proposalwinners[i].description;
            Id++;}
            delete proposalwinners;
        }
    }
}