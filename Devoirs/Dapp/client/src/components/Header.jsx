import useEth from "../contexts/EthContext/useEth";
import "./"

function MyAddress({ addrOwner }) {
    const { state: { contract, accounts } } = useEth();

    if (contract) {
        if (addrOwner === accounts[0]) {
            return (
                <div className="param-le">
                    <div><p>Your address account is <span id="addr">{addrOwner}</span></p></div>
                    <div><p>Your are the admin of this voting session !</p></div>
                    <hr />
                </div>
                

            );
        }
        else {
            return (<div><p>Your address account is {addrOwner}</p><hr /></div>);
        }
    }
}

export default MyAddress;