import { EthProvider } from "./contexts/EthContext";
import Welcome from "./components/Welcome";
import ChangeState from "./components/ChangeState/changeState";
import GetState from "./components/State";
import AddVoters from "./components/AddVoters";
import Proposals from "./components/Proposals";
import GetVoter from "./components/GetVoters";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Welcome />
          <hr />
          <AddVoters />
          <GetVoter />
          <hr />
          <ChangeState />
          <GetState />
          <hr />
          <Proposals />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
