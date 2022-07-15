import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [inputTextValue, setInputTextValue] = useState("");



  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  // eslint-disable-next-line
  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    // if (inputValue === "") {
    //   alert("Please enter a value to write.");
    //   return;
    // }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  async function handleAddVoter(){
    if(inputTextValue.length === 42){
    await contract.methods.addVoter(inputTextValue).send({from: accounts[0]});
  }};

  function handleInputText(e){
    setInputTextValue(e.target.value);
  }


  return (
    

      <div onClick={write} className="input-btn">
        
        <input type='text' onChange={handleInputText}/>
        <button onClick={handleAddVoter}>AddVoter</button>
        
      

    </div>
  );
}

export default ContractBtns;
