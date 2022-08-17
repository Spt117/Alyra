import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ProposalsArray() {
    const { state: { contract, accounts} } = useEth();
    const [propoID, setPropId] = useState([]);
    // const [value, readProposal] = useState([]);
    const array = [];

    useEffect(() => {
        if (contract) {
            tableau()
            getPropo()
        }
    });

    async function tableau() {
        let options = {
            fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
            toBlock: 'latest'
        };
        const listProposals = await contract.getPastEvents('ProposalRegistered', options);
        setPropId(listProposals);
        // getPropo();
    }
  
    function getPropo() {
        for (let i = 0; i < propoID.length; i++) {
            const proposal = contract.methods.getOneProposal(i).call({ from: accounts[0]});
            proposal.then( result =>{
                array.push(result[0])              
            }) 
        }
    }

    console.log(array)

    // let ArrayPropo = [];
    // console.log(propoID)
    // eslint-disable-next-line
if(!propoID.length==0) {
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
                    {array.map((propo, index) => (
                        <tr key={index}>
                            <td>{propo}</td>
                            <td>{index}</td>
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