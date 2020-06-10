let submit = document.getElementById('submitSearch');
submit.addEventListener("click", searchJobOffer);

function searchJobOffer() {
  
  let htmlString = "";   //reset the output string empty
  let userInput = document.getElementById('inputSearch').value; //get value from input

  fetch('/Client/Vacatures/data.json') //get data from json
  .then((res) => res.json()) //format JSON
  .then((json) => json.companies.forEach(element => { //for each company in the json >
    if (element.city == userInput) { //Check which company match with the user input
      element.joboffer.forEach(element => { //for each matched company > job offers > 
        htmlString += `<div class='vacature'><div class='info'><h2>${element.title}</h2><p>${element.description}</p> <p>Salary: ${element.salary}</p></div></div>`; // set the string with data from json
        $('#output').html(htmlString); //show the output on the front-end
      });
  }}))
}