
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  Stomp = require('stompjs'),
  io = require('socket.io'),
  xml2js = require('xml2js'),
  config = require('./config/config'),
  restApi = require('./routes/restApi');

var app = module.exports = express();

// Use raw TCP sockets
//var stompClient = Stomp.overTCP('CELAD-P070', 61666);
//stompClient.connect('admin', 'admin', function(frame) {
//    console.log('connected to Stomp');
//    stompClient.subscribe('/queue/app.actuators.protocol.arduinousb.in', function(message) {
//        console.log("received message " + message);
//    });
  
//  console.log ('sending a message');
//  stompClient.send('/topic/VirtualTopic.app.event.sensor.object.behavior.clicked/', {}, 'Hello, node.js!');
//});
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

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
* Start Server
*/
var port = '3333'
var server = http.createServer(app).listen(port, function () {
  console.log('Express server listening on port ' + port);
});

//var Stomp = require('stomp-client');
//var destination = '/topic/VirtualTopic.app.event.sensor.object.behavior.clicked';
//var client = new Stomp('127.0.0.1', 61666, '', '');

//client.connect(function (sessionId) {
//    client.subscribe(destination, function (body, headers) {
//        console.log('This is the body of a message on the subscribed queue:', body);
//    });

//    client.publish(destination, 'Oh herrow', { transformation: 'jms-object-xml' });
//});


/**
* Create websocket
*/
var websocket = io.listen(server);
websocket.sockets.on('connection', function (socketio) {
    /*connect freedomotic stomp client*/
    var stompClient = Stomp.overTCP('CELAD-P070', 61666);
    stompClient.debug = true;
    stompClient.connect('', '', function(frame) {
        console.log('connected to Stomp');
        
        /*freedomotic event received*/
        stompClient.subscribe('/queue/app.actuators.protocol.arduinousb.in', function(message,tt,rr) {
            
            /*send message to view*/
            socketio.emit('event',{ news: 'item' });
        });  
    });

    /*web socket event received*/
    socketio.on('cmd', function (data) {
        console.log ('sending a stomp message at ' + data.target);
        console.log('message : ' + data.message);
        stompClient.send(data.target, {transformation: 'jms-object-xml' }, data.message);

    });
});

