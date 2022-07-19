import useEth from "../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import "./CSS.css";


function Param() {
  const { state } = useEth();
  // const [value, setValue] = useState("?");

  const Params =
    <>
      <div className="contract-container">
        <h3 className="network">You are on the good NetWork of Voting Dapp !</h3>
      </div>
    </>;

  return (
    <div className="demo">
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            Params
      }
      <hr />
    </div>
  );
}

export default Param;
