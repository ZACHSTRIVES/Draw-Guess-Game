// const rooms = require('./rooms.js');
const createService= require("./createService.js")
const roomService= require("./roomService.js")
const userService=require("./userServics.js")

module.exports = function(app,socket,all_room_info,initdata,all_users) {
  // rooms(app, db);
  createService.createRoom(app,socket,all_room_info,all_users);
  roomService.joinRoom(app,socket,all_room_info,all_users);
  userService.userLogin(app,socket,all_room_info,initdata,all_users)
  // roomService.userJoin(app,socket,all_room_info)
  // Other route groups could go here, in the future
};