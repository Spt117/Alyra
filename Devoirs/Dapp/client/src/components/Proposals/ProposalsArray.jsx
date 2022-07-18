import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ProposalsArray() {
    const { state: { contract } } = useEth();
    const [propoID, setPropId] = useState([]);

    useEffect(() => {
        if (contract) {
            tableau()
            // getPropo()
        }
    });

    async function tableau() {
        let options = {
            fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
            toBlock: 'latest'
        };
        const listProposals = await contract.getPastEvents('ProposalRegistered', options);
        setPropId(listProposals);
    }

    // eslint-disable-next-line
    if (!propoID.length == 0) {
        return (
            <div className="tableau">
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