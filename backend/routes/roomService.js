module.exports = {
    joinRoom: function (app,socket, all_room_info) {
        socket.on('joinRoom', function (data) {
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
                    console.log("房间已满！！！")
                } else {
                    current_room.currentPlayers += 1
                    all_room_info[current_index] = current_room
                    socket.emit('updateRoomInfo', all_room_info)
                    socket.broadcast.emit('updateRoomInfo', all_room_info)
                    console.log("User Join Room",data)
                    socket.join(data)

                }

            } else {
                console.log("房间不存在！！")
            }




        })
    }

}

