let jsonData;
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

    // Map loading and creating of markers
    BrainportMap.DataSetup(jsonData);

    // Setting up all DOM elements
    BrainportMap.PageSetup(jsonData, "searchBox", "infoContainer");

  });

  BrainportMap
};
