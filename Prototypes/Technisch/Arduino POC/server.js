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
    console.log(board);

    socket.on("boardQuery", () =>
    {
        console.log("--> Client board query");
        let connectedBoard = board;
        console.log("   --> Sending board info to client");
        io.emit('boardInfo', connectedBoard.isReady);
    })
});

/*
board.on("ready", () => {
  const proximity = new Proximity({
    controller: "HCSR04",
    pin: 7
  });

  proximity.on("change", () => {
    const {centimeters, inches} = proximity;
    console.log("Proximity: ");
    console.log("  cm  : ", centimeters);
    console.log("  in  : ", inches);
    console.log("-----------------");
  });
});
*/