const Menu = (function () {
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
   * @param {string} jsonData path to json file
   */
  const makeLabelList = (jsonData) => {
    jsonData.companies.forEach((element) => {
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
      // creates checkbox
      var checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      checkBox.value = element;
      checkBox.className = "labelCheckBox";
      console.log("checkbox made");

      // creates label
      var label = document.createElement("label");
      label.id = "checkBoxLabel";
      boxContainer.appendChild(label);
      label.appendChild(checkBox);
      label.appendChild(document.createTextNode(element));
    });
  };

  const menuContent = document.getElementById("menuContent");
  /**
   * makes textboxes for each company
   * @param {string} jsonData path to json file
   */
  const companyInfo = (jsonData) => {
    jsonData.companies.forEach((element) => {
      let infoContainer = document.createElement("div");
      infoContainer.className = "infoContainer";
      menuContent.appendChild(infoContainer);

      let companyNameText = createPElement("h3", "infoText", element.name);
      let companyAdress = createPElement("p", "infoText", element.adress);
      let companyCity = createPElement("p", "infoText", element.city);
      let companyWebsite = createPElement("p", "infoText", element.website);

      infoContainer.appendChild(companyNameText);
      infoContainer.appendChild(companyAdress);
      infoContainer.appendChild(companyCity);
      infoContainer.appendChild(companyWebsite);
    });
  };

  /**
   * creates element with json input
   * @param {string} element element type
   * @param {string} id element id
   * @param {string} input text
   */
  const createPElement = (element, id, input) => {
    let infoText = document.createElement(element);
    infoText.id = id;

    infoText.innerHTML = input;
    return infoText;
  };

  return {
    CloseMenu: CloseMenu,
    OpenMenu: OpenMenu,
    makeLabelList: makeLabelList,
    makeFilterCheckbox: makeFilterCheckbox,
    companyInfo: companyInfo,
  };
})();
