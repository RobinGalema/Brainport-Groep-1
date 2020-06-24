

//Makes new object
let videolod = new videoLoader2;  
//Function done on load
window.onload = () =>{  
    console.log(videolod.loadMessage)
    videolod.loadpage()
}
//Function to reload page and delete cache
socket.on('ReloadDash', ()=>{
  videolod.reloadPage();
})

//What happens on submitbutton click
$('.SubmitButton').click((e)=>{
  videolod.updateVideoDB(e)
})

//Function for certain video screen
socket.on('certainVideo', (data)=>{
    $('iframe').attr('src', 'https://www.youtube.com/embed/'+data)
})