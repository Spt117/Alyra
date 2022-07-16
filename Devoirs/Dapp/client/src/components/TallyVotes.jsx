import useEth from "../contexts/EthContext/useEth";

function TallyVotes() {
    const { state: { contract, accounts } } = useEth();

    async function tallytheVotes() {
        await contract.methods.tallyVotes().send({from: accounts[0]});
    };

    return(
        <div>
            <button onClick={tallytheVotes}>Tally the votes !</button>
        </div>
    );

}

export default TallyVotes;