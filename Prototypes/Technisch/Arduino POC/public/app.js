var socket = io();

const checkForBoards = () =>
{
    socket.emit('boardQuery');
}

socket.on('boardInfo', (boardInfo) =>
{
    console.log(`--> Is the board connected and ready? ${boardInfo}`);
})