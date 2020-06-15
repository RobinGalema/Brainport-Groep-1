const fetchJSONFile = (path, callback) => {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
         }
    };
    httpRequest.open("GET", path);
    httpRequest.send();
};

window.onload = () => {
    fetchJSONFile("Client/Video/JSON/videos.json", function(data){
        videoControl.Setup(data);
    })
    
}











// Even samengevat mijn aanwijzingen en tips voor je video platform:


// Schrijf je code als module pattern:
// const VideoOverlays = (()=>{})()

// Splits je code zodat het ophalen van je JSON buiten de module gebeurt en de module een overlay rendered op basis van de JSON die hoort bij 1 video.
// const renderOverlay = (options) {
// }

 

// Kleine code-tips:
// In plaats van setAttribute en getAttribute om data aan een element toe te voegen kan je beter dataset gebruiken dus:
// options.dataset.dest = video.reference

// Gebruik duidelijke benamingen in je json:
// In options, voeg een “type” property toe zodat je in je code een if-else kan doen op basis van het soort optie (video-link, QR code, iets anders)
// {
// “type”: “video-link”,
// “text”: “Rewatch the video”,
// “filename” : “Work at Brainport.mp4”
// }



// Ik zie in je code dat als je eenmaal een optie hebt aangeklikt er wel een nieuwe video gaat spelen, maar deze video zal dan geen overlays meer hebben. Eigenlijk moet je module zichzelf weer aanroepen op de nieuwe video. Je krijgt dan zoiets als:
// sections[i].addEventListener("click", (event) => {
//                 videoName = event.target.getAttribute("dest");
//                 vid.src = videoName + ".mp4";

// renderOverlay(optionsForThisVideo)
//             })

// De moeilijkheid is dan de nieuwe opties uit de JSON halen, je kan het filteren op naam:
// data.find(i => {  return i.name === “Brainport at Work”  })


 
// Uitbreidingen:
// Linken aan het eerdere werk van Daan om 4 schermen aan te sturen.
// QR code generator gebruiken; of lig plaatjes tonen bij de QR code
// Extra opties toevoegen zoals: wanneer opties (aan het eind, op timecode etc.)