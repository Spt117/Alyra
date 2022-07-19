import useEth from "../contexts/EthContext/useEth";

function ChangeState({ addrOwner, nextState }) {
    const { state: { contract, accounts } } = useEth();

    async function newState() {
        await contract.methods.changeState().send({ from: accounts[0] }); 
        // const data = await contract.methods.workflowStatus().call({ from: accounts[0] });
    };

    if (contract) {
        if (addrOwner === accounts[0]) {
            return (
                <div>
                    
                    <button onClick={newState}>ChangeState</button>
                    <hr />
                </div>
            );
        }
    }
}

export default ChangeState;