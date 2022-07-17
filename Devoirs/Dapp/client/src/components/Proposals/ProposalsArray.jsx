import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ProposalsArray() {
    const { state: { contract } } = useEth();
    const [propoID, setPropId] = useState("");

    useEffect(() => {
        if (contract) {
             tableau()
        }
    });

    // async function tableau() {
    //     let options = {
    //         fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
    //         toBlock: 'latest'
    //     };
    //     const listProposals = await contract.getPastEvents('ProposalRegistered', options);
    //     for (let i = 0; i < listProposals.length; i++) {
    //         const proposal = await contract.methods.getOneProposal(i).call({ from: accounts[0] });
    //         console.log(proposal[0]);
    //         Proposals.push(proposal[0]);
    //     }
        
    // }
    // const Proposals = [];


    // return(
    //     <div>
    //         <ul>
    //         {Proposals.map((propo, index) => (
    //             <li key={`${propo}-${index}`} >{propo}</li>
    //         ))}
    //         </ul>
    //         <h3>Tableau</h3>
    //     </div>
    // );
    
    
    
    async function tableau() {
        let options = {
            fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
            toBlock: 'latest'
          };
          const listProposals = await contract.getPastEvents('ProposalRegistered', options);
          setPropId(listProposals);
          
    
        //   const proposal = await contract.methods.getOneProposal().call({ from: accounts[0] });
        // console.log(propoID[0].returnValues);


    }
    let x = Object.keys(propoID);
    // let y = Object.entries(x);
    
    console.log(x);

      return(
                   
            <table><tr><th>Registered Proposals</th></tr>
            <tbody>
            {x.map((propo, index) => (
                    <tr><td key={`${propo}-${index}`}>{propo}</td><td>{index}</td>
                    </tr>
                ))}
            </tbody>                
            </table>
        //     <table>
        //         <thead>
        //           <th>ID</th>
        //           <th>Description</th>
        //           <th>Nombre de voix</th>
        //         </thead>
        //       <tbody>
        //     {proposals.map(proposal => (
        //       <tr key={proposal.id}>
        //         <td>{proposal.proposalId}</td>
        //         <td>{proposal.desc}</td>
        //         <td>{proposal.voteCount}</td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
        
    );


    

    

}

export default ProposalsArray;