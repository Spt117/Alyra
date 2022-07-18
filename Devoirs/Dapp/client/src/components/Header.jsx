import useEth from "../contexts/EthContext/useEth";

function MyAddress({ addrOwner }) {
    const { state: { contract, accounts } } = useEth();

    if (contract) {
        if (addrOwner === accounts[0]) {
            return (
                <div>
                    <div><p>Your address account is {addrOwner}</p></div>
                    <div><p>Your are the admin of this voting session !</p></div>
                </div>

            );
        }
        else {
            return (<div><p>Your address account is {addrOwner}</p></div>);
        }
    }
}

export default MyAddress;