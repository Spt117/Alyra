import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
// import {BigNumber, Contract, providers,} from 'ethers';

function GetVoter() {
    const { state: { contract, accounts } } = useEth();
    const [Voter, readaddr] = useState("");
    const [inaddr, setaddr] = useState("");

    async function getVoter() {
        const address = await contract.methods.getVoter(inaddr).call({ from: accounts[0] });
        console.log(address);
        readaddr(address);
    }

    function getAddr(e) {
        setaddr(e.target.value);
        console.log(inaddr);
    }

    return (
        <div><div>
            <input type='text' onChange={getAddr} />
            <button onClick={getVoter}>See the voter by using is address</button>
            <p>{Voter}</p>
        </div>
          {/* <table><tr><td></td></tr></table> */}
        </div>
    );
}

export default GetVoter;