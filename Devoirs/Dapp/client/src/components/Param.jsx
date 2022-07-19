// import { useState } from "react";
// import useEth from "../../contexts/EthContext/useEth";
import useEth from "../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";


function Param( ) {
  const { state } = useEth();
  // const [value, setValue] = useState("?");

  const Params =
    <>
      
      <div className="contract-container">
        <h3>You are on the good NetWork !</h3>
        
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
