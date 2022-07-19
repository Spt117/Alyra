import useEth from "../contexts/EthContext/useEth";

function TallyVotes({ currentState, addrOwner }) {
    const { state: { contract, accounts } } = useEth();

    async function tallytheVotes() {
        await contract.methods.tallyVotes().send({ from: accounts[0] });
    };

    if (contract) {
        // eslint-disable-next-line
        if ((addrOwner === accounts[0]) && (currentState == 4)) {
            return (
                <div>
                    <button onClick={tallytheVotes}>Tally the votes !</button>
                    <hr />
                </div>

            );
        }
    }
}

export default TallyVotes;