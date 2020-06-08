//create your socket connection in the library.
const socket = io('http://localhost:8000');
//element.link is the part after the = on a youtube video link. This should be a field in the database. 
//element.iframeID is the id of the iframe that the video should be loaded into. This should also be a field in the database.
//All functions for getting videos out of the database
function videoLoader(){
    const self = {
        //loadPage goes to the server to get videos from the database. They get send back through socket and you can find the data handlers in this library at socket.on('VideoArray')
        loadPage : () => {
            socket.emit('loadVideos')
        },
        //Doing a reload of the page with cache refresh, so the new video will be displayed.
        reloadPage : () => {
            location.reload(true);
        },
        //Adding new video to Database through socket with the data of which video it is (Dest is a number), url gets split at youtube video id, so we can eventually make an embed.
        updateVideoDB : (event) => {
            let dbArray = [];
            let screen = event.target.getAttribute('dest')
            dbArray.push('video'+screen)
            let url = $('#link'+screen).val();
            dbArray.push(url.split('=')[1])
            socket.emit('newVideo', dbArray );
            dbArray = [];
            $('#link'+screen).val('');
        }
    }

    return self;
}

//When we get the data of all videos we execute 2 functions
socket.on('VideoArray', async (data) => {
    initVideos(data);
    checkScreen(document.title);
})

//Loading the videodashboard if the videodashboard is opened.
let initVideos = (videoArray) => {
    for (let i = 0; i < videoArray.length; i++) {
        const element = videoArray[i];
        $('#'+element.iframeID).attr('src', 'https://www.youtube.com/embed/'+element.link);
    }
}

//Loading the video for the screen thats opened
let checkScreen = (documentTitle) => {
    if(documentTitle == 'video1' || documentTitle == 'video2' || documentTitle == 'video3' || documentTitle == 'video4'){
        socket.emit('getScreenVideo', documentTitle);
    }
}
