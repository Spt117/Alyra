import useEth from "../contexts/EthContext/useEth";
import "./CSS.css";
// import { useEffect } from "react";
// import truncateEthAddress from 'truncate-eth-address';

function MyAddress({ addrOwner }) {
    const { state: { contract, accounts } } = useEth();


    const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{6})$/;
    console.log(truncateRegex)
    function truncateEth (address) {
        const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
    } 

    if (contract) {
        if (addrOwner === accounts[0]) {
            return (
                <div className="param">
                    <span className="addr">{truncateEth(accounts[0])}</span>
                    <p id="para1">Your are the admin of this voting session !</p>
                    <hr />
                </div>


            );
        }
        else {
            return (
                <div className="param">
                    <span className="addr">{truncateEth(accounts[0])}</span>
                    <p id="para1">You are not the admin.</p>
                    <hr />
                </div>
            );
        }
    }
}

export default MyAddress;