
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),   
  xml2js = require('xml2js'),
  config = require('./config/config'),
  restApi = require('./routes/restApi'),
  dispatcher = require('./routes/messageDispatcher');

var app = module.exports = express();

/**
* Configuration
*/

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
   app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
  // TODO
}; 

// Routes
app.get('/', routes.index);
app.get('/partial/:name', routes.partial);

// JSON API
app.get('/api/name', api.name);
app.post('/restApi/:name', restApi.name);
app.post('/restApi/convert', restApi.convert);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
* Start Server
*/
var port = '3333'
var server = http.createServer(app).listen(port, function () {
  console.log('Express server listening on port ' + port);
});


/**
* Create websocket
*/
dispatcher.init(server);

