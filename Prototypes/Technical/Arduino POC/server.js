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
let mode  = 0;


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

    // Function that switches between the 2 availible modes
    socket.on("modeSwitch", () =>
    {
      switch (mode) // Check the current mode
      {
        case 0: // Set the mode to 1
          mode = 1;
          break;

        case 1:
          mode = 0; // Set the mode to 0
          break;
      }
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

    switch (mode) // Check the current mode to know what information to send
    {
      case 0:
        io.emit("rangeUpdate", checkForRange(centimeters));
        break;

      case 1:
        io.emit("rangeUpdate", centimeters);
        break;
    }
  });
});



//  --- Functions ---

/**
 * A function that checks if an object enters or leaves the minimum range of the sensor
 * 
 * @param {Number} centimeters The amount of centimeters the nearest object is to the sensor, given by the Arduino sensor in the proximity.on function
 * @param {Number} range The range at which an object is considered in range (default = 30cm)
 * 
 * @returns {boolean} True if there something entered or left the range, False if nothing has changed
 */
const checkForRangeUpdate = (centimeters, range = 30) =>
{
  if (centimeters <= range && !isSomebodyInRange)
  {
      console.log("");
      console.log("|--> Something came in range of the sensor");
      isSomebodyInRange = true;
      return true;
  }
  else if (centimeters > range && isSomebodyInRange)
  {
      console.log("     |---> Something left the range of the sensor");
      console.log("");
      isSomebodyInRange = false;
      return true;
  }
  return false;
}

/**
 * A function that can constantly check if an object is in range. (if you want to check when an object leaves or enters the range, use checkForRangeUpdate() instead)
 * 
 * @param {Number} centimeters The amount of centimeters the nearest object is to the sensor, given by the Arduino sensor in the proximity.on function
 * @param {Number} range The range at which an object is considered in range (default = 30cm)
 * 
 * @returns {boolean} True if there is an object in range, false if there is no object in range
 */
const checkForRange = (centimeters, range = 30) =>
{
  if (centimeters <= range)
  {
    return true;
  }
  else
  {
    return false;
  }
}