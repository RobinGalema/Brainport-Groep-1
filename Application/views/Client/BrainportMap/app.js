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

window.onload = () => {
  fetchJSONFile("Client/BrainportMap/data.json", function (data) {
    Menu.setupMenu(data);

    // Map loading and creating of markers
    BrainportMap.DataSetup(data);

    // Setting up all DOM elements
    BrainportMap.PageSetup("searchBox", "infoContainer");


  });
};
