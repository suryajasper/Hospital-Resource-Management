var parent = document.getElementById('parent');

var rooms = ["room1", "room2", "room3"];

function createButton(text) {
  var button = document.createElement("button");
  button.innerHTML = text;
  return button;
}

function createItem() {
  var roomRaw = "";
  for (var i = 0; i < rooms.length; i++) {
    roomRaw += rooms[i] + "+";
  }
  window.location = '../template/createItem.html?rooms='+roomRaw;
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
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var createBut = createButton("Add Room");
  createBut.onclick = function() {
    var nameh3 = document.createElement('h3');
    legendHeader.innerHTML = legendIn.value;
    legendIn.remove();
    createBut.remove();
  };

  legend.appendChild(legendHeader);
  legend.appendChild(legendIn);
  fieldset.appendChild(legend);
  fieldset.appendChild(googleMap);
  fieldset.appendChild(createBut);
  parent.appendChild(br);
  parent.appendChild(fieldset);
}
