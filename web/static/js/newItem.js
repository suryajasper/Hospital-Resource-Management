console.log(window.location.href);

var roomNames = window.location.href.split('=')[1].split('+');
var select = document.getElementById('rooms');

function createOption(roomName) {
  var option = document.createElement('option');
  option.value = roomName;
  option.innerHTML = roomName;

  select.appendChild(option);
}

for (var i = 0; i < roomNames.legnth; i++) {
  createOption(roomNames[i]);
}
