const express = require('express');
const app = express();
const server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is live!");

const socket = require('socket.io');
const io = socket(server);

io.sockets.on('connection', newConnection)

function newConnection(socket){
    console.log(`new connection: ${socket.id}`);

    socket.on('commando', nummer => {

        console.log(`socket1 ontvangt iets en verstuurt ${nummer}`);

        //stuur data naar index.html
        io.emit("commando", nummer);
    })
}

