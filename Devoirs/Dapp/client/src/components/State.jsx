import useEth from "../contexts/EthContext/useEth";
// import { useEffect } from "react";
import { useState } from "react";


function GetState(){
    const { state: { contract, accounts } } = useEth();
    const [value, readState] = useState("");
    let workflowStatus = ['Admin is registering voters','Proposals registration started','Proposals registration ended','Voting session started','Voting session ended','Votes tallied'];
    
    // useEffect( async () => {
    //     const thestate = await contract.methods.workflowStatus().call({from: accounts[0]});
    // readState(thestate);
    // },[]);
    // useEffect(() => {
    //     fetchData();
    //     async function fetchData() {
    //         try { const thestate = await contract.methods.workflowStatus().call({from: accounts[0]});
    //         console.log(thestate);
    //         readState(thestate);
    //         } catch (error) {
    //         console.log("JBJBJBJBJBJB");
    //         }
    
    //     }},[]);

    // useEffect(() => {
    //     theState();
                  
    // });

    async function theState(){
      const data =  await contract.methods.workflowStatus().call({from: accounts[0]});
        console.log(data);
        readState(workflowStatus[data]);
    }
    

    return(
        <div>
        <div><button onClick={theState}>Voir le state</button></div>
        <p>{value}</p>
        </div>
    )
    
}

export default GetState;