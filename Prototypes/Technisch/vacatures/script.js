let submit = document.getElementById('submitSearch');
submit.addEventListener("click", searchJobOffer);

function searchJobOffer() {
  let htmlString = "";
  let userInput = document.getElementById('inputSearch').value;

  fetch('data.json')
  .then((res) => res.json()) //format JSON
  .then((json) => json.companies.forEach(element => {
    if (element.city == userInput) {
      element.joboffer.forEach(element => {
        console.log(element);
        htmlString += `<div class='vacature'><div class='info'><h2>${element.title}</h2><p>${element.description}</p> <p>Salary: ${element.salary}</p></div></div>`;
        $('#output').html(htmlString);
      });
  }}))
}