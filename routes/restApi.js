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
            url = config.urlCommand;
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

    rest.get(url, function (error, data) {
        if (data == null) {
            var obj = req.param('name');
            if (req.param('suffixe') != null)
                obj = "objectDetail";

            var file = require('../public/json/' + obj + '.json');
            var data = file;
            data.isDemo = true;
            res.json(file);
        }
        else
            res.json(data);
    });
};