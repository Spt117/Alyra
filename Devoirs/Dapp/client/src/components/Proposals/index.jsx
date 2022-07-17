import Setproposal from "./SetProposals";
import useEth from "../../contexts/EthContext/useEth";



function SetTheProposals({currentState}) {
    const { state: { contract } } = useEth();


    if(contract) {
        // eslint-disable-next-line
        if(currentState==1) {
            return(
                <div>
                <Setproposal />
                </div>
            );
        }
    } 

    

}

export default SetTheProposals;