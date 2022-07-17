import { EthProvider } from "./contexts/EthContext";
import IsOwner from "./components/Owner";
import MyAddress from "./components/Header";
import Welcome from "./components/Welcome";
import State from "./components/State";
import AddVoters from "./components/AddVoters";
import Proposals from "./components/Proposals";
import GetProposal from "./components/GetProposal";
import GetVoter from "./components/GetVoters";
import Vote from "./components/Vote";
import TallyVotes from "./components/TallyVotes";
import GetWinner from "./components/Winner";
import Footer from "./components/Footer";
import "./App.css";
import { useState } from "react";

function App() {
  const [currentState, nextState] = useState("");
  const [addrOwner, setOwner] = useState("");


  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <IsOwner setOwner={setOwner} />
          <MyAddress />
          <hr />
          <Welcome />
          <hr />
          <AddVoters />
          <hr />
          <GetVoter />
          <hr />
          <State nextState={nextState} addrOwner={addrOwner}/>
          <hr />
          <Proposals currentState={currentState}/>
          <GetProposal />
          <hr />
          <Vote />
          <hr />
          <TallyVotes />
          <GetWinner />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
