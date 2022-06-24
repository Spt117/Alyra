const Voting = artifacts.require("./Voting.sol");

const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

const { expect } = require('chai');

contract('Voting', accounts => {

    const owner = accounts[0];
    const voter = accounts[1];
    const other = accounts[2];

    let VotingInstance;

    // ::::::::::::: TEST OF Voters ::::::::::::: //
    
    describe("test of add/getVoter", () => {
        
        beforeEach (async () => {
            VotingInstance = await Voting.new({ from: owner });
        });

        it("... should add a Voter in a mapping, get isRegistered true", async () => {
            await VotingInstance.addVoter("0x1Bf9Ee786B600A294DFd0151D1aF027a286A8f4B", {from: owner });
            const isregistered = await VotingInstance.getVoter('0x1Bf9Ee786B600A294DFd0151D1aF027a286A8f4B', {from: '0x1Bf9Ee786B600A294DFd0151D1aF027a286A8f4B'});
            expect(isregistered.isRegistered).to.be.true;
        });

        it("... should add a Voter in a mapping, get hasVoted false", async () => {
            await VotingInstance.addVoter("0x1Bf9Ee786B600A294DFd0151D1aF027a286A8f4B", {from: owner });
            const isregistered = await VotingInstance.getVoter('0x1Bf9Ee786B600A294DFd0151D1aF027a286A8f4B', {from: '0x1Bf9Ee786B600A294DFd0151D1aF027a286A8f4B'});
            expect(isregistered.hasVoted).to.be.false;
        });

        it("... should add a Voter in a mapping, get votedProposalId = 0", async () => {
            await VotingInstance.addVoter("0x1Bf9Ee786B600A294DFd0151D1aF027a286A8f4B", {from: owner });
            const isregistered = await VotingInstance.getVoter('0x1Bf9Ee786B600A294DFd0151D1aF027a286A8f4B', {from: '0x1Bf9Ee786B600A294DFd0151D1aF027a286A8f4B'});
            expect(new BN(isregistered.votedProposalId)).to.be.bignumber.equal(new BN(0));
        });

    });
    



    // ::::::::::::: TEST OF STATES ::::::::::::: //

    describe.skip("test of States",  () => {
        
        before (async () => {
            VotingInstance = await Voting.new({ from: owner });
        });

        // it("...should revert because of Ownable", async () => {
        //     await expectRevert( VotingInstance.startProposalsRegistering({ from: other }),"Ownable: caller is not the owner");
        // });

        it("...should see RegisteringVoters", async () => {
            const status = await VotingInstance.workflowStatus.call();
            expect(new BN(status)).to.be.bignumber.equal(new BN(0));
        });
        
        it("...should state ProposalsRegistrationStarted", async () => {
            await VotingInstance.startProposalsRegistering({ from: owner });
            const status = await VotingInstance.workflowStatus.call();
            expect(new BN(status)).to.be.bignumber.equal(new BN(1));
        });  

        it("...should state endProposalsRegistering", async () => {
            await VotingInstance.endProposalsRegistering({ from: owner });
            const status = await VotingInstance.workflowStatus.call();
            expect(new BN(status)).to.be.bignumber.equal(new BN(2));
        });

        it("...should state startVotingSession", async () => {
            await VotingInstance.startVotingSession({ from: owner });
            const status = await VotingInstance.workflowStatus.call();
            expect(new BN(status)).to.be.bignumber.equal(new BN(3));
        });

        it("...should state endVotingSession", async () => {
            await VotingInstance.endVotingSession({ from: owner });
            const status = await VotingInstance.workflowStatus.call();
            expect(new BN(status)).to.be.bignumber.equal(new BN(4));
        });

    });

});