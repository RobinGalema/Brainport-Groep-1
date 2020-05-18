let jsonData;
let markers = [];
let displayedCompanies = [];
let checkboxes;
let currentFilters = [];
let searchBox;

// ---- File and window loading ----

/**
 * Loads a json file and then performs a callback function when the data is loaded
 * @param {string} path Path to the json file
 * @param {function} callback Function that runs when the data is done loading
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

// W.I.P => window.onload needs some changes when all functions are done
window.onload = () => {
  fetchJSONFile("data.json", function (data) {
    jsonData = data;
    
    // debug
    console.log(data);

    // Map loading and creating of markers
    MakeMap();
    CreateAllMarkers();
    loadData();
    //filterMarkers();
    //addMarkersWithFilter();
  });

    // Setting up DOM elements
    SetupCheckboxes();
    SetupSearchBox("searchBox");
};


// ---- Functions ----

/**
 * executes when api is loaded
 */
const initMap = () => {
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
const CreateAllMarkers = () => {
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

/**
 * Pushes all the companies from the JSON file into an array
 */
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

    addMarkersWithFilter();
  }
  else
  {
    console.log("There are no filters being applied");
    displayedCompanies = jsonData.companies;
    CreateAllMarkers();
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


// -----------
// !! WIP !!
// -----------

 /**
  * A function that adds eventlisteners to all checkboxes to make them update the markers on the map based on the tag of the checkbox
  */
const SetupCheckboxes = () =>
 {
   checkboxes = document.getElementsByClassName("labelCheckBox")
   console.log(checkboxes);
   checkboxes = Array.from(checkboxes);

   checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function()
    {
      if (this.checked)
      {
          if (!currentFilters.includes(checkbox.value))
          {
            currentFilters.push(checkbox.value);
          }
      }
      else
      {
        if (currentFilters.includes(checkbox.value))
        {
           let index = currentFilters.indexOf(checkbox.value);
           currentFilters.splice(index, 1);
        }
      }

      filterMarkers(currentFilters);
      console.log(currentFilters);
    })
   });
 }

/**
 * A function that adds an eventlistener to the searchbox, place this in window.onload
 * @param {String} idName The name of the id given to the input DOM element
 * 
 * @example SetupSearchBox("searchBox");
 */
const SetupSearchBox = (idName) =>
{
  searchBox = document.getElementById(idName);

  // Add an eventlistener that runs a function every time the value of the inputbox changes
  searchBox.addEventListener('input', function()
  {
    GetSearchResults();
  })
}

/**
 * A function that uses the inputfield of the button to filters the list of companies by comparing the name of the company to the input value
 */
const GetSearchResults = () =>
{
  // Reset all markers based on the current applied filters
  filterMarkers(currentFilters);
  addMarkersWithFilter();

  // Creating search input variable to search witouth being case sensitive
  let input = new RegExp(searchBox.value, `i`);
  let searchResults = [];
  
  // debug
  console.log(displayedCompanies);

  displayedCompanies.forEach((company) =>
  {
    if (company.name.match(input)) // Check if there is a company that has the search input in their name
    {
      searchResults.push(company);
    }
  });

  // Display only the markers that match the search result
  displayedCompanies = searchResults;
  addMarkersWithFilter();
}