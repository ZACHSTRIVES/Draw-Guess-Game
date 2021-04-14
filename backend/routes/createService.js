all_room_ID=[]
module.exports = {
  createRoom:function(app,socket,all_room_info) {
    socket.on('create_room', function(room){
      var tempID = parseInt(Math.random() * 9999).toString(); // The temporary room id
      while (all_room_ID.indexOf(tempID) >= 0) { // Determine if there is a duplicate ID
          tempID = parseInt(Math.random() * 9999).toString();
      }
      all_room_ID.push(tempID)
      room.roomID=tempID;
      room.currentPlayers=0;
  
      console.log("Create Room:",room)
      all_room_info.push(room)
      socket.emit('room_created',room)
      socket.emit('updateRoomInfo',all_room_info)
      socket.broadcast.emit('updateRoomInfo',all_room_info)
       });
  
    },
}
