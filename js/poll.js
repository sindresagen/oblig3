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
        model.options.upperRowOptions += `<th>Svaralternativ ${i + 1}</th>`;
        model.options.lowerRowOptions += `<td>${model.polls[index].options[i]}</td>`;
    }
}

function viewCurrentPoll(index) {
    createTdOptions(index);
    let html = '';
    html = `
    <table>
        <tr>
            <th>Er avstemningen åpen?</th>
            <th>Spørsmål</th>
            ${model.options.upperRowOptions}
            <th>Rediger</th>
        </tr>
        
        <tr>
            <td>${model.polls[index].isOpen}</td>
            <td>${model.polls[index].question}</td>
            ${model.options.lowerRowOptions}
            <td><button onclick="changeCurrentPoll(${index})">Rediger</button</td>
        </tr>
    </table>
    `;
    document.getElementById('app').innerHTML = html;

}

function createTdOptionsInputs(index) {
    for (let i = 0; i < model.polls[index].options.length; i++) {
        model.options.upperRowOptions += `<th>Svaralternativ ${i + 1}</th>`;
        model.options.lowerRowOptions += `<td><input oninput="model.newEditedValues.options[${i}] = this.value" value="${model.polls[index].options[i]}"></input></td>`;
    }
}

function changeCurrentPoll(index) {
    model.options.upperRowOptions = '';
    model.options.lowerRowOptions = '';
    createTdOptionsInputs(index);
    model.temporary.isOpen = model.polls[index].isOpen;
    model.temporary.question = model.polls[index].question;
    for (let i = 0; i < model.polls[index].options.length; i++) {
        model.temporary.options[i] = model.polls[index].options[i];
    }
    document.getElementById('app').innerHTML = `
        <table>
            <tr>
                <th>Er avstemningen åpen?</th>
                <th>Spørsmål</th>
                ${model.options.upperRowOptions}
                <th>Rediger</th>
            </tr>
            
            <tr>
                <td><input oninput="model.newEditedValues.isOpen = this.value" value="${model.polls[index].isOpen}"></input></td>
                <td><input oninput="model.newEditedValues.question = this.value" value="${model.polls[index].question}"></input></td>
                ${model.options.lowerRowOptions}
                <td><button onclick="changeCurrentPoll(${index})">Rediger</button</td>
                <td><button onclick="saveChanges(${index})">Lagre</button></td>
            </tr>
        </table>
    `;
}

function saveChanges(index) {
    for (let i = 0; i < model.polls[index].options.length; i++) {
        model.polls[index].options[i] = model.temporary.options[i];
        if (model.newEditedValues.options[i] != '') {
            model.polls[index].options[i] = model.newEditedValues.options[i];
        }
    }



    if (model.newEditedValues.isOpen == '') {
        model.polls[index].isOpen = model.temporary.isOpen;
    } else if (model.newEditedValues.isOpen == 'true' || model.newEditedValues.isOpen == 'false') {
        model.polls[index].isOpen = model.newEditedValues.isOpen;
    }

    if (model.newEditedValues.question == '') {
        model.polls[index].question = model.temporary.question;
    } else if (model.newEditedValues.question != '') {
        model.polls[index].question = model.newEditedValues.question;
    }
    model.options.upperRowOptions = '';
    model.options.lowerRowOptions = '';
    viewCurrentPoll(index);
}