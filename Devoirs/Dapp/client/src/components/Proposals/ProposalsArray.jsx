import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ProposalsArray() {
    const { state: { contract, accounts } } = useEth();
    const [propoID, setPropId] = useState([]);
    const [propoID2, setPropId2] = useState([]);

    useEffect(() => {
        if (contract) {
            tableau()
        }// eslint-disable-next-line
    }, [accounts, contract,propoID2]);

    useEffect(() => {
        if (contract) {
            event();    
        }
    });

    async function tableau() {

        const listProposals = await contract.getPastEvents('ProposalRegistered', {fromBlock : 0});
        // const test = listProposals.map((e) => e.returnValues.proposalId);
        let idsPropo = [];
        let proposals = [];
        for (let i = 0; i < listProposals.length; i++) { idsPropo.push(listProposals[i].returnValues.proposalId) }
        for (let i = 0; i < idsPropo.length; i++) {
            const propo = await contract.methods.getOneProposal(i).call({ from: accounts[0] });
            proposals.push(
                {
                    id: i,
                    desc: propo.description,
                    voteCount: propo.voteCount
                }
            );
        }
        setPropId(proposals);
    }

    async function event() {
        let options = {
          fromBlock: 'latest'
        };
        contract.events
          .ProposalRegistered(options)
          .on("data", (event) => setPropId2(event.returnValues.proposalId));
      }

    // eslint-disable-next-line
    if (!propoID.length == 0) {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Proposals Id</th>
                            <th>Proposals Description</th>
                            <th>VoteCount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propoID.map((propo, index) => (
                            <tr key={index}>
                                <td>{propo.id}</td>
                                <td>{propo.desc}</td>
                                <td>{propo.voteCount}</td>
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