var parent = document.getElementById('parent');

function createButton(text) {
  var button = document.createElement("button");
  button.innerHTML = text;
  return button;
}

function createRoom() {
  var fieldset = document.createElement('fieldset');
  var legend = document.createElement('legend');
  var br = document.createElement('br');
  legend.classList.add('ignore-css');

  var legendHeader = document.createElement('h3');
  legendHeader.innerHTML = "Enter roon name";
  
  var legendIn = document.createElement('input');
  legendIn.type = "text";

  legend.appendChild(legendIn);
  fieldset.appendChild(legend);
  parent.appendChild(br);
  parent.appendChild(fieldset);
}
