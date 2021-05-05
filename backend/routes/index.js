// const rooms = require('./rooms.js');
const createService= require("./createService.js")
const roomService= require("./roomService.js")
const userService=require("./userServics.js")
const gameService=require("./gameService.js")

module.exports = function(app,socket,all_room_info,initdata,all_users,io,database) {
  // rooms(app, db);
  createService.createRoom(app,socket,all_room_info,all_users,io);

  roomService.joinRoom(app,socket,all_room_info,all_users,io);
  roomService.getRoomInfo(socket,io,all_room_info);

  userService.userLogin(app,socket,all_room_info,initdata,all_users,database);
  userService.userRegister(socket,io,database);

  gameService.chatAnswer(app,socket,all_room_info,all_users,io);
  gameService.beginGame(socket,io,all_room_info);
  gameService.draw(socket,io,all_room_info);
  gameService.gaming(socket,io,all_room_info);

};