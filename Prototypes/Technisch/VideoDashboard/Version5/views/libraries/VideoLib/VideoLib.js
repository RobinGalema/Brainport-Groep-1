//create your socket connection in the library.
const socket = io('http://localhost:8000');
//element.link is the part after the = on a youtube video link. This should be a field in the database. 
//element.iframeID is the id of the iframe that the video should be loaded into. This should also be a field in the database.
//All functions for getting videos out of the database
var videoLoader2 = (function(){

    let _privateLoadMessage = 'Videos loaded'
    let _privateReloadMessage = 'Page has been reloaded'
    let _privateUpdatedMessage = 'Database has been updated'
    
    /**
     * This functions loads the videos on the page
     */
    function loadpage(){
        socket.emit('loadVideos')
        console.log(_privateLoadMessage)
    }
    /**
     * This function reloads the full page and deletes the cache after a new video has been uploaded
     */
    function reloadPage(){
        location.reload(true);
        console.log(_privateReloadMessage)
    }

   
    /**
     * This function uploads a new video to the database
     * @param {event} event - The click event done
     */
    function updateVideoDB(event){
        let dbArray = [];
        let screen = event.target.getAttribute('dest')
        dbArray.push('video'+screen)
        let url = $('#link'+screen).val();
        dbArray.push(splitURL(url));
        socket.emit('newVideo', dbArray );
        dbArray = [];
        $('#link'+screen).val('');
        console.log(_privateUpdatedMessage);
    }

    /**
     * This function splits a normal youtube url to only the youtube video id
     * @param {string} url - The url filled in in the input field 
     */
    function splitURL(url){
        let newURL = url.split('=')[1];
        return newURL;
    }

    /**
     * This function starts two functions when video's are received
     */
    socket.on('VideoArray', async (data) => {
        initVideos(data);
        checkScreen(document.title);  
    })

    /**
     * This function initializes the videos on display on the admin screen
     * @param {Array} videoArray - Array of data received from the database
     */
    let initVideos = (videoArray) => {
        for (let i = 0; i < videoArray.length; i++) {
            const element = videoArray[i];
            $('#'+element.iframeID).attr('src', 'https://www.youtube.com/embed/'+element.link);
        }
    }

    /**
     * This function checks if a client side screen is displayed, and shows the correct video on it.
     * @param {String} documentTitle - Title of current page
     */
    let checkScreen = (documentTitle) => {
        if(documentTitle == 'video1' || documentTitle == 'video2' || documentTitle == 'video3' || documentTitle == 'video4'){
             socket.emit('getScreenVideo', documentTitle);
         }
    }

    return{
        loadpage: loadpage,
        reloadPage: reloadPage,
        updateVideoDB: updateVideoDB
    }
})





