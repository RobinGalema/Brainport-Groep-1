// The Brainport map library
// This library is currenlty a Work in Progress
// 
const BrainportMap = (function () {

// Variables
let markers = [];
let displayedCompanies = [];
let checkboxes;
let currentFilters = [];
let searchBox;
let infoBoxes = [];

/**
 * A function that creates and sets-up the map with markers, for this there should be a <div> element on the linked html page with "map" set as the div's id
 * @param {Object} jsonData An object containing data from a json file. This file should contain information about the companies and the markers for the map.
 */
const DataSetup = (jsonData) =>
{
    MakeMap(jsonData);
    CreateAllMarkers(jsonData);
    loadData(jsonData);
    makeLabelList();
}

/**
 * Function that sets up most information displayed in the menu and sets-up event handelers for these items
 * 
 * @param {Object} jsonData An object containing data from a json file. This file should contain information about the companies and the markers for the map.
 * @param {String} searchBoxID The ID of the <input> element in the menu that is used as searchbox, when left empty this will be set to: "searchBox"
 * @param {String} ContainerClass The class name given to each of the containers for the company information in the menu, when left empty this will be set to: "infoContainer"
 * @example PageSetup("searchBox", "infoContainer");
 */
const PageSetup = (jsonData ,searchBoxID = "searchBox", containerClass = "infoContainer") =>
{
    makeFilterCheckbox();
    companyInfo();
    SetupCheckboxes(jsonData);
    SetupSearchBox(searchBoxID, jsonData);
    SetupInfoContainers(containerClass);
    setupCompanyList(containerClass);
}

/**
 * executes when api is loaded
 */
const initMap = () => {
    console.log("maps API loaded.");
  };
  
  /**
   * creates map and marker
   * @param {Object} jsonData Data from a json file, this is an object made from a json file
   */
  const MakeMap = (jsonData) => {
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
   * @param {Object} jsonData Data from a json file, this is an object made from a json file
   */
  const CreateAllMarkers = (jsonData) => {
    jsonData.companies.forEach((element) => {
      var uluru = {
        lat: element.marker.lat,
        lng: element.marker.long,
      };
      let marker = new google.maps.Marker({ position: uluru, map: map, name: element.name });
      markers.push(marker);
      var infoWindow = new google.maps.InfoWindow({
        content: "Name: " + element.name,
      });
      marker.addListener("click", function () {
        infoWindow.open(map, marker);
      });
    });
  };
  
  /**
   * Pushes all the companies from the JSON file into an array
   * @param {Object} jsonData Data from a json file, this is an object made from a json file
   */
  const loadData = (jsonData) => 
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
   * @param {Object} jsonData Data from a json file, this is an object made from a json file
   * @returns {[Object]} An array with all the companies that match the input filters
   * 
   * @example filterMarkers(["software","app-development"]);
   */
  const filterMarkers = (filters = [], jsonData) =>
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
      UpdateCompanyList("infoContainer");
    }
    else
    {
      console.log("There are no filters being applied");
      displayedCompanies = jsonData.companies;
      CreateAllMarkers(jsonData);
      UpdateCompanyList("infoContainer");
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
      let marker = new google.maps.Marker({ position: uluru, map: map, name: element.name });
      markers.push(marker);
      var infoWindow = new google.maps.InfoWindow({
        content:`Company: ${element.name}`
      });
      marker.addListener("click", function () {
        infoWindow.open(map, marker);
      });
    });
  }
  
  // -----------
  // !! WIP !!
  // -----------
  
   /**
    * A function that adds eventlisteners to all checkboxes to make them update the markers on the map based on the tag of the checkbox
    */
  const SetupCheckboxes = (jsonData) =>
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
  
        filterMarkers(currentFilters, jsonData);
        console.log(currentFilters);
      })
     });
   }
  
  /**
   * A function that adds an eventlistener to the searchbox, place this in window.onload
   * @param {String} idName The name of the id given to the input DOM element
   * @param {object} jsonData
   * 
   * @example SetupSearchBox("searchBox");
   */
  const SetupSearchBox = (idName, jsonData) =>
  {
    searchBox = document.getElementById(idName);
  
    // Add an eventlistener that runs a function every time the value of the inputbox changes
    searchBox.addEventListener('input', function()
    {
      GetSearchResults(jsonData);
    })
  }
  
  /**
   * A function that uses the inputfield of the button to filters the list of companies by comparing the name of the company to the input value
   * 
   * @param {Object} jsonData
   */
  const GetSearchResults = (jsonData) =>
  {
    // Reset all markers based on the current applied filters
    filterMarkers(currentFilters, jsonData);
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
    UpdateCompanyList("infoContainer");
    // Update the list of companies
    // UpdateCompanyList();
  }
  
  /**
   * Function that adds eventlisteners to the list of companies to make them pan to the marker when clicked on a company div
   * @param {String} containerClass The class name given to the div containing the information of the company
   */
  const SetupInfoContainers = (containerClass) =>
  {
    let infoContainers = document.getElementsByClassName(containerClass);
    infoContainers = Array.from(infoContainers);
  
    infoContainers.forEach((container) => {
      container.addEventListener('click', function() {
        markers.forEach((marker) => {
          console.log("searching");
          if (container.childNodes[0].innerHTML == marker.name)
          {
            map.panTo(marker.getPosition())
            console.log(marker);
            google.maps.event.trigger(marker, 'click');
          }
        });
      });
    });
  }
  
  /**
   * Sets up a list of information divs of companies based on the currently displayed markers
   * @param {String} containerClass The class name given to the div containing the information of the company
   */
  const setupCompanyList = (containerClass) =>
  {
      let infoContainers = document.getElementsByClassName(containerClass);
      infoContainers = Array.from(infoContainers)
      let listToDisplay = [];
      //console.log(`yeet`)
      //console.log(displayedCompanies.length);
      //console.log(displayedCompanies);
  
      displayedCompanies.forEach((company) =>
      {
        infoContainers.forEach((container) => {
          let nameToCheck = container.childNodes[0].innerHTML;
          if(nameToCheck == company.name)
          {
            listToDisplay.push(container);
          }
        });
      });
  
      infoBoxes = listToDisplay;
      console.log(infoBoxes);
  }
  
  /**
   * Updates the list of information divs in the menu to only display the information of companies that have a marker active
   * @param {String} containerClass The class name given to the div containing the information of the company
   */
  const UpdateCompanyList = (containerClass) =>
  {
    setupCompanyList("infoContainer");
    let infoContainers = document.getElementsByClassName(containerClass);
    infoContainers = Array.from(infoContainers);
  
    infoContainers.forEach(container => {
      if (infoBoxes.includes(container))
      {
        container.style.display = 'block';
      }
      else
      {
        container.style.display = "none";
      }
    });
  }

  return {
    initMap: initMap,
    filterMarkers: filterMarkers,
    removeMarkers: removeMarkers,
    addMarkersWithFilter: addMarkersWithFilter,
    SetupCheckboxes: SetupCheckboxes,
    SetupSearchBox: SetupSearchBox,
    SetupInfoContainers: SetupInfoContainers,
    GetSearchResults: GetSearchResults,
    SetupInfoContainers: SetupInfoContainers,
    setupCompanyList: setupCompanyList,
    UpdateCompanyList: UpdateCompanyList,
    DataSetup:DataSetup,
    PageSetup:PageSetup
  };

})();