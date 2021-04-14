// const rooms = require('./rooms.js');
const createService= require("./createService.js")
const roomService= require("./roomService.js")

module.exports = function(app,socket,all_room_info) {
  // rooms(app, db);
  createService.createRoom(app,socket,all_room_info);
  roomService.joinRoom(app,socket,all_room_info)
  // Other route groups could go here, in the future
};