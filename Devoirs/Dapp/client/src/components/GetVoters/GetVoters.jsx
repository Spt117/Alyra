import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
// import {BigNumber, Contract, providers,} from 'ethers';

function GetVoter() {
    const { state: { contract, accounts } } = useEth();
    const [Voter, readaddr] = useState("");
    const [inaddr, setaddr] = useState("");

    async function getVoter() {
        const address = await contract.methods.getVoter(inaddr).call({ from: accounts[0] });
        let voter = ["not registered", "hasn't voted", address[2]]

        if (address[0]) {
            voter[0] = 'registered';
        }
        if (address[1]) {
            voter[1] = 'has voted the proposal ' + voter[2];
        }
        readaddr("This voter is " + voter[0] + " and he " + voter[1]);
    }

    function getAddr(e) {
        setaddr(e.target.value);
    }

    return (
        <div>
            <button onClick={getVoter}>See the voter by using is address</button>
            <input type='text' onChange={getAddr} />
            <p>{Voter}</p>
        </div>
         
    );
}

export default GetVoter;