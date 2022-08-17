import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ProposalsArray() {
    const { state: { contract } } = useEth();
    const [propoID, setPropId] = useState("");
    // const [value, readProposal] = useState("");

    useEffect(() => {
        // if (contract) {
            tableau()
        // }
    });

    async function tableau() {
        let options = {
            fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
            toBlock: 'latest'
        };
        const listProposals = await contract.getPastEvents('ProposalRegistered', options);
        setPropId(listProposals);
    }


    // console.log(Object.keys(propoID))

    // async function getPropo(i) {
    //     const proposal = await contract.methods.getOneProposal(i).call({ from: accounts[0] });
    //     // takeProp(proposal.description)
    //     // ArrayPropo.push(proposal.description);
    //     readProposal(proposal);
    // }


    // console.log(getPropo(0));

    // let ArrayPropo = [];

    // console.log(propoID)
    console.log(propoID[0])
    
    return (
        <div>
            <table>
                <tbody>
                    {Object.keys(propoID).map((propo) => (
                        <tr>
                            <td>{propo}</td>
                            <td></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}


export default ProposalsArray;