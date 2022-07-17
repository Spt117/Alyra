import useEth from "../contexts/EthContext/useEth";
import { useState } from "react";

function GetProposal({currentState}) {
    const { state: { contract, accounts } } = useEth();
    const [value, readProposal] = useState("");
    const [id, setId] = useState("");

    async function proposal() {
        const proposal = await contract.methods.getOneProposal(id).call({ from: accounts[0] });
        readProposal(proposal);
    }

    function getId(e) {
        setId(e.target.value);
        console.log(id);
    }

    // eslint-disable-next-line
    if (!(currentState == 0)) {
        return (
            <div>
                <input type='text' onChange={getId} />
                <button onClick={proposal}>See the proposal by the id</button>
                <p>{value[0]}</p>
                <hr />
            </div>
        );
    }
}

export default GetProposal;