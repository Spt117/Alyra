import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function BtnAddVoter() {
  const { state: { contract, accounts } } = useEth();
  const [inputTextValue, setInputTextValue] = useState("");

  async function handleAddVoter(){
    if(inputTextValue.length === 42){
    await contract.methods.addVoter(inputTextValue).send({from: accounts[0]});
    }
    else {window.alert("Ceci n'est pas une addresse !")};
  
};

  function handleInputText(e){
    setInputTextValue(e.target.value);
  }

  return (
        <div>
        <input type='text' onChange={handleInputText}/>
        <button onClick={handleAddVoter}>AddVoter</button>
        </div>
  );
}

export default BtnAddVoter;
