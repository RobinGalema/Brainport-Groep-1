// Global Variables
var socket = io();
let inRange = false;
let mainText = document.getElementById("mainText");
let subText = document.getElementById("subText");
let mode = 0

//  --- Socket IO ---
socket.on('boardInfo', (boardInfo) =>
{
    console.log(`--> Is the board connected and ready? ${boardInfo}`);
})

socket.on('rangeUpdate', (objectInRange) =>
{
    switch (mode) // Check the current mode
    {
        case 0:
            if (objectInRange != inRange)
            {
                inRange = objectInRange;
                setDisplayMode();
            }
            break;

        case 1:
            checkRange(objectInRange);
    }

});

// --- Functions ---

/**
 * A function that sends a request to the server to get information about the connected Arduino board
 */
const checkForBoards = () =>
{
    socket.emit('boardQuery');
}

/**
 * A function that switches out content on the webpage based on if an object is in range of the sensor
 */
const setDisplayMode = () =>
{
    switch (inRange) // Check if there is an object in range
    {
        case true:
            // Set the DOM elements for when an object is in range
        document.body.style.background = "white";
        document.body.style.color = "black";
        mainText.innerHTML = `Hey! Something is in range of the sensor, yay!`;
        subText.innerHTML = `Try leaving the range of the sensor and see what happens`;
        break;

        case false:
            // Set the DOM elements for when there is no object in range
        document.body.style.background = "rgb(14, 13, 16)";
        document.body.style.color = "white";
        mainText.innerHTML = `There is nobody here :(`;
        subText.innerHTML = `Come closer to the sensor to activate it!`
        break;
    }
}

/**
 * A function that sets the alpha of the background color
 * 
 * @param {Number} alpha The alpha value of the background color to set
 */
const setBackgroundAlpha = (alpha) =>
[
    document.body.style.background = `rgba(239,198,76,${alpha/100})`
]

/**
 * A function that toggles between the 2 modes of rangedetection
 */
const switchMode = () =>
{
    switch (mode) // Check the current mode
    {
        case 0: // Set the mode to 1
            document.body.style.background = "rgba(239,198,76,0)"
            document.body.style.color = "black";

            mainText.innerHTML = `Sensor watching range`;
            subText.innerHTML = `Try moving an object in front of the sensor`
            
            mode = 1;
            break;
        
        case 1: // Set the mode to 0
            inRange = false;
            setDisplayMode();
            
            mode = 0;
            break;
    }

    socket.emit("modeSwitch");
}

/**
 * A function that checks the range an object is from the sensor from the moment it comes into a minimum set range
 * @param {Number} distance The distance the object is from the sensor, given by the Arduino sensor from the server
 * @param {Number} startingRange The range that is the starting point of the check, all objects closer than this value will be checked
 * 
 */
const checkRange = (distance, startingRange = 30) =>
{
    let finalPercentage;
    if (distance <= startingRange)
    {
        let subResult = (distance / startingRange)
        let percentage = subResult * 100;
        finalPercentage = 100 - percentage;
        console.log(finalPercentage);
    }
    else
    {
        finalPercentage = 0;
    }

    setBackgroundAlpha(finalPercentage);
}