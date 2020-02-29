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
  legendHeader.innerHTML = "Enter room name";

  var legendIn = document.createElement('input');
  legendIn.type = "text";

  var googleMap = document.createElement('div');

  map = new google.maps.Map(googleMap, {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  legend.appendChild(legendHeader);
  legend.appendChild(legendIn);
  fieldset.appendChild(legend);
  fieldset.appendChild(googleMap);
  parent.appendChild(br);
  parent.appendChild(fieldset);
}
