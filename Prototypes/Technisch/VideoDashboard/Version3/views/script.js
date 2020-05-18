

  const socket = io('http://localhost:8000');
window.onload = () =>{
    socket.emit('loadVideos')
}
 
  
  socket.on('VideoArray', (data) => {
    let videoArray = data;
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