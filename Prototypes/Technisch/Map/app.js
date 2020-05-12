let jsonData;
let markers = [];
/**
 * loads json, executes function, dabs on haters
 * @param {string} path path to json file
 * @param {function} callback DIT IS EEN CALLBACK
 */
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
  fetchJSONFile("data.json", function (data) {
    jsonData = data;
    console.log(data);
    MakeMap();
    CreateMarkers();
  });
};

/**
 * executes when api is loaded
 */
var initMap = () => {
  console.log("maps API loaded.");
};

/**
 * creates map and marker
 */
const MakeMap = () => {
  var uluru = {
    lat: jsonData.companies[0].marker.lat,
    lng: jsonData.companies[0].marker.long,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: uluru,
    zoom: 12,
  });
};

/**
 * creates makers and pushes them to markers array
 */
const CreateMarkers = () => {
  jsonData.companies.forEach((element) => {
    var uluru = {
      lat: element.marker.lat,
      lng: element.marker.long,
    };
    let marker = new google.maps.Marker({ position: uluru, map: map });
    markers.push(marker);
    var infoWindow = new google.maps.InfoWindow({
      content:"Adres: " + element.adress
    });
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  });
};


const CloseMenu = () =>{
 const menu = document.getElementById("menu");
 menu.style.display = 'none';
}

const OpenMenu = () =>{
  const menu = document.getElementById("menu");
  menu.style.display = 'flex';
 }