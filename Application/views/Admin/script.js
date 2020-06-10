$('#buttonLogIn').click(()=>{
    window.location.href='AdminDash'
})

$('.navBtn').click((e)=>{
    window.location.href= e.target.getAttribute('dest')
})