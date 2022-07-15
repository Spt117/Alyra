import { EthProvider } from "./contexts/EthContext";
import Welcome from "./components/Welcome";
import GetState from "./components/State";
import AddVoters from "./components/AddVoters";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Welcome />
          <hr />
          <GetState />
          <hr />
          <AddVoters />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
