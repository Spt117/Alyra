import useEth from "../contexts/EthContext/useEth";
import { useState } from "react";
import { useEffect } from "react";

function TallyVotes() {
    const { state: { contract, accounts } } = useEth();
    const [owner, setOwner] = useState("");

    useEffect(() => {
        if (contract) {
            setTheOwner();
        }
    });

    async function setTheOwner() {
        const addr = await contract.methods.owner().call();
        setOwner(addr);
    }

    async function tallytheVotes() {
        await contract.methods.tallyVotes().send({from: accounts[0]});
    };

   if(contract) {
    if (owner === accounts[0]){
        return(
            <div>
                <button onClick={tallytheVotes}>Tally the votes !</button>
            </div>
        );
    }
   }
   
   
    

}

export default TallyVotes;