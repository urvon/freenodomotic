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
    default:
        res.json(null);
    }

    rest.get(url, function (error, data) {     
        if (data == null) {
            var file = require('../public/json/' + req.param('name') + '.json');
            var data = file;
            data.isDemo = true;
            res.json(file);
        }
        else
            res.json(data);
    });
};