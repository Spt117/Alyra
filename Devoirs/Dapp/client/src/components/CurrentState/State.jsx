import useEth from "../../contexts/EthContext/useEth";


function getState(){
    const { state: { contract, accounts } } = useEth();
}

// contract.methods.workflowStatus().call();
// await contract.methods.workflowStatus.call();