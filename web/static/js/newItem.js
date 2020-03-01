var select = document.getElementById('rooms');
var itemSelect = document.getElementById('type');
var qty = document.getElementById('qty');

var parent = document.getElementById('parent');
parent.classList.add('ignore-css');

function sendToServer(item) {
  var newItem = new Item(item, parseInt(qty.value), itemSelect.value, select.value);
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/items", true);
  xhttp.send(JSON.stringify(newItem));
}

async function getDrugInfo(drugName) {
  var axiosToSend = 'https://api.fda.gov/drug/ndc.json?search=generic_name:"' + drugName + '"&limit=100';
  const response = await axios.get((axiosToSend), {});
  console.log(response);
  processDrug(response["data"]["results"]);
}

function processDrug(drugs) {
  console.log(drugs);
  for (var i = 0; i < drugs.length; i++) {
    addDrugToScreen(drugs[i]);
  }
}

function createH4(text, param) {
  var h4 = document.createElement('h4');
  h4.innerHTML = text + ": " + param;
  return h4;
}

function createList(stuff) {
  var ul = document.createElement('ul');
  for (var i = 0; i < stuff.length; i++) {
    var li = document.createElement('li');
    li.innerHTML = stuff[i];
    ul.appendChild(li);
  }
  return ul;
}

function addItemToScreen() {
  if (itemSelect.value === "Drug") {
    getDrugInfo(document.getElementById('nameIn').value);
  }
  else {
    sendToServer(document.getElementById('nameIn').value);
  }
}

function addDrugToScreen(drug) {
  var fieldset = document.createElement('fieldset');
  fieldset.style.width = "80%";

  var legend = document.createElement('legend');
  var legendHeader = document.createElement('h3');

  legendHeader.innerHTML = drug.generic_name;

  var ingredients = drug.active_ingredients;

  var brandName = createH4("Brand Name", drug.brand_name);
  var labeler = createH4("Labeler", drug.labeler_name);
  var dosage = createH4("Type", drug.dosage_form);
  var ingD = createH4("ingredients", "");

  var listofingredients = [];
  for (var i = 0; i < ingredients.length; i++) {
    listofingredients.push(ingredients[i].name + " (" + ingredients[i].strength + ")");
  }
  var actList = createList(listofingredients);

  var buttonToCreate = document.createElement('button');
  buttonToCreate.innerHTML = "Add";
  buttonToCreate.onclick = function() {
    sendToServer(drug.generic_name);
    window.location = "../template/mainPage.html";
  }

  var br1 = document.createElement('br');
  var br2 = document.createElement('br');
  var br3 = document.createElement('br');
  var br4 = document.createElement('br');
  var br5 = document.createElement('br');

  fieldset.appendChild(brandName);
  fieldset.appendChild(br1);
  fieldset.appendChild(labeler);
  fieldset.appendChild(br2);
  fieldset.appendChild(dosage);
  fieldset.appendChild(br3);
  fieldset.appendChild(ingD);
  fieldset.appendChild(br4);
  fieldset.appendChild(actList);
  fieldset.appendChild(br5);
  fieldset.appendChild(buttonToCreate);

  legend.appendChild(legendHeader);
  fieldset.appendChild(legend);
  parent.appendChild(fieldset);
}

function createOption(roomName) {
  var option = document.createElement('option');
  option.setAttribute('value', roomName);
  option.innerHTML = roomName;
  console.log(roomName);

  select.appendChild(option);
}
function initialize() {
  console.log(window.location.href);

  var roomNames = window.location.href.split('=')[1].split('+');
  console.log(roomNames);

  for (var i = 0; i < roomNames.length-1; i++) {
    createOption(roomNames[i]);
  }

}
