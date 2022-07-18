import SetVote from "./SetVote";

function SetTheVote({currentState}) {

    // eslint-disable-next-line
    if (currentState == 3) {
        return (
            <div>
                <hr />
                <SetVote />
                
            </div>
        );
    }
}

export default SetTheVote;