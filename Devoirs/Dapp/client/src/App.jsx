import { EthProvider } from "./contexts/EthContext";
import IsOwner from "./components/Owner";
import MyAddress from "./components/Header";
import WichState from "./components/State";
import Welcome from "./components/Welcome";
import ChangeState from "./components/ChangeState";
import AddVoters from "./components/AddVoters";
import Proposals from "./components/Proposals";
import GetProposal from "./components/GetProposal";
import ProposalsArray from "./components/Proposals/ProposalsArray";
import GetVoter from "./components/GetVoters";
import Vote from "./components/Vote";
import TallyVotes from "./components/TallyVotes";
import GetWinner from "./components/Winner";
import Footer from "./components/Footer";
import "./App.css";
import { useState } from "react";

function App() {
  const [currentState, nextState] = useState([]);
  const [addrOwner, setOwner] = useState([]);


  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Welcome />
          <IsOwner setOwner={setOwner} />
          <MyAddress />
          <WichState nextState={nextState} />
          <hr />
          <AddVoters currentState={currentState} addrOwner={addrOwner} />
          <GetVoter />
          <ChangeState nextState={nextState} addrOwner={addrOwner} />
          <Proposals currentState={currentState} />
          <GetProposal currentState={currentState} />
          <ProposalsArray />
          <Vote currentState={currentState} />
          <TallyVotes currentState={currentState} addrOwner={addrOwner} />
          <GetWinner currentState={currentState} />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
