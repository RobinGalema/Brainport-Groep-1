const socket = io('http://localhost:8000');

const init = () => {
    if(document.title == 'Holograms'){
    let width = window.innerHeight + 'px'
    $('#HologramWrap').css('width', width )
    makeScreens(window.innerHeight)

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

    }
    else if(document.title=='Holo Dashboard'){
    

    readTextFile('../Client/Hologram/Holograms/holograms.json', function(text){
        var data = JSON.parse(text);
        data.forEach(element => {
            let html = '<option value='+element.file+'>'+element.name+'</option'
            $('#deleteSelection').append(html)
        });
    })
    
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


$('#btnDelete').click(()=>{
    let deleteItem = $('#deleteSelection option:selected').val()
    DeleteEntry(deleteItem);
}
)


let makeScreens = (width) => {
    let screenHeight = (width / 3) + 'px';
    $('.holoScreen').css('height', screenHeight);
    $('.holoScreen').css('width', screenHeight);
    $('.diagonal').css('height', screenHeight);
    $('.diagonal').css('width', screenHeight);
}

const DeleteEntry = (fileName) =>
{
    readTextFile("../../Client/Hologram/Holograms/holograms.json", function(text)
    {
        let data = JSON.parse(text);
        let i = 0;
        data.forEach(video => {
            if (video.file == fileName)
            {
                // Delete the file from the local array and prepare the data to be sent to the server
                console.log(`deleting ${video.name}`);
                data.splice(i, 1)
                let json = JSON.stringify(data);

                // Delete the JSON entry and the file from the server
                socket.emit("deleteEntry", json);
                socket.emit("deleteVideo", video.file)
                return;
            }
            i++;
        });
    })
}

window.onload = init();
