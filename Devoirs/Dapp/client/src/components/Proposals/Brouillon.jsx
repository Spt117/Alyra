import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import { BigNumber} from 'ethers';

function GetProposal() {
    const { state: { contract, accounts } } = useEth();
    const [value, readProposal] = useState("");
    const [id, setId] = useState("");

    async function proposal(id) {
        const proposal = await contract.methods.getOneProposal(id).call({from: accounts[0]});
        console.log(proposal);
        readProposal(proposal);
    }

    function getId(e) {
        console.log(e);
        const BN = BigNumber(e.target.value);
        console.log(BN);
        setId(BN);
        console.log(id);
    }

    return (
        <div>
        <input type='text' onChange={getId}/>    
        <div><button onClick={proposal}>See the proposal by the id</button></div>
        <p>{value}</p>
        </div>
  );


}
export default GetProposal;