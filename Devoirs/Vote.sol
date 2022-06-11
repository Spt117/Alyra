// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

contract Voting is Ownable {
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedProposalId;
        address addr;
    }


    struct Proposal {
        string description;
        uint256 voteCount;
    }

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    event VoterRegistered(address voterAddress);
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint256 proposalId);
    event Voted(address voter, uint256 proposalId);



    //admin enregistre les électeurs avec leur addresse eth




    //admin commence la session d'enregistrement de proposition





    //électeurs inscrits peuvent enregistrer leurs propositions tant que la session est active




    //admin met fin à la session d'enregistrement




    //admin commence session de vote



    //électeurs inscrits votent pour leur proposition préférée




    //admin met fin à la session de vote




    //admin comptabilise les votes




    //tout le monde peut vérifier le résultat ??? à vérifier car "derniers détails de la proposition gagnante ?"



    //retourner le gagnant avec uint winningProposalId (id du gagnant) ou une fonction getWinner


}
