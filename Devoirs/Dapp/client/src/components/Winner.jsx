import useEth from "../contexts/EthContext/useEth";
import { useState } from "react";


function GetWinner() {
    const { state: { contract, accounts } } = useEth();
    const [value, readProposal] = useState("");

    async function winningProposal() {
        const winner = await contract.methods.winningProposalID().call({from: accounts[0]});
        console.log(winner);
        const proposal = await contract.methods.getOneProposal(winner).call({from: accounts[0]});
        readProposal(proposal);
    };


    return(
        <div>
            <h2>La proposition gagnante est</h2>
            <p>{value[0]}</p>
            <p>Avec {value[1]} voix</p>
            <button onClick={winningProposal}>Voir la proposition gagnante</button>
        </div>
    );

}

export default GetWinner;