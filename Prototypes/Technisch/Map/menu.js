/**
 * this closes the menu
 */
const CloseMenu = () => {
  const menu = document.getElementById("menu");
  menu.style.display = "none";
};
/**
 * this opens the menu
 */
const OpenMenu = () => {
  const menu = document.getElementById("menu");
  menu.style.display = "flex";
};


let labelList = [];
/**
* this puts all labels in an array
*/
const makeLabelList = () => {
  jsonData.companies.forEach((element) => {
    //console.log(element.labels);
    element.labels.forEach((label) => {
      if (!labelList.includes(label)) {
        labelList.push(label);
      }
    });
  });
  console.log(labelList);
};


let boxContainer = document.getElementById("checkBoxContainer");
/**
 * this puts all items from an array into labels and appends them to checkboxcontainer
 */
const makeFilterCheckbox = () => {
  labelList.forEach((element) => {
    // maak checkboxes
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.value = element;
    checkBox.className = "labelCheckBox";
    console.log("checkbox made");
    // /boxContainer.appendChild(checkBox);

    // maak label voor checkbox
    var label = document.createElement("label");
    label.id = "checkBoxLabel";
    boxContainer.appendChild(label);
    label.appendChild(checkBox);
    label.appendChild(document.createTextNode(element));
  });
};

// maak tekstvlakken met info over alle bedrijven


