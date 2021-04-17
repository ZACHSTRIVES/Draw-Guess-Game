all_room_ID = []
module.exports = {
  createRoom: function (app, socket, all_room_info,all_users) {
    socket.on('create_room', function (data) {
      var tempID = parseInt(Math.random() * 9999).toString(); // The temporary room id
      while (all_room_ID.indexOf(tempID) >= 0) { // Determine if there is a duplicate ID
        tempID = parseInt(Math.random() * 9999).toString();
      }
      var user=null;
      for (i = 0; i < all_users.length; i++) {
        if (all_users[i].userName === data.userName) {
            user = all_users[i]
            
        }
    }


      all_room_ID.push(tempID)
      data.room.roomID = tempID;
      data.room.currentPlayers = 0;
      data.room.scoreBoard = [];

      console.log("Create Room:", data.room)
      
      socket.emit('updateRoomInfo', all_room_info)
      data.room.currentPlayers += 1;
      var userScoreBoard = { userName: data.userName, score: 0 };
      data.room.scoreBoard.push(userScoreBoard)
      socket.emit('updateRoomInfo', all_room_info)
      socket.broadcast.emit('updateRoomInfo', all_room_info)
      socket.join(data.roomID)
      if(user){
        user.socket.emit('joinRoomSuccess', data.room)
      }
      all_room_info.push(data.room)

    });

  },
}
