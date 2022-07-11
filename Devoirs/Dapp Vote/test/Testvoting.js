const Voting = artifacts.require("./Voting.sol");

const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

const { expect } = require('chai');

contract('Voting', accounts => {

    const owner = accounts[0];
    const voter = accounts[1];
    const voter2 = accounts[2];
    const voter3 = accounts[3];
    const voter4 = accounts[4];
    const voter5 = accounts[5];
    const voter6 = accounts[6];
    const other = accounts[7];

    let VotingInstance;

    
    
    // ::::::::::::: REGISTRATION ::::::::::::: //
    
    describe("test of add/getVoter", () => {
        
        beforeEach (async () => {
            VotingInstance = await Voting.new({ from: owner });                       
        });

        // ---- Vérification de l'enregistrement des électeurs ---- //

        it("... should add a Voter in a mapping, get isRegistered true", async () => {
            await VotingInstance.addVoter(voter, {from: owner }); 
            let isregistered = await VotingInstance.getVoter(voter, {from: voter});
            expect(isregistered.isRegistered).to.be.true;
        });

        it("... should add a Voter in a mapping, get hasVoted false", async () => {
            await VotingInstance.addVoter(voter, {from: owner }); 
            let isregistered = await VotingInstance.getVoter(voter, {from: voter});            
            expect(isregistered.hasVoted).to.be.false;
        });

        it("... should add a Voter in a mapping, get votedProposalId = 0", async () => {
            await VotingInstance.addVoter(voter, {from: owner }); 
            let isregistered = await VotingInstance.getVoter(voter, {from: voter});
            console.log(isregistered);
            expect(BN(isregistered.votedProposalId)).to.be.bignumber.equal(BN(0));
        });
        
        // ---- Vérification de l'évènement ---- //

        it('...should emit VoterRegistered', async () => {
            const event = await VotingInstance.addVoter(voter, {from: owner });
            expectEvent(event, "VoterRegistered", {voterAddress: voter});
        });

        // ---- Vérification des require ---- //

        it("...should revert because of Ownable", async () => {           
            await expectRevert(VotingInstance.addVoter(voter, {from: other }),"Ownable: caller is not the owner");
        });
        
        it("...should revert because of OnlyVoters", async () => {      
            await expectRevert(VotingInstance.getVoter(voter, {from: other }),"You're not a voter");
        });

        it("...should revert because of OnlyVoters", async () => {      
            await VotingInstance.addVoter(voter, {from: owner });     
            await expectRevert(VotingInstance.addVoter(voter, {from: owner }),"Already registered");
        });

        it("...should revert because of bad workflowstatus", async () => {
            await VotingInstance.startProposalsRegistering({from: owner});
            await expectRevert(VotingInstance.addVoter(voter, {from: owner }),"Voters registration is not open yet");

        });

    });
    

    
    // ::::::::::::: PROPOSAL ::::::::::::: //

    describe("test of add/getOneProposal", () => {

        beforeEach (async () => {
            VotingInstance = await Voting.new({from: owner});  
            await VotingInstance.addVoter(voter, {from: owner});
            await VotingInstance.addVoter(voter2, {from: owner });
            await VotingInstance.addVoter(voter3, {from: owner });
            await VotingInstance.addVoter(voter4, {from: owner });
            await VotingInstance.startProposalsRegistering({from: owner});
        });

        // ---- Vérification de l'enregistrement des propositions ---- //

        it('... should add a Proposal in an Array, get description', async () => {
            await VotingInstance.addProposal("proposition 1", {from: voter});
            const Proposalregistered = await VotingInstance.getOneProposal(0, {from: voter});
            expect(Proposalregistered.description).to.equal("proposition 1");
        });

        it('... should add a Proposal in an Array, get voteCount = 0', async () => {
            await VotingInstance.addProposal("proposition 1", {from: voter});
            const Proposalregistered = await VotingInstance.getOneProposal(0, {from: voter});
            expect(BN (Proposalregistered.voteCount)).to.be.bignumber.equal(BN (0));
        });

        it('...should add 4 Proposal in Arry, get 1 description', async ()  => {
            await VotingInstance.addProposal("proposition 1", {from: voter});
            await VotingInstance.addProposal("proposition 2", {from: voter2});
            await VotingInstance.addProposal("proposition 3", {from: voter3});
            await VotingInstance.addProposal("proposition 4", {from: voter4});
            const Proposalregistered = await VotingInstance.getOneProposal(2, {from: voter});
            expect(Proposalregistered.description).to.equal("proposition 3");
        });

        // ---- Vérification de l'évènement ---- //

        it('...should emit VoterRegistered', async () => {
            const event = await VotingInstance.addProposal("proposition 1", {from: voter});
            expectEvent(event, "ProposalRegistered", {proposalId: BN (0)});
        });

        // ---- Vérification des require ---- //

        it("...should revert because of OnlyVoters", async () => {           
            await expectRevert(VotingInstance.addProposal("proposition 1", {from: other}),"You're not a voter");
        }); 

        it("...should revert because of OnlyVoters", async () => {           
            await expectRevert(VotingInstance.getOneProposal(1, {from: other}),"You're not a voter");
        });
        
        it("...should revert because of bad workflowstatus", async () => {
            await VotingInstance.endProposalsRegistering({from: owner});
            await expectRevert(VotingInstance.addProposal("proposition 1", {from: voter}),"Proposals are not allowed yet");
        });
        
        it("...should revert because of proposal", async () => {           
            await expectRevert(VotingInstance.addProposal("", {from: voter}),"Vous ne pouvez pas ne rien proposer");
        });
    });


    // ::::::::::::: VOTE ::::::::::::: //

    describe("test of vote", () => {

        beforeEach (async() => {
            VotingInstance = await Voting.new({from: owner});
            await VotingInstance.addVoter(voter, {from: owner});
            await VotingInstance.addVoter(voter2, {from: owner });
            await VotingInstance.addVoter(voter3, {from: owner });
            await VotingInstance.startProposalsRegistering({from: owner});
            await VotingInstance.addProposal("proposition 1", {from: voter});
            await VotingInstance.addProposal("proposition 2", {from: voter2});
            await VotingInstance.endProposalsRegistering({from: owner});
            await VotingInstance.startVotingSession({from: owner});
        });

        // ---- Vérification de l'enregistrement des votes ---- //

        it('...should return hasVoted true', async () => {
            await VotingInstance.setVote(0, {from: voter});
            const isregistered = await VotingInstance.getVoter(voter, {from: voter});
            expect(isregistered.hasVoted).to.be.true;
        });

        it('...should give 2 votes to proposition 2', async () => {
            await VotingInstance.setVote(1, {from: voter2});
            await VotingInstance.setVote(1, {from: voter3});
            const Proposalregistered = await VotingInstance.getOneProposal(1, {from: voter});
            expect(BN(Proposalregistered.voteCount)).to.be.bignumber.equal(BN (2));
        });

        // ---- Vérification de l'évènement ---- //

        it('...should emit VoterRegistered', async () => {
            const event = await VotingInstance.setVote(0, {from: voter});
            expectEvent(event, "Voted", {voter : voter, proposalId : BN (0)});
        });

       // ---- Vérification des require ---- //

        it("...should revert because of OnlyVoters", async () => {           
        await expectRevert(VotingInstance.setVote(0, {from: other}),"You're not a voter");
        }); 
        
        it("...should revert because of bad workflowstatus", async () => {
            await VotingInstance.endVotingSession({from: owner});
            await expectRevert(VotingInstance.setVote(0, {from: voter}),"Voting session havent started yet");
        });

        it("...should revert because of already voted", async () => {  
            await VotingInstance.setVote(0, {from: voter});     
            await expectRevert(VotingInstance.setVote(1, {from: voter}),"You have already voted");
        });
        
        it("...should revert because of proposal", async () => {           
            await expectRevert(VotingInstance.setVote(10, {from: voter}),"Proposal not found");
        });
            
            
    });


    // ::::::::::::: STATE ::::::::::::: //

    describe("test of States",  () => {
        
        before (async () => {
            VotingInstance = await Voting.new({ from: owner});
        });
        
        // ---- Vérification du statut initial ---- //
        it("...should see RegisteringVoters", async () => {
            const status = await VotingInstance.workflowStatus.call();
            expect( BN(status)).to.be.bignumber.equal(BN(0));
        });
        
        // ---- Vérification des changements de status ---- //

        it("...should state ProposalsRegistrationStarted", async () => {
            await VotingInstance.startProposalsRegistering({ from: owner });
            const status = await VotingInstance.workflowStatus.call();
            expect( BN(status)).to.be.bignumber.equal(BN(1));
        });

        it("...should state endProposalsRegistering", async () => {
            await VotingInstance.endProposalsRegistering({ from: owner });
            const status = await VotingInstance.workflowStatus.call();
            expect(BN(status)).to.be.bignumber.equal(BN(2));
        });

        it("...should state startVotingSession", async () => {
            await VotingInstance.startVotingSession({ from: owner });
            const status = await VotingInstance.workflowStatus.call();
            expect(BN(status)).to.be.bignumber.equal(BN(3));
        });

        it("...should state endVotingSession", async () => {
            await VotingInstance.endVotingSession({ from: owner });
            const status = await VotingInstance.workflowStatus.call();
            expect(BN(status)).to.be.bignumber.equal(BN(4));
        });
      });


    describe("test of event and require State",  () => {
        
        before (async () => {
            VotingInstance = await Voting.new({ from: owner});
        });
               
        // ---- Vérification des évènements et du onlyOwner ---- //
        it("...should revert because of Ownable", async () => {
            await expectRevert(VotingInstance.startProposalsRegistering({ from: other }),"Ownable: caller is not the owner");
        });
        it('...should emit WorkflowStatusChange', async () => {            
            const status = await VotingInstance.startProposalsRegistering({ from: owner });               
            expectEvent(status, "WorkflowStatusChange", {previousStatus : BN(0), newStatus : BN(1)});
        });

        it("...should revert because of Ownable", async () => {
            await expectRevert(VotingInstance.endProposalsRegistering({ from: other }),"Ownable: caller is not the owner");
        });
        it('...should emit WorkflowStatusChange', async () => {            
            const status = await VotingInstance.endProposalsRegistering({ from: owner });               
            expectEvent(status, "WorkflowStatusChange", {previousStatus : BN(1), newStatus : BN(2)});
        });

        it("...should revert because of Ownable", async () => {
            await expectRevert(VotingInstance.startVotingSession({ from: other }),"Ownable: caller is not the owner");
        });
        it('...should emit WorkflowStatusChange', async () => {            
            const status = await VotingInstance.startVotingSession({ from: owner });               
            expectEvent(status, "WorkflowStatusChange", {previousStatus : BN(2), newStatus : BN(3)});
        });

        it("...should revert because of Ownable", async () => {
            await expectRevert(VotingInstance.endVotingSession({ from: other }),"Ownable: caller is not the owner");
        });
        it('...should emit WorkflowStatusChange', async () => {            
            const status = await VotingInstance.endVotingSession({ from: owner });               
            expectEvent(status, "WorkflowStatusChange", {previousStatus : BN(3), newStatus : BN(4)});
        });

        // ---- Vérification des require par rapport aux status ---- //
        it("...should revert because proposals havent started yet", async () => {
            await expectRevert(VotingInstance.startProposalsRegistering({ from: owner }),"Registering proposals cant be started now");
        });

        it("...should revert because proposals havent started yet", async () => {
            await expectRevert(VotingInstance.endProposalsRegistering({ from: owner }),"Registering proposals havent started yet");
        });

        it("...should revert because proposals havent started yet", async () => {
            await expectRevert(VotingInstance.startVotingSession({ from: owner }),"Registering proposals phase is not finished");
        });

        it("...should revert because proposals havent started yet", async () => {
            await expectRevert(VotingInstance.endVotingSession({ from: owner }),"Voting session havent started yet");
        });

      });      


    // ::::::::::::: TALLYVOTES ::::::::::::: //
    
    describe("test of tallyVotes", () => {

        beforeEach (async () => {
            VotingInstance = await Voting.new({from: owner});
            await VotingInstance.addVoter(voter, {from: owner});
            await VotingInstance.addVoter(voter2, {from: owner });
            await VotingInstance.addVoter(voter3, {from: owner });
            await VotingInstance.addVoter(voter4, {from: owner });
            await VotingInstance.addVoter(voter5, {from: owner });
            await VotingInstance.addVoter(voter6, {from: owner });
            await VotingInstance.startProposalsRegistering({from: owner});
            await VotingInstance.addProposal("proposition 1", {from: voter});
            await VotingInstance.addProposal("proposition 2", {from: voter2});
            await VotingInstance.addProposal("proposition 3", {from: voter2});
            await VotingInstance.endProposalsRegistering({from: owner});
            await VotingInstance.startVotingSession({from: owner});            
            await VotingInstance.setVote(0, {from: voter});
            await VotingInstance.setVote(1, {from: voter2});
            await VotingInstance.setVote(1, {from: voter3});
            await VotingInstance.setVote(2, {from: voter4});
            await VotingInstance.setVote(2, {from: voter5});
            await VotingInstance.setVote(2, {from: voter6});            
        });

        // ---- Vérification de la proposition gagnante ---- //

        it("...should give winningProposalID == proposition 3", async () => {
            await VotingInstance.endVotingSession({from: owner});
            await VotingInstance.tallyVotes({from: owner});
            const WinnigP = await VotingInstance.winningProposalID.call();
            console.log(BN (WinnigP));
            expect(BN (WinnigP)).to.be.bignumber.equal(BN (2));
        });

        // ---- Vérification du changement de statut ---- //

        it("...should state VotesTallied", async () => {
            await VotingInstance.endVotingSession({from: owner});
            await VotingInstance.tallyVotes({from: owner});
            const status = await VotingInstance.workflowStatus.call();
            expect(BN(status)).to.be.bignumber.equal(BN(5));
        });
        
        // ---- Vérification de l'évènement ---- //

        it('...should emit WorkflowStatusChange', async () => {
            await VotingInstance.endVotingSession({from: owner});           
            const event = await VotingInstance.tallyVotes({from: owner});
            expectEvent(event, "WorkflowStatusChange", {previousStatus : BN(4), newStatus : BN(5)});
        });

        // ---- Vérification des require ---- //
        
        it("...should revert because of Ownable", async () => {
            await VotingInstance.endVotingSession({from: owner});
            await expectRevert(VotingInstance.tallyVotes({from: other}),"Ownable: caller is not the owner"); //vérification pour une personne non inscrite pour voter
        });

        it("...should revert because of Ownable", async () => {
            await VotingInstance.endVotingSession({from: owner});
            await expectRevert(VotingInstance.tallyVotes({from: voter}),"Ownable: caller is not the owner"); //vérification pour une personne qui vote
        });

        it("...should revert because of not VotingSessionEnded", async () => {
            await expectRevert(VotingInstance.tallyVotes({from: owner}),"Current status is not voting session ended");
        });
        
    });

});