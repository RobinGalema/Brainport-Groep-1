

  
window.onload = () =>{
    videoLoader().loadPage()  
}

  socket.on('ReloadDash', ()=>{
    videoLoader().reloadPage();
  })


  $('.SubmitButton').click((e)=>{
    videoLoader().updateVideoDB(e);
  })

  socket.on('certainVideo', (data)=>{
      $('iframe').attr('src', 'https://www.youtube.com/embed/'+data)
  })