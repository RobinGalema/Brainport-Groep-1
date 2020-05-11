var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is live!");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection)

function newConnection(socket){
    console.log(`new connection: ${socket.id}`);

    socket.on('commando', function(nummer) {

        console.log("socket1 ontvangt iets en verstuurt " + nummer);

        //stuur data naar tablet.html
        io.emit("commando", nummer);
    })
}