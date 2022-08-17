import React, { Component } from "react";
import Voting from "/home/jb/Projets/Alyra/Devoirs/Dapp/client/src/contracts/Voting.json";
import getWeb3 from "../getWeb3";

class ProposalsArray extends Component {
  state = {  web3: null, accounts: null, contract: null, numero: null };
  
  componentDidMount = async () => {
    
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const instance = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address,
      );

      let options = {
        fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
        toBlock: 'latest'
      };

      // let arrayProposals =[];

      const listNumber = await instance.getPastEvents('ProposalRegistered', options);
    console.log(listNumber);
    
    

      console.log(listNumber.length);
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, numero: listNumber});
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    
    return (
      <div>
        
        <table>
        {this.state.numero.map((addresse) => (
          <tr>
            <td>{addresse.returnValues.proposalId}</td>
          <td>{addresse.returnValues.description}</td>
          </tr>
        ))}
        </table>
      </div>
    );
  }
}


export default ProposalsArray;