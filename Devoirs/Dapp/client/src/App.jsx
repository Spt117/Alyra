import { EthProvider} from "./contexts/EthContext";
// import useEth from "./contexts/EthContext/useEth";
import IsOwner from "./components/Owner";
import MyAddress from "./components/Header";
import WichState from "./components/State";
import Welcome from "./components/Welcome";
import ChangeState from "./components/ChangeState";
import AddVoters from "./components/AddVoters";
import Proposals from "./components/Proposals";
// import GetProposal from "./components/GetProposal";
import ProposalsArray from "./components/Proposals/ProposalsArray";
import GetVoter from "./components/GetVoters";
import Vote from "./components/Vote";
import TallyVotes from "./components/TallyVotes";
import GetWinner from "./components/Winner"; 
import "./App.css";
import { useState } from "react";
import Param from "./components/Param";

function App() {
  const [currentState, nextState] = useState([]);
  const [addrOwner, setOwner] = useState([]);


  // const myApp = 
  // <>
  // <div><h2>ça marche</h2></div>
  // </>

  return (
      <EthProvider>
        <div id="App" >
          <div className="container">
          <MyAddress addrOwner={addrOwner} />
          <Welcome />
          <Param />
            <IsOwner setOwner={setOwner} />
            
            <WichState nextState={nextState}  /> 
            <ChangeState nextState={nextState} addrOwner={addrOwner} />
            <AddVoters currentState={currentState} addrOwner={addrOwner} />
            <GetVoter />
            <TallyVotes currentState={currentState} addrOwner={addrOwner} />
            <Vote currentState={currentState} />
            
            <GetWinner currentState={currentState} />
            <Proposals currentState={currentState} />
            {/* <GetProposal currentState={currentState} /> */}
            <ProposalsArray />
            
          </div>
          {/* <div className="demo">
      {
        // !state.artifact ? <NoticeNoArtifact /> :
        //   !state.contract ? <NoticeWrongNetwork /> :
          myApp
      }
    </div> */}
        </div>
      </EthProvider>
      
  );
}

export default App;
