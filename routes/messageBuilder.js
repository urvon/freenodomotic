exports.buildMessage = function (req, res) {
    var xml2js = require('xml2js');

    var builder = new xml2js.Builder({ rootName: 'toto' });
    var obj = { name: "Super", Surname: "Man", age: 23 };

    var xml = builder.buildObject(obj);
};