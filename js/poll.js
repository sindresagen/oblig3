function updateViewPoll() {
    let html = '';
    for (let i = 0; i < model.polls.length; i++) {
    html = `
    <h3>Alle poller</h3>
    <h4 onclick="viewCurrentPoll(${i})">${model.polls[i].question}</h4>
    `;
    }
    document.getElementById('app').innerHTML = html;
}

function createTdOptions(index) {
    for (let i = 0; i < model.polls[index].options.length; i++) {
        model.options.upperRowOptions = `<th>Svaralternativ ${i + 1}</th>`;
        model.options.lowerRowOptions = `<td>${model.polls[index].options[i]}</td>`;
    }
}

function viewCurrentPoll (index) {
    createTdOptions();
    let html = '';
    html = `
    <table>
        <tr>
            <th>Er avstemningen åpen?</th>
            <th>Spørsmål</th>
            <th>Svaralternativer</th>
            ${model.options.upperRowOptions}
        </tr>
        <tr>
            <td>${model.polls[index].isOpen}</td>
            <td>${model.polls[index].question}</td>
            ${model.options.lowerRowOptions}
        </tr>
    </table>
    `;
    document.getElementById('app').innerHTML = html;

}
