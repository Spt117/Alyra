import SetVote from "./SetVote";

function SetTheVote({currentState}) {

    // eslint-disable-next-line
    if (currentState == 3) {
        return (
            <div>
               
                <SetVote />
                <hr />
            </div>
        );
    }
}

export default SetTheVote;