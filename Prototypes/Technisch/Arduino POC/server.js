// Express and Socket.io
const express = require('express');
const app = express();
var http = require('http').createServer(app);
const io = require("socket.io")(http);
var publicDir = require('path').join(__dirname,'/public');

// Johnny Five
const { Board, Proximity } = require("johnny-five");
const board = new Board();

// Global variables
let isSomebodyInRange = false;


//  --- Page Loading ---

// Set the page to index.html
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

app.use(express.static(publicDir));

http.listen(3000, function(){
    console.log('listening on *:3000');
  });


//  --- Socket IO ---

// Function for when a user loads the webpage connected to this server
io.on('connection', (socket) => 
{
    console.log('a user connected');
    console.log(board);

    // Function for when the user requests information about the connected board
    socket.on("boardQuery", () =>
    {
        console.log("--> Client board query");
        let connectedBoard = board;
        console.log("   --> Sending board info to client");
        io.emit('boardInfo', connectedBoard.isReady);
    })
});


//  --- Arduino board functions (Johnny Five) ---

// Function for when the Arduino board is loaded and ready to use
board.on("ready", () => {
  const proximity = new Proximity({
    controller: "HCSR04", // Type of the connected sensor
    pin: 7 // To which pin the sensor is connected
  });

  // Code that runs when the value returned by the proximity sensor changes
  proximity.on("change", () => {
    const {centimeters, inches} = proximity;
    checkForRange(centimeters);
  });
});



//  --- Functions ---

/**
 * A function that checks if there is an object in range of the sensor
 * 
 * @param {Number} centimeters The amount of centimeters the nearest object is to the sensor, given by the Arduino sensor in the proximity.on function
 * @param {Number} range The range at which an object is considered in range
 */
const checkForRange = (centimeters, range = 30) =>
{
  if (centimeters <= range && !isSomebodyInRange)
  {
      console.log("|--> Something came in range of the sensor");
      isSomebodyInRange = true;
  }
  else if (centimeters > range && isSomebodyInRange)
  {
    console.log("     |---> Something left the range of the sensor");
    isSomebodyInRange = false;
  }
}