import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function MyAddress() {
    const { state: { contract, accounts } } = useEth();
    const [addr, setAddress] = useState("");


    useEffect(() => {
        if(contract){
            putAddr();
        }  
    });

    async function putAddr() {

        const account = await accounts[0];
        setAddress(account)
    };

    return (
        <div><p>Your address account is</p> {addr}</div>
    );
}

export default MyAddress;