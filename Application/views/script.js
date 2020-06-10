$('.navBtn').click((e)=>{
    let location = e.target.getAttribute('dest')
    window.location.href = location
})