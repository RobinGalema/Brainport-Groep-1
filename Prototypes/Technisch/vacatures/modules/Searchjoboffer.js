const Searchjoboffer = (function () {
    let dataset;
    let submitElement;
    let htmlString;
    let userInput;

    const init = (submitElementId) => {
        submitElement = document.getElementById(submitElementId);
        submitElement.addEventListener("click", searchJobOffer);
        userInput = document.getElementById('inputSearch').value;
    }

    const searchJobOffer = (userInputValue) => {
        console.log("test");
        
        htmlString = "";   //reset the output string empty
      
        fetch('../vacatures/data.json') //get data from json
        .then((res) => res.json()) //format JSON
        .then((json) => json.companies.forEach(element => { //for each company in the json >
          if (element.city == userInputValue) { //Check which company match with the user input
            element.joboffer.forEach(element => { //for each matched company > job offers > 
              htmlString += `<div class='vacature'><div class='info'><h2>${element.title}</h2><p>${element.description}</p> <p>Salary: ${element.salary}</p></div></div>`; // set the string with data from json
              $('#output').html(htmlString); //show the output on the front-end              
            });
        }}))
      }

    return { init}
})();