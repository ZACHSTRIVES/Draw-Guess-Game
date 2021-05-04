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

            if (current_room != null) { //Determines whether the local storage has the room
                if (current_room.maxPlayers === current_room.currentPlayers) {
                    console.log("房间已满！！！")
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
                    // var temp_data = { userName: data.userName, roomInfo: current_room }
                    // socket.to(data.roomID).emit("newUserJoinRoom", temp_data)
                    io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room)
                }

            } else {
                console.log("房间不存在！！")
            }
        })
    },
    watchRoom: function (app, socket, all_room_info, all_user, io) {
        socket.on('disconnect', function () {
            console.log('A user has been forced leave');
            if (socket.PLAYER_INFO) { // Determine if the player is in the room
                console.log(socket.PLAYER_INFO);
                socket.leave(socket.PLAYER_INFO.roomID); // Remove from room
                var current_room = null;
                var current_index = null;
                for (i = 0; i < all_room_info.length; i++) {
                    if (all_room_info[i].roomID === socket.PLAYER_INFO.roomID) {
                        current_room = all_room_info[i]
                        current_index = i
                    }
                }
                console.log(socket.PLAYER_INFO.userName, "leaves the room ", socket.PLAYER_INFO.roomID)

                if (current_room) {
                    current_room.currentPlayers--;
                    if (current_room.currentPlayers == 0) { //If there are no players left in the room, delete the room.
                        all_room_info.splice(current_index, 1)
                        console.log("Room", socket.PLAYER_INFO.roomID, "Deleted due to insufficient players")

                    } else {
                        for (i = 0; i < current_room.scoreBoard.length; i++) {
                            if (current_room.scoreBoard[i].userName == socket.PLAYER_INFO.userName) {
                                current_room.scoreBoard.splice(i, 1)
                            }
                        }
                        io.to(current_room.roomID).emit("updateCurrentRoomInfo", current_room)
                        all_room_info[current_index] = current_room
                    }
                }

                io.sockets.emit('updateRoomInfo', all_room_info); //广播所有socket allRoomInfo更新了

            }
        })
    },
    getRoomInfo: function (socket, io, all_room_info) {
        socket.on("getRoomInfo", function(roomID) {
            var current_room = null;
            var current_index = null;
            for (i = 0; i < all_room_info.length; i++) {
                if (all_room_info[i].roomID === roomID) {
                    current_room = all_room_info[i]
                    current_index = i
                }
            }
            socket.emit("setRoomInfo",current_room)
            
        })

    },
    joinRoomViaURL:function (socket,io,all_room_info) {
        socket.on('joinRoomViaURL', function (data) {
            var current_room = null;
            var current_index = null;
            for (i = 0; i < all_room_info.length; i++) {
                if (all_room_info[i].roomID === data) {
                    current_room = all_room_info[i]
                    current_index = i
                }
            }

            if (current_room != null) { //Determines whether the local storage has the room
                if (current_room.maxPlayers === current_room.currentPlayers) {
                    socket.emit("roomFull")
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
                    socket.emit('setRoomInfo', current_room)
                    // var temp_data = { userName: data.userName, roomInfo: current_room }
                    // socket.to(data.roomID).emit("newUserJoinRoom", temp_data)
                    io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room)
                }

            } else {
                console.log("房间不存在！！")
            }
        })
        
    }
}

