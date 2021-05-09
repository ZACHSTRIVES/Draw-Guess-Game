module.exports = {
  joinRoom: function (app, socket, all_room_info, all_users, io) {
    socket.on('joinRoom', function (data) {
      var current_room = null;
      var current_index = null;
      for (i = 0; i < all_room_info.length; i++) {
        if (all_room_info[i].roomID === data.roomID) {
          current_room = all_room_info[i]
          current_index = i
        }
      }

      if (current_room != null) { //Determine whether the local storage has the room
        if (current_room.maxPlayers === current_room.currentPlayers) {
          console.log("Room Full")
        } else {
          current_room.currentPlayers += 1;
          var userScoreBoard = { userName: data.userName, score: 0, right: false };
          socket.PLAYER_INFO = { userName: data.userName, roomID: data.roomID }
          current_room.messages.push({ user: data.userName, type: 'in' })
          current_room.scoreBoard.push(userScoreBoard)
          console.log(current_room)
          all_room_info[current_index] = current_room;
          socket.emit('updateRoomInfo', all_room_info)
          socket.broadcast.emit('updateRoomInfo', all_room_info)
          socket.join(data.roomID)
          socket.emit('joinRoomSuccess', current_room)
          io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room)
        }
      } else {
        console.log("[ERROR] current room is null")
      }
    })
  },
  getRoomInfo: function (socket, io, all_room_info) {
    socket.on("getRoomInfo", function (data) {
      var current_room = null;
      var current_index = null;
      for (i = 0; i < all_room_info.length; i++) {
        if (all_room_info[i].roomID === data.roomID) {
          current_room = all_room_info[i]
          current_index = i
        }
      }
      var user = null;
      if (current_room != null) { //Determine whether the local storage has the room
        let flag = false
        current_room.scoreBoard.forEach(item => {
          if (data.userName === item.userName) {
            flag = true //only ID
          }
        })

        if (flag) {
          socket.emit("setRoomInfo", current_room)

        } else {
          if (current_room.maxPlayers === current_room.currentPlayers) {
            socket.emit("roomFull")
          } else {
            current_room.currentPlayers += 1;
            var userScoreBoard = { userName: data.userName, score: 0, right: false };
            socket.PLAYER_INFO = { userName: data.userName, roomID: data.roomID }
            current_room.messages.push({ user: data.userName, type: 'in' })
            current_room.scoreBoard.push(userScoreBoard)
            all_room_info[current_index] = current_room;
            socket.emit('updateRoomInfo', all_room_info)
            socket.broadcast.emit('updateRoomInfo', all_room_info)
            socket.join(data.roomID)
            socket.emit('setRoomInfo', current_room)
            io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room)
          }
        }
      } else {
        socket.emit('setRoomInfo', current_room)
      }
    })
  },
}

