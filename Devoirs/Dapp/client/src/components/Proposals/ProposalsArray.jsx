import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ProposalsArray() {
    const { state: { contract, accounts } } = useEth();
    const [propoID, setPropId] = useState([]);
    // const [value, readProposal] = useState([]);

    useEffect(() => {
        if (contract) {
            tableau()
            // .then
        }
    });

    async function tableau() {
        let options = {
            fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
            toBlock: 'latest'
        };
        const listProposals = await contract.getPastEvents('ProposalRegistered', options);
        setPropId(listProposals);
        // getPropo(listProposals.returnValues.proposalId)
        // console.log(listProposals)
    }


    // console.log(Object.keys(propoID))

    // if (contract) {
    // async function getPropo(i) {
    //     // for (let i = 0; i < propoID.length; i++) {
    //         const proposal = await contract.methods.getOneProposal(i).call({ from: accounts[0]});
    //         readProposal(proposal)
    //     // }
    // }}


    // console.log(getPropo(0));

    // let ArrayPropo = [];

    // console.log(propoID)
    // console.log(propoID)
    // console.log(propoID[0])

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
                    {propoID.map((propo) => (
                        <tr key={propo.returnValues.proposalId}>
                            <td>{propo.returnValues.proposalId}</td>
                            <td>{propo.returnValues.description}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}


export default ProposalsArray;