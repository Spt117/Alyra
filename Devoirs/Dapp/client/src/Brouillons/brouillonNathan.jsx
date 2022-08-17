import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ProposalsArray() {
    const { state: { contract, accounts } } = useEth();
    const [proposalList, setProposalList] = useState([]);
    // const [value, readProposal] = useState([]);

    useEffect(() => {
        if (contract) {
            // tableau()
            // getPropo()
            if(proposalList.length === 0){
                const listProposals =  contract.getPastEvents('ProposalRegistered', options);
                // console.log(listProposals);
                for (let i = 0; i < listProposals.length; i++) {
                    const testprop =  contract.methods.getOneProposal(i).call( {from: accounts[0]} );
                    console.log(testprop.description);
                    setProposalList(prev => ([...prev, testprop.description]));
                }
            }
        }
    });

    // async function tableau() {
        let options = {
            fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
            toBlock: 'latest'
        };
    //     const listProposals = await contract.getPastEvents('ProposalRegistered', options);
    //     setPropId(listProposals);
    //     // getPropo(listProposals.returnValues.proposalId)
    //     // console.log(listProposals)
    // }


    // console.log(Object.keys(propoID))
    
    // const array = [];
    
    // function getPropo() {
    //     for (let i = 0; i < propoID.length; i++) {
    //         const proposal = contract.methods.getOneProposal(i).call({ from: accounts[0]});
    //         proposal.then( result =>{
    //             array.push(result[0])
    //         })
            
    //     }
    // }


    // let ArrayPropo = [];
    // console.log(propoID)


    // eslint-disable-next-line
if(!proposalList.length==0) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Proposals Id</th>
                        <th>Proposals Description</th>
                    </tr>
                </thead>
                <tbody>
                    {proposalList.map((propo) => (
                        <tr key={propo.returnValues.proposalId}>
                            <td>{propo.returnValues.proposalId}</td>
                            <td>{propo.returnValues.description}</td>
                            {/* <td>{array[propo]}</td> */}
                        </tr>
                    ))}

                </tbody>
            </table>
            <hr />
        </div>
    );
}
}


export default ProposalsArray;