

$('#button').click(function(){
    setTimeout(1500, reloadPage());
  
    
})

function reloadPage(){
    location.reload(true);
    window.location.href='index.ejs'
}