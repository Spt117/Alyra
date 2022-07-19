import useEth from "../contexts/EthContext/useEth";
import "./CSS.css";

function MyAddress({ addrOwner }) {
    const { state: { contract, accounts } } = useEth();

    if (contract) {
        if (addrOwner === accounts[0]) {
            return (
                <div className="param">
                    <span className="addr">{addrOwner}</span>
                    <p id="para1">Your are the admin of this voting session !</p>
                    <hr />
                </div>


            );
        }
        else {
            return (
            <div className="param">
                <span className="addr">{addrOwner}</span>
                <p id="para1">You are not the admin.</p>
                <hr />
            </div>
            );
        }
    }
}

export default MyAddress;