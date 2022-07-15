import useEth from "../contexts/EthContext/useEth";
import { useEffect } from "react";
// import { useState } from "react";


function GetState(){
    const { state: { contract, accounts } } = useEth();
    // const [value, readState] = useState("");
    
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

    useEffect(() => {
        const data =  contract.methods.workflowStatus().call({from: accounts[0]});
        console.log(data);
    },[]);

    async function theState(){
      const data =  await contract.methods.workflowStatus().call({from: accounts[0]});
        console.log(data);
    }
    

    return(
        <div>
        <div><button onClick={theState}>Voir le state</button></div>
        </div>
    )
    
}

// contract.methods.workflowStatus().call();
// await contract.methods.workflowStatus.call();





export default GetState;