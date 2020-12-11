function vote(option) {
    const poll = getCurrentPoll();
    const user = model.app.loggedInUser;
    poll.votes[user] = option;
    updateView();
}