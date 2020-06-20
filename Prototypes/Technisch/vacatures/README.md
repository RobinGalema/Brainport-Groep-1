# Prototype Job offers

## Description
Application that searches for job offers in the area Brainport Eindhoven by location.

## How to use
1. You need to have to an input field and a submit button in your form:
```html
      <input type="text" id="inputSearch" placeholder="Search.." name="search">
      <button type="submit" id="submitSearch"><i class="fa fa-search"></i></button>
```
2. You need to have a div that shows the output from the search:
```html
    <div id="containerOutput">
      <h1 id="outputTitle">Job offers</h1>
      <div id="output"></div>
    </div>
```
3. In the module change the id's on line 9 and 12 to your chosen id's.
```javascript
        userInput = document.getElementById('inputSearch').value; //your input field id
        outputElement = document.getElementById('output'); //your output container id
```
4. Back to your HTML file, run the script:
```html
    <script>
      Searchjoboffer.init("submitSearch"); //your submit button id
    </script>
```

### Live working demo 
https://charlyvos.nl/projects/vacatures/index.html

## Auteur
**Charly Vos** - Team member - https://github.com/Charlyvos  
