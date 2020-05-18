let jsonData;
let markers = [];
let displayedCompanies = [];

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
    loadData();
    filterMarkers(["healthcare"]);
    addMarkersWithFilter();
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

const loadData = () => 
{
  jsonData.companies.forEach(element => {
    let company = {};
    company = element;
    displayedCompanies.push(company);
  });

  console.log(displayedCompanies);
}

/**
 * A function that filters all the companies in the dataset by labelnames
 * 
 * @param {[String]} filters An array of tags to filter the companies by, these tags should match the tags under the "labels" value in the data file
 * @returns {[Object]} An array with all the companies that match the input filters
 * 
 * @example filterMarkers(["software","app-development"]);
 */
const filterMarkers = (filters = []) =>
{
  // Check if there is input for a filter
  if (filters.length != 0)
  {
    // Clear the array of displayed companies to later fill it again with the new filters applied
    displayedCompanies = [];

    jsonData.companies.forEach((company) => // Loop through all companies that are stored
    {
      let willBeDisplayed = true;

      filters.forEach(filter => // Loop through all given filters
      {
        // Check if one of the labels of the companies is the same as the given filter
        if (company.labels.includes(filter))
        {
          console.log(`The company ${company.name} has the label ${filter}`);
        }
        else
        {
          console.log(`The company ${company.name} does not match all the filters`)
          willBeDisplayed = false; // The filter is not in the company's tags so the company won't be displayed
          return;
        }
      });

      console.log(`The company ${company.name} will be displayed? ===> ${willBeDisplayed}`)
      console.log("-------------------------------------------");
     
      // Check if the company should be displayed on the map based on the filters
      if (willBeDisplayed)
      {
        displayedCompanies.push(company); // Add the company to the list of displayed companies
      }

    })
  }
  else
  {
    console.log("There are no filters being applied");
  }

  console.log(`The new company list:`);
  console.log(displayedCompanies);
  return displayedCompanies; // Return the list the new list of companies to display
}

/**
 * Removes all current markers on the map and clears the array storing the markers
 */
const removeMarkers = () =>
{
  markers.forEach(marker => {
    marker.setMap(null);
  });

  markers = [];
}

/**
 * Uses a list of companies to display each company's location on the map
 */
const addMarkersWithFilter = () =>
{
  removeMarkers();

  displayedCompanies.forEach((element) => {
    var uluru = {
      lat: element.marker.lat,
      lng: element.marker.long,
    };
    let marker = new google.maps.Marker({ position: uluru, map: map });
    markers.push(marker);
    var infoWindow = new google.maps.InfoWindow({
      content:`Company: ${element.name}`
    });
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  });
}


const CloseMenu = () =>{
 const menu = document.getElementById("menu");
 menu.style.display = 'none';
}

const OpenMenu = () =>{
  const menu = document.getElementById("menu");
  menu.style.display = 'flex';
 }