// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev Informations
 *
 * If you have any questions, don't hesitate to contact me on telegram 
 * #theblockdev or by email : frenchcryptoagency#gmail.com
 *
 * This contract is a simplified voting system divided into four parts.
 *
 * First, the owner registers the participants
 * Second, voters can register proposals
 * Then, the voters vote for their favorite proposal
 * Finally, the owner tallies the votes. 
 *
 * To separate these different phases, we use the enum of the contract,
 * only the owner can change the enum. 
 *
 *
 */

contract Voting is Ownable {

    uint public winningProposalID;
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint voteCount;
    }

    enum  WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public workflowStatus;
    Proposal[] proposalsArray;
    mapping (address => Voter) voters;

/**
* @dev in order to make appear the elements necessary 
* to the good progress of the vote on our Dapp, we will 
* use the various events below.
 */

    event VoterRegistered(address voterAddress); 
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted (address voter, uint proposalId);

    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }
    
    // on peut faire un modifier pour les états

    // ::::::::::::: GETTERS ::::::::::::: //

    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }
    
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

 
    // ::::::::::::: REGISTRATION ::::::::::::: // 

    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');
    
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }
 

    // ::::::::::::: PROPOSAL ::::::::::::: // 

    function addProposal(string memory _desc) external onlyVoters {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'Vous ne pouvez pas ne rien proposer'); // facultatif
        require(proposalsArray.length<100, "Proposal's Array is complete");

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length-1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    function setVote( uint _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found'); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //


    function NextStatut() external onlyOwner {                                 //fonction pour définir le workflowStatus du contrat
        if (workflowStatus==WorkflowStatus.VotesTallied){
            workflowStatus=WorkflowStatus(0);
        }
        else workflowStatus=WorkflowStatus(uint(workflowStatus)+1);   
    
        if (workflowStatus==WorkflowStatus.RegisteringVoters) {                //déclenchement de l'event 
            emit WorkflowStatusChange(WorkflowStatus(5),WorkflowStatus(0));
        }
        else {
            emit WorkflowStatusChange(WorkflowStatus (uint (workflowStatus)-1), WorkflowStatus(uint(workflowStatus)));
            }
    }


   function tallyVotes() external onlyOwner {
       require(workflowStatus == WorkflowStatus.VotingSessionEnded, "Current status is not voting session ended");
       uint _winningProposalId;
      for (uint256 p = 0; p < proposalsArray.length; p++) {
           if (proposalsArray[p].voteCount > proposalsArray[_winningProposalId].voteCount) {
               _winningProposalId = p;
          }
       }
       winningProposalID = _winningProposalId;
       
       workflowStatus = WorkflowStatus.VotesTallied;
       emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }
}