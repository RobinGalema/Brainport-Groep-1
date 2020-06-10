

let init = () => {
    console.log('The script works')
    if(document.title == 'Holograms'){
    let width = window.innerHeight + 'px'
    $('#HologramWrap').css('width', width )
    makeScreens(window.innerHeight)
    }

}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("/Client/Hologram/Holograms/holograms.json", function(text){
    var data = JSON.parse(text);
    data.forEach(element => {
        let html = "<div class='btnHolo' dest='"+element.file+"'>"+element.name+"</div>"
        $('#btnHoloWrap').append(html)
    });
    $('.btnHolo').click(function(e){
        let Holo = e.target.getAttribute('dest');
        console.log(Holo)
        $('.defHolo').attr('src', '/Client/Hologram/Holograms/'+Holo)
        // $('#videoTop').load()
        // $('#videoRight').load()
        // $('#videoBottom').load()
        // $('#videoLeft').load()
        
            
            yeet($('.holoVideo').toArray())
        
        
        
    })
});

const yeet = async (array) =>
{
    await loadVideos(array);
    // playVideos(array)
    //play
    array.forEach(element => {
        element.pause()
    });

    array.forEach(element => {
       element.currentTime = 0;
        element.play();
        console.log(`afspelen die handel ${element}`);
    })
    
}

let loadVideos = (array) => {
    array.forEach(element => {

        element.load()
    });
}

// let playVideos = (array) => {
    
// }

let makeScreens = (width) => {
    let screenHeight = (width / 3) + 'px';
    $('.holoScreen').css('height', screenHeight);
    $('.holoScreen').css('width', screenHeight);
    $('.diagonal').css('height', screenHeight);
    $('.diagonal').css('width', screenHeight);
}

window.onload = init();

