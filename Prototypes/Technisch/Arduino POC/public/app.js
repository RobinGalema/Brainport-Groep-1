var socket = io();

const checkForBoards = () =>
{
    socket.emit('boardQuery');
}

socket.on('boardInfo', (boardInfo) =>
{
    console.log(boardInfo);
    if (boardInfo.isConnected)
    {
        console.log(`The Board is connected`);
        if (boardInfo.isReady)
        {
            console.log(`   --> The board is ready for usage`);
        }
        else
        {
            console.error('   --> The board is not ready for usage');
        }
    }
    else
    {
        console.error("There is no board connected");
    }
})