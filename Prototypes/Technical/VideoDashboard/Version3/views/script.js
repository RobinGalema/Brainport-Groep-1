

  const socket = io('http://localhost:8000');
window.onload = () =>{
    socket.emit('loadVideos')
    
}
 
  
  socket.on('VideoArray', async (data) => {
    let videoArray = data;
    checkScreen();
    for (let i = 0; i < videoArray.length; i++) {
        const element = videoArray[i];
        $('#'+element.name).attr('src', 'https://www.youtube.com/embed/'+element.link);
    }
  })


  $('.SubmitButton').click((e)=>{
    let dbArray = [];
    let screen = e.target.getAttribute('dest')
    dbArray.push('video'+screen)
    let url = $('#link'+screen).val();
    $('#link'+screen).val('');
    let videoID = url.split('=')[1];
    dbArray.push(videoID)
    socket.emit('newVideo', dbArray );
    dbArray = [];
  })

  socket.on('ReloadDash', ()=>{
    location.reload(true);
  })

  let checkScreen = () => {
      if(document.title == 'video1'){
          socket.emit('getScreenVideo', document.title);
      }
      else if(document.title == 'video2'){
        socket.emit('getScreenVideo', document.title);
      }
      else if(document.title == 'video3'){
        socket.emit('getScreenVideo', document.title);
      }
      else if(document.title == 'video4'){
        socket.emit('getScreenVideo', document.title);
      }
  }

  socket.on('certainVideo', (data)=>{
      $('.fullVideo').attr('src', 'https://www.youtube.com/embed/'+data)
  })