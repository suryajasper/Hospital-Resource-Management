class Room {
  constructor(roomName, gps, items) {
    this.roomName = roomName;
    this.gps = gps;
    this.items = items;
  }
  constructor(roomName, gps) {
    this.roomName = roomName;
    this.gps = gps;
    this.items = [];
  }
  addItem(item) {
    this.items.push(item);
  }
  setItems(items) {
    for (var i = 0; i < items.length; i++) {
      this.addItem(items[i]);
    }
  }
}
