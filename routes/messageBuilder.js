var xml2js = require('xml2js');

exports.buildMessage = function (event, payloads) {
    var builder = new xml2js.Builder(
        {
            rootName: 'com.freedomotic.events.' + event,
            headless: true
        });

    var obj = createEvent(event,payloads);
    var xml = builder.buildObject(obj);

    return xml;
};

//converti une données au format xml ou json
exports.convert = function (data) {
    var builder = new xml2js.Builder(
        {
            headless: true
        });

    var xml = builder.buildObject(data);

    return xml;
}

function createEvent(event, payloads) {
    var event = {
        eventName: event,
        sender: 'FreenodomoticFronted',
        payload: createPayloads(payloads)
    };
    return event
}

function createPayloads(payloads) {
    var statement = {
    }
    var tab = [];
    var tab2 = [];

    for (var i in payloads) {
        tab.push(createStatement(payloads[i].attr, payloads[i].value))
    }
    var statement = {
        'com.freedomotic.reactions.Statement': tab 
    }
    tab2.push(statement);
    return { payload: tab2 };
}

function createStatement(attr, value) {
    var statement = {
        logical: 'AND',
        attribute: attr,
        operand:'EQUALS',
        value: value
    }
    return statement;
}

