function updateViewCreateVotePage() {
    const pageInputs = model.inputs.createPoll;
    const buttonText = pageInputs.pollId !== null ? 'Oppdater' : 'Lag';
    const checked = pageInputs.usersCanAddAlternatives ? 'checked' : '';
    const poll = getCurrentPoll();
    const hasVotes = poll !== null && Object.keys(poll.votes).length > 0;
    const disableInput = hasVotes ? 'disabled' : '';

    document.getElementById('app').innerHTML = `        
        <h3>Spørsmål</h3>
        <input 
            type="text" 
            value="${pageInputs.question}" 
            size="80" 
            oninput="model.inputs.createPoll.question=this.value" 
            ${disableInput}
        />
        <br/>
        <input 
            type="checkbox" 
            onchange="model.inputs.createPoll.usersCanAddAlternatives=this.checked==='checked'" 
            ${checked} 
        />
        La brukere legge til egne alternativer
        <br/>
        <h4>Alternativer</h4>
        <ul>
            ${createVotesHtml()}
        </ul>
        <input 
            type="text" 
            value="${model.inputs.createPoll.newAlternative}"
            oninput="model.inputs.createPoll.newAlternative=this.value"
        />
        <button>Legg til alternativ</button>
        <p>&nbsp;</p>
        <button onclick="createOrUpdatePoll()" style="font-size: 150%">${buttonText} spørreundersøkelse</button>
    
    `;
}

function createVotesHtml() {
    const counts = {};
    const currentPoll = getCurrentPoll();
    const votesObj = currentPoll !== null ? currentPoll.votes : {};
    const votes = Object.values(votesObj);
    for (let vote of votes) {
        counts[vote] = (counts[vote] || 0) + 1;
    }

    const pageInputs = model.inputs.createPoll;

    let html = '';
    for (let option of pageInputs.options) {
        html += `<li>${option} - ${counts[option] || 0}</li>`;
    }
    return html;
}

function createAlternativesHtml2() {
    const pageInputs = model.inputs.createPoll;
    return pageInputs.options.map(option => `<li><${option}/li>`).join('');
}