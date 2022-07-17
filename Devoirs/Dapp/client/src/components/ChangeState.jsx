import useEth from "../contexts/EthContext/useEth";

function ChangeState({ addrOwner, nextState }) {
    const { state: { contract, accounts } } = useEth();

    async function newState() {
        await contract.methods.changeState().send({ from: accounts[0] }); 
        let options = {            
            toBlock: 'latest'
          };
        const data = await contract.getPastEvents('WorkflowStatusChange', options)
        nextState(data[0].returnValues.newStatus);
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