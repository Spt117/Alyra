import useEth from "../contexts/EthContext/useEth";
import { useEffect, useState } from "react";

function WichState({ nextState }) {
    const { state: { contract, accounts } } = useEth();
    const [value, readState] = useState("");
    let workflowStatus = ['Admin is registering voters', 'Proposals registration started', 'Proposals registration ended', 'Voting session started', 'Voting session ended', 'Votes tallied'];


    useEffect(() => {
        if (contract) {
            theState();
        }
    });

    async function theState() {
        const data = await contract.methods.workflowStatus().call({ from: accounts[0] });
        readState(workflowStatus[data]);
        nextState(data);
    }



    return (
        <div>
            <p>{value}</p>
        </div>

    );

    
}

export default WichState;