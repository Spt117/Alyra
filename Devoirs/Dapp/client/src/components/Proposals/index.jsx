import Setproposal from "./SetProposals";

function SetTheProposals({ currentState }) {

    // eslint-disable-next-line
    if (currentState == 1) {
        return (
            <div>
                <Setproposal />
                <hr />
            </div>
        );
    }
}

export default SetTheProposals;