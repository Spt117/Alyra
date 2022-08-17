import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ProposalsArray() {
    const { state: { contract, accounts } } = useEth();
    const [events, setEvents] = useState([]);

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
        setEvents(listProposals);
    }


    const getDescription = async (event) =>{
        const [description] = await contract.methods.getOneProposal(event.returnValues.proposalId).call({ from: accounts[0] })
        return(description)
        console.log(description)
    }



    // console.log(events)
    
    return (
        <div>
            <tbody>
            {events.map((event) => (
              <tr>
                <td className="id" >{event.returnValues.proposalId}</td>
                {/* <td className="id" >{event.returnValues.description}</td> */}
                {/* <td>{getDescription(event)}</td> */}
              </tr>
            ))}
          </tbody> 
        </div>
    );
}


export default ProposalsArray;