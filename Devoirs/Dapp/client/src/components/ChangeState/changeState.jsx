import useEth from "../../contexts/EthContext/useEth";

function ChangeState() {
  const { state: { contract, accounts } } = useEth();
//   const [inputTextValue, setInputTextValue] = useState("");

  async function newState(){
    
    await contract.methods.changeState().send({from: accounts[0]});
    
  
};

  
  return (
        <div>
            <button onClick={newState}>ChangeState</button>
        </div>
  );
}

export default ChangeState;
