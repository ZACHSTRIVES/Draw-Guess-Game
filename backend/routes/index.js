// const rooms = require('./rooms.js');
const createService= require("./createService.js")
const roomService= require("./roomService.js")
const userService=require("./userServics.js")

module.exports = function(app,socket,all_room_info,initdata) {
  // rooms(app, db);
  createService.createRoom(app,socket,all_room_info);
  roomService.joinRoom(app,socket,all_room_info);
  userService.userLogin(app,socket,all_room_info,initdata)
  // Other route groups could go here, in the future
};