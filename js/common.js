function getCurrentPoll() {
    const pollId = model.app.currentPoll;
    // return model.polls.filter(p => p.id === pollId)[0];

    for (let poll of model.polls) {
        if (poll.id === pollId) return poll;
    }
    return null;
}