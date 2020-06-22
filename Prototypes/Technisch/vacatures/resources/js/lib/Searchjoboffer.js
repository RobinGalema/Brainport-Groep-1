const Searchjoboffer = (function () {
    let submitElement;
    let htmlString;
    let userInput;
    let data;

    fetch('resources/data/data.json')
    .then((res) => res.json())
    .then((json) => data = json)

    /**
     * Collects the id's from the form and which div to output the job offers to
     * @param  {string} submitElementId="submitSearch" the submit button ID from the form
     * @param  {string} inputSearchValue="inputSearch" the input id from the form.
     * @param  {string} outputId="output" the output id to show job offers.
     */
    const init = (submitElementId = "submitSearch", inputSearchValue = "inputSearch", outputId = "output") => {   
        submitElement = document.getElementById(submitElementId);
        submitElement.addEventListener("click", () => {
          userInput = document.getElementById(inputSearchValue).value;
          searchJobOffer(userInput);
        });
        outputElement = document.getElementById(outputId);
    }
    
    /**
     * This function will reset the output, then search the JSON file for any matching 
     * job offers found within the paramater
     * 
     * @param  {string} userInputValue the user input from the search form (a city)
     * @return Outputs the found job offers in the output div
     */
    const searchJobOffer = async (userInputValue) => {
        htmlString = "";
      
        data.companies.forEach(element => { 
          if (element.city == userInputValue) {
            if (element.joboffer) {
              element.joboffer.forEach(element => {
                htmlString += `<div class='jobOffer'><div class='info'><h2>${element.title}</h2><p>${element.description}</p> <p>Salary: ${element.salary}</p></div></div>`; // set the string with data from json
                $(outputElement).html(htmlString);         
              });
            }
        }})
      }

    return {init}
})();