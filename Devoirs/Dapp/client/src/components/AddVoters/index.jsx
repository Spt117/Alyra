import useEth from "../../contexts/EthContext/useEth";
import { useEffect } from "react";
import { useState } from "react";
import Title from "./Title";
import Cta from "./Cta";
import BtnAddVoter from "./BtnAddVoter";
import Desc from "./Desc";


function Demo() {
  const { state: { contract, accounts } } = useEth();
  const [owner, setOwner] = useState("");

  useEffect(() => {
    if (contract) {
      setTheOwner();
    }
  });

  async function setTheOwner() {
    const addr = await contract.methods.owner().call();
    console.log(owner);
    setOwner(addr);
  }

  
if(contract) {
  if (owner === accounts[0]) {
  return (
    <div>
      <Title />
      <Cta />
      <div >
        <BtnAddVoter />
      </div>
      <Desc />

    </div>
  );};};
}

export default Demo;
