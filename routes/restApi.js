exports.name = function(req, res){
    var rest = require('restless');
    var config = require('../config/config');    
    var url = "";

    switch(req.param('name')) {
        case "objects":
            url = config.urlObject;
            break;
        case "environments":
            url = config.urlEnvironment;
            break;
        case "plugins":
            url = config.urlPlugin;
            break;
        case "commands":
            url = config.urlCommandUser;
            break;
        case "triggers":
            url = config.urlTrigger;
            break;
        default:
            res.json(null);
    }

    if (req.param('suffixe') != null)
        url += req.param('suffixe');
    if (req.param('json') == true)
        url += config.jsonSuffix;

    if (config.enabledSecurity) {
        var login = { username: config.user, password: config.password };
        rest.get(url, login, restResult);
    }
    else {
        rest.get(url, restResult);
    }


    function restResult(error, data, status) {
            if (error == 401) {
                console.log("erreur 401: Le serveur freedomotic a besoin d'une authentification")
            }
            if (data == null) {
                var obj = req.param('name');

                if (req.param('suffixe') != null)
                    obj = "objectDetail";

                //convert xml to json
                if (!req.param('json')) {
                    var fs = require('fs'),
                    xml2js = require('xml2js'),
                    path = require('path');

                    var parser = new xml2js.Parser();
                    fs.readFile(path.join(__dirname , '../public/data/' + obj + '.xml'), function (err, data) {
                        parser.parseString(data, function (err, result) {
                            var data = result;
                            data.isDemo = true;
                            res.json(data);
                        });
                    });
                }
                else {
                    var file = require('../public/data/' + obj + '.json');
                    var data = file;
                    data.isDemo = true;
                    res.json(data);
                }

            }
            else
                res.json(data);
    };
};

exports.convert = function (req, res) {
    var xmlConverter = require('../messageBuilder');
    return xml.convert(req.param('data'));
};