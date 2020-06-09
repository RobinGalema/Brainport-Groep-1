

let init = () => {
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

readTextFile("Holograms/holograms.json", function(text){
    var data = JSON.parse(text);
    data.forEach(element => {
        let html = "<div class='btnHolo' dest='"+element.file+"'>"+element.name+"</div>"
        $('#btnHoloWrap').append(html)
    });
    $('.btnHolo').click(function(e){
        let Holo = e.target.getAttribute('dest');
        console.log(Holo)
        $('.holoVideo source').attr('src', 'Holograms/'+Holo)
        $('.holoVideo').toArray().forEach(element => {
            element.load()
        });
    })
});

let makeScreens = (width) => {
    let screenHeight = (width / 3) + 'px';
    $('.holoScreen').css('height', screenHeight);
    $('.holoScreen').css('width', screenHeight);
    $('.diagonal').css('height', screenHeight);
    $('.diagonal').css('width', screenHeight);
}

window.onload = init();

