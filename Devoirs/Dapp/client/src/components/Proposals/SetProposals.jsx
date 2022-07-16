import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Setproposal() {
    const { state: { contract, accounts } } = useEth();
    const [inputTextValue, setInputTextValue] = useState("");

    async function addProposal() {
        if (inputTextValue === "") {
            window.alert("You can't add an empty proposal !");
        }
        else await contract.methods.addProposal(inputTextValue).send({ from: accounts[0] });
    };


    function handleInputText(e) {
        setInputTextValue(e.target.value);
    }

    return (
        <div>
            <input type='text' onChange={handleInputText} />
            <button onClick={addProposal}>Add a proposal</button>
        </div>
    );


}

export default Setproposal;