import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function SetVote() {
    const { state: { contract, accounts } } = useEth();
    const [inputVote, setTheVote] = useState("");

    async function vote(){
        if(inputVote === ""){
            window.alert("This isn't a valid proposal !");
        }
        else await contract.methods.setVote(inputVote).send({ from: accounts[0] });
    }

    function addVote(e) {
        setTheVote(e.target.value);
    }

    return(
        <div>            
            <button onClick={vote}>VOTE</button>
            <input type="text" onChange={addVote}/>
        </div>
    );

}

export default SetVote;