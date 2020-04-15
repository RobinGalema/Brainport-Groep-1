// Express and Socket.io
const express = require('express');
const app = express();
var http = require('http').createServer(app);
const io = require("socket.io")(http);
var publicDir = require('path').join(__dirname,'/public');

// Johnny Five
const { Board, Proximity } = require("johnny-five");
const board = new Board();


// Set the page to index.html
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

app.use(express.static(publicDir));

http.listen(3000, function(){
    console.log('listening on *:3000');
  });

io.on('connection', (socket) => 
{
    console.log('a user connected');

    socket.on("boardQuery", () =>
    {
        console.log("--> Client board query");
        let connectedBoard = board;
        console.log("   --> Sending board info to client");
        io.emit('boardInfo', connectedBoard);
    })
})