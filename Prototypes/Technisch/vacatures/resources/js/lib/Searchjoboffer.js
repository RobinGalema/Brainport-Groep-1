const Searchjoboffer = (function () {
    let submitElement;
    let htmlString;
    let userInput;

    const init = (submitElementId = "submitSearch", inputSearchValue = "inputSearch", outputId = "output") => {
        submitElement = document.getElementById(submitElementId);
        submitElement.addEventListener("click", () => {
          userInput = document.getElementById(inputSearchValue).value; //your input field id
          searchJobOffer(userInput);
        });
        outputElement = document.getElementById(outputId); //your output container id
    }

    const searchJobOffer = async (userInputValue) => {
        htmlString = "";   //reset the output string empty
      
        await fetch('resources/data/data.json') //get data from json
        .then((res) => res.json()) //format JSON
        .then((json) => json.companies.forEach(element => { //for each company in the json >
          if (element.city == userInputValue) { //Check which company match with the user input
            if (element.joboffer) {
              element.joboffer.forEach(element => { //for each matched company > job offers > 
                htmlString += `<div class='jobOffer'><div class='info'><h2>${element.title}</h2><p>${element.description}</p> <p>Salary: ${element.salary}</p></div></div>`; // set the string with data from json
                $(outputElement).html(htmlString); //show the output on the front-end              
              });
            }
        }}))
      }

    return {init}
})();