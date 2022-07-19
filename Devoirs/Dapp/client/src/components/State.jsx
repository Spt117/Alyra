import useEth from "../contexts/EthContext/useEth";
import { useEffect, useState } from "react";

function WichState({ nextState }) {
    const { state: { contract, accounts } } = useEth();
    const [value, readState] = useState("");
    let workflowStatus = ['Admin is registering voters', 'Proposals registration started', 'Proposals registration ended', 'Voting session started', 'Voting session ended', 'Votes tallied'];

    useEffect(() => {
        if (contract) {
            theState();
            event();
        }
    });

    async function theState() {
        const data = await contract.methods.workflowStatus().call({ from: accounts[0] });
        readState(workflowStatus[data]);
        nextState(data);

    }

    async function event() {

        // const dataState = await contract.getPastEvents('WorkflowStatusChange', options)
        // nextState(dataState[0].returnValues.newStatus);
        // console.log(dataState[0].returnValues.newStatus);
        let options = {
            fromBlock: 'latest'
        };
        contract.events.WorkflowStatusChange(options)
            .on('data', event => nextState(event.returnValues[1]))
    }

    return (
        <div className="state">
            <h2>Status of the voting session</h2>
            <p>{value}</p>
            <hr />
        </div>

    );
}

export default WichState;