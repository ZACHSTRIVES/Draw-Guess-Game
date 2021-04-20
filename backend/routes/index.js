// const rooms = require('./rooms.js');
const createService= require("./createService.js")
const roomService= require("./roomService.js")
const userService=require("./userServics.js")

module.exports = function(app,socket,all_room_info,initdata,all_users,io) {
  // rooms(app, db);
  createService.createRoom(app,socket,all_room_info,all_users,io);
  roomService.joinRoom(app,socket,all_room_info,all_users,io);
  userService.userLogin(app,socket,all_room_info,initdata,all_users)
  roomService.watchRoom(app,socket,all_room_info,all_users,io)
  roomService.simpleChat(app,socket,all_room_info,all_users,io)

  
  // roomService.userJoin(app,socket,all_room_info)
  // Other route groups could go here, in the future
};