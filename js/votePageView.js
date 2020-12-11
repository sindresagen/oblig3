function updateViewVotePage() {
    // const pageInputs = model.inputs.createPoll;
    // const buttonText = pageInputs.pollId !== null ? 'Oppdater' : 'Lag';
    // const checked = pageInputs.usersCanAddAlternatives ? 'checked' : '';
    // const poll = getCurrentPoll();
    // const hasVotes = poll !== null && Object.keys(poll.votes).length > 0;
    // const disableInput = hasVotes ? 'disabled' : '';

    document.getElementById('app').innerHTML = `        
        <h3>Stem</h3>
        ${createVoteButtonsHtml()}
    `;
}

function createVoteButtonsHtml() {
    const poll = getCurrentPoll();
    const user = model.app.loggedInUser;
    const currentVote = poll.votes[user];

    let html = '';
    for (let option of poll.options) {
        const currentVoteInfo = option === currentVote ? `Du har stemt på <b>${option}</b>` : '';
        html += `<button onclick="vote('${option}')">${option}</button> ${currentVoteInfo}<br/>`;
    }
    return html;
}