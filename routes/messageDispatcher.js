var io = require('socket.io'),
Stomp = require('stompjs'),
msgBuilder = require('./messageBuilder.js');

var websocket;
//var stompClient = Stomp.overTCP('CELAD-P070', 61666);;

exports.init = function (server) {
    /**
    * Create websocket
    */
    websocket = io.listen(server);

    websocket.sockets.on('connection', function (socketio) {
        /*connect freedomotic stomp client*/
        stompClient = Stomp.overTCP('CELAD-P070', 61666);
        stompClient.debug = true;
        stompClient.connect('', '', function (frame) {
            console.log('connected to Stomp');

            /*freedomotic event received*/
            stompClient.subscribe('/queue/app.actuators.nlautomationseditor.nlautomationseditor.in', function (message, tt, rr) {
                //app.actuators.protocol.arduinousb.in
                /*send message to view*/
                socketio.emit('event', { news: 'item' });
            });
        });

        /*web socket event received*/
        socketio.on('cmd', function (data) {
            var msg = msgBuilder.buildMessage(data.event, data.payload);
            sendStomp(stompClient,data.target, msg);
        });
    });
}

function sendStomp(stompClient, target, message) {
    console.log('sending a stomp message at ' + target);
    console.log('message : ' + message);
    stompClient.send(target, { transformation: 'jms-object-xml' }, message);
}

