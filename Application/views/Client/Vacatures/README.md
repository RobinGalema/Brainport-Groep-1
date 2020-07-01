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
3. Back to your HTML file, run the script: and give the following id's as parameter:
- Your submit button
- Your input field 
- The div that outputs the results
```html
    <script>
      Searchjoboffer.init("submitSearch", "inputSearch", "output"); // * By default it gives the following parameters
    </script>
```

### Live working demo 
https://charlyvos.nl/projects/vacatures/index.html

## Auteur
**Charly Vos** - Team member - https://github.com/Charlyvos  
