var parent = document.getElementById('parent');

var rooms = [];

getFromServer();

function createButton(text) {
  var button = document.createElement("button");
  button.innerHTML = text;
  return button;
}

function getFromServer() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/rooms", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState>3 && xhttp.status==200) {
      console.log(xhttp.responseText);
      var json = JSON.parse(xhttp.responseText);
      console.log(json);
      for (var i = 0; i < json.length; i++) {
        console.log(json[i]);
        createRoom(json[i].roomName, json[i].items);
      }
    }
  };
  xhttp.send();
}

function createItem() {
  var roomRaw = "";
  for (var i = 0; i < rooms.length; i++) {
    roomRaw += rooms[i] + "+";
  }
  window.location = '/createItem?rooms='+roomRaw;
}

function sendToServer(room) {
  console.log(room);
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/mainPage", true);
  xhttp.send(JSON.stringify(room));
}

function createList(stuff) {
  var ul = document.createElement('ul');
  for (var i = 0; i < stuff.length; i++) {
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.innerHTML = stuff[i].name  + " (" + stuff[i].qty.toString() + ')';
    link.classList.add('ignore-css');
    link.style.textDecoration = "underline";
    link.style.color = "green";
    link.style.cursor = "pointer";
    link.href = "www.google.com";
    li.appendChild(link);
    ul.appendChild(li);
  }
  return ul;
}

function createRoom(roomName, items) {

  var isEditable = roomName == null && items == null;

  var fieldset = document.createElement('fieldset');
  var legend = document.createElement('legend');
  var br = document.createElement('br');
  legend.classList.add('ignore-css');

  var legendHeader = document.createElement('h3');
  legendHeader.innerHTML = "Enter room name";

  var legendIn = document.createElement('input');
  legendIn.type = "text";

  var googleMap = document.createElement('div');
  googleMap.classList.add('map');

  var uluru = {lat: 37.3688, lng: -122.0802};
  // The map, centered at Uluru
  var map = new google.maps.Map(googleMap, {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});

  var createBut = createButton("Add Room");

  var createEverything = function() {
    if (roomName == null && items == null) {
      rooms.push(legendIn.value);
    }
    else {
      roomName = roomName.split('.')[0];
      legendIn.value = roomName;
      rooms.push(roomName);
    }
    var newRoom = new Room(legendIn.value, "3, 3, 3", []);
    if (roomName == null && items == null) {
      sendToServer(newRoom);
    }
    var nameh3 = document.createElement('h3');
    legendHeader.innerHTML = legendIn.value;
    legendIn.remove();
    googleMap.remove();
    createBut.remove();
  }

  createBut.onclick = createEverything;

  legend.appendChild(legendHeader);
  legend.appendChild(legendIn);
  fieldset.appendChild(legend);

  if (items != null) {
    var newList = createList(items);
    fieldset.appendChild(newList);
  }

  fieldset.appendChild(googleMap);
  fieldset.appendChild(createBut);
  parent.appendChild(br);
  parent.appendChild(fieldset);

  if (!isEditable) {
    createEverything();
  }
}
