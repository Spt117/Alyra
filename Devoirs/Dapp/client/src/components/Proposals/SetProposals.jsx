import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Setproposal() {
    const { state: { contract, accounts } } = useEth();
    const [inputTextValue, setInputTextValue] = useState("");

    // useEffect(() => {
    //     if (contract) {
    //         tableau()
    //     }
    // });

    // async function event() {
    //     let options = {
    //         fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
    //         toBlock: 'latest'
    //     };
    //     const listProposals = await contract.getPastEvents('ProposalRegistered', options);
    //     const proposal = await contract.methods.getOneProposal(id).call({ from: accounts[0] });
    //     console.log(listProposals[0].returnValues.proposalId);
    //     console.log(listProposals.length);
    //     setId(listProposals[0].returnValues.proposalId);

    // }
    

    async function addProposal() {
        if (inputTextValue === "") {
            window.alert("You can't add an empty proposal !");
        }
        else {
            await contract.methods.addProposal(inputTextValue).send({ from: accounts[0] });
            // const callingProposals = await contract.methods.getOneProposal().call();
        }
    };

    function handleInputText(e) {
        setInputTextValue(e.target.value);
    }

    return (
        <div>
            <button onClick={addProposal}>Add a proposal</button>
            <input type='text' onChange={handleInputText} />            
        </div>
    );


}

export default Setproposal;