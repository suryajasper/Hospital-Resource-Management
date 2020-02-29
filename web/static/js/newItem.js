var select = document.getElementById('rooms');

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
