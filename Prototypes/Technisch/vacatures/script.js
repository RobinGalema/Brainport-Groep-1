let submit = document.getElementById('submitSearch');
submit.addEventListener("click", searchJobOffer);

function searchJobOffer() {
  let userInput = document.getElementById('inputSearch').value;

  fetch('data.json')
  .then((res) => res.json()) //format JSON
  .then((json) => json.companies.forEach(element => {
    if (element.city == userInput) console.log(element.joboffer);
  }))
}