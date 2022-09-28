import useEth from "../contexts/EthContext/useEth";
import { MDBSpinner } from 'mdb-react-ui-kit';
import { useState } from "react";

function ChangeState({ addrOwner, nextState }) {
    const { state: { contract, accounts } } = useEth();
    const[bool, setBool]=useState()

    async function newState() {
        setBool(true)
        try{
        await contract.methods.changeState().send({ from: accounts[0] }); 
        // const data = await contract.methods.workflowStatus().call({ from: accounts[0] });
        setBool(false)
    }
    catch{
        setBool(false) 
    }
    };

    if (contract) {
        if (addrOwner === accounts[0]) {
            return (
                <div>
                    
                    <button onClick={newState}>ChangeState {bool === true && <MDBSpinner class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true" />}</button>
                    <hr />
                </div>
            );
        }
    }
}

export default ChangeState;