// Global Variables
var socket = io();


//  --- Socket IO ---
socket.on('boardInfo', (boardInfo) =>
{
    console.log(`--> Is the board connected and ready? ${boardInfo}`);
})


// --- Functions ---

/**
 * A function that sends a request to the server to get information about the connected Arduino board
 */
const checkForBoards = () =>
{
    socket.emit('boardQuery');
}

