import useEth from "../contexts/EthContext/useEth";
import { useEffect } from "react";
import { useState } from "react";

function State({ nextState, addrOwner }) {
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


    async function newState() {
        await contract.methods.changeState().send({ from: accounts[0] });

        if (contract) {
            contract.getPastEvents('WorkflowStatusChange')
        }
        theState();
    };

    if (contract) {
        if (addrOwner === accounts[0]) {
            return (
                <div>
                    <div>
                        <button onClick={newState}>ChangeState</button>
                    </div>
                    <div>
                        <p>{value}</p>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <p>{value}</p>
                </div>

            );
        }
    }

}

export default State;