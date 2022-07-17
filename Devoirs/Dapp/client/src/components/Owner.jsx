import useEth from "../contexts/EthContext/useEth";
import { useEffect } from "react";

function IsOwner({ setOwner }) {
    const { state: { contract } } = useEth();

    useEffect(() => {
        if (contract) {
            setTheOwner();
        }
    })

    async function setTheOwner() {
        const addr = await contract.methods.owner().call();
        setOwner(addr);
    }
}

export default IsOwner;