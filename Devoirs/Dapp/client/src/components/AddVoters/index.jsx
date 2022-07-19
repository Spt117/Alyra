import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import Cta from "./Cta";
import BtnAddVoter from "./BtnAddVoter";
import Desc from "./Desc";


function Demo({ currentState, addrOwner }) {
  const { state: { contract, accounts } } = useEth();

  if (contract) {
    // eslint-disable-next-line
    if ((addrOwner === accounts[0]) && (currentState == 0)) {
      return (
        <div className="addvoter">
          
          <Title />
          <Cta />
          <div >
            <BtnAddVoter />
          </div>
          <Desc />
          <hr />
        </div>
      );
    };
  };
}

export default Demo;
