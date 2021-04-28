const roomService = require("./roomService");


function get_current_room_by_id(all_room_info, roomID) {
    var current_room = null;
    var current_index = null;
    for (i = 0; i < all_room_info.length; i++) {
        if (all_room_info[i].roomID === roomID) {
            current_room = all_room_info[i]
            current_index = i
        }
    }
    return { current_room: current_room, current_index: current_index }
}



const testTime = { timeChangeDrawer: 13000, timeShowResult: 3000 }

module.exports = {
    beginGame: function (socket, io, all_room_info) {
        socket.on('beginGame', (data) => {
            var temp_data = get_current_room_by_id(all_room_info, data.roomID)
            const current_room = temp_data.current_room;
            const current_index = temp_data.current_index;

            if (current_room) {
                if (current_room.host == data.userName) {
                    console.log("接收到游戏开始信号")
                    current_room.globalStatus = "playing";
                    current_room.game.status = "ChoosingWord";
                    current_room.game.round++;
                    console.log("进入第", current_room.game.round, "轮");
                    current_room.game.drawer = current_room.scoreBoard[0].userName
                    io.sockets.to(data.roomID).emit("choosingWord", current_room)
                    all_room_info[current_index] = current_room
                    io.sockets.emit("updateRoomInfo", all_room_info)
                }

            } else {
                console.log("[ERROR]:Room Undefined")
            }
        })
    },

    setWord: function (socket, io, all_room_info) {
        socket.on('setWord', (data) => {
            var temp_data = get_current_room_by_id(all_room_info, data.roomID)
            const current_room = temp_data.current_room;
            const current_index = temp_data.current_index;

            if (current_room) {
                console.log("set word:", data.word)
                current_room.game.status = "drawing";
                current_room.game.word = data.word;
                io.sockets.to(data.roomID).emit("drawing", current_room)
                all_room_info[current_index] = current_room
                io.sockets.emit("updateRoomInfo", all_room_info)

            } else {
                console.log("[ERROR]:Room Undefined")
            }
        })
    },

    draw: function (socket, io, all_room_info) {
        socket.on('draw', (data) => {
            var temp_data = get_current_room_by_id(all_room_info, data.roomID)
            const current_room = temp_data.current_room;
            const current_index = temp_data.current_index;
            if (current_room) {
                current_room.game.canvas = data.canvas
                io.sockets.to(data.roomID).emit("onDraw", current_room)
                all_room_info[current_index] = current_room
                io.sockets.emit("updateRoomInfo", all_room_info)

            } else {
                console.log("[ERROR]:Room Undefined")
            }

        })
    },

    timer: function (socket, io) {
        let globalTimer;
        let seconds = 60;
        socket.on('startTimer', (roomID) => {
            globalTimer = setInterval(() => {
                seconds--;
                io.sockets.to(roomID).emit('timer', seconds);

                if (seconds <= 0) {
                    clearInterval(globalTimer);
                    seconds = 60;
                }
            }, 1000)
        }),
            socket.on('finishedTimer', (roomID) => {
                clearInterval(globalTimer);
                seconds = 60;
            })
    },

    chatAnswer: function (app, socket, all_room_info, all_user, io) {
        socket.on('new_msg', function (data) {
            var temp_data = get_current_room_by_id(all_room_info, socket.PLAYER_INFO.roomID);
            const current_room = temp_data.current_room;
            const current_index = temp_data.current_index;
            if (current_room) {
                if (current_room.game.status == "drawing") {
                    var user_index;
                    for (i = 0; i < current_room.scoreBoard.length; i++) {
                        if (current_room.scoreBoard[i].userName === socket.PLAYER_INFO.userName) {
                            user_index = i;
                        }
                    }


                    if ((current_room.game.drawer === socket.PLAYER_INFO.userName) || current_room.scoreBoard[user_index].right) {
                        const lowercaseMsg = data.toLowerCase();
                        const lowerAns = current_room.game.word.toLowerCase();
                        let msg = { user: socket.PLAYER_INFO.userName, type: 'msg', text: null };
                        if (lowercaseMsg.indexOf(lowerAns) != -1) {
                            msg.text = lowerAns.replace(/\S/gi, '*');
                        } else {
                            msg.text = data;
                        }
                        current_room.messages.push(msg);
                        io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
                        io.sockets.emit("updateRoomInfo", all_room_info);

                    } else if (!current_room.scoreBoard[user_index].right) {
                        const lowercaseMsg = data.toLowerCase()
                        const lowerAns = current_room.game.word.toLowerCase()
                        if (lowercaseMsg === lowerAns) {
                            current_room.game.num_of_right++;
                            current_room.scoreBoard[user_index].right = false;
                            const score = Math.max(60 - (current_room.game.num_of_right * 10), 10);
                            current_room.scoreBoard[user_index].score += score;
                            const new_msg = { user: socket.PLAYER_INFO.userName, type: 'ans' };
                            current_room.messages.push(new_msg);
                            all_room_info[current_index] = current_room;
                            io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
                            io.sockets.emit("updateRoomInfo", all_room_info);

                        } else {
                            const new_msg = { user: socket.PLAYER_INFO.userName, type: 'msg', text: data };
                            current_room.messages.push(new_msg);
                            all_room_info[current_index] = current_room;
                            io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
                            io.sockets.emit("updateRoomInfo", all_room_info);
                        }
                    }

                } else {
                    const new_msg = { user: socket.PLAYER_INFO.userName, type: 'msg', text: data };
                    current_room.messages.push(new_msg);
                    all_room_info[current_index] = current_room;
                    io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
                    io.sockets.emit("updateRoomInfo", all_room_info);

                }
            }

        })

    }






    // finnishDrawing: function (socket, io, all_room_info) {
    //     socket.on("finnishedDrawing", (word) => {
    //         testroom.game.status = "finnished"
    //         socket.emit("gameUpdate", testroom)
    //         socket.broadcast.emit("gameUpdate", testroom)
    //         changeDrawer()
    //     })

    //     function changeDrawer() {
    //         var drawerIndex = null;   //Find the index of drawer
    //         for (i = 0; i < testroom.socoreBoard.length; i++) {
    //             if (testroom.socoreBoard[i].userName == testroom.game.drawer) {
    //                 drawerIndex = i;
    //             }
    //         }

    //         if (drawerIndex != null) {
    //             if (drawerIndex !== testroom.socoreBoard.length - 1) { //If the player is not the last player
    //                 //TODO：在这里发送答案 设置Round Type为：Finished
    //                 console.log("第", drawerIndex, "位drawer完成绘画");
    //                 drawerIndex++;
    //                 testroom.game.drawer = testroom.socoreBoard[drawerIndex].userName;
    //                 testroom.game.status = "ChoosingWord"
    //                 console.log("第", drawerIndex, "位drawer开始绘画");
    //                 setTimeout(function () {
    //                     socket.emit("choosingWord", testroom)
    //                     socket.broadcast.emit("choosingWord", testroom)

    //                 }, 3000)



    //             } else {

    //                 if (testroom.game.currentRound !== testroom.maxRound) { //If it's not the last round
    //                     console.log("第", drawerIndex, "位drawer完成绘画")
    //                     console.log("第", testroom.game.currentRound, "轮结束")
    //                     testroom.game.currentRound++;
    //                     console.log("第", testroom.game.currentRound, "轮开始")
    //                     drawerIndex = 0;
    //                     testroom.game.drawer = testroom.socoreBoard[drawerIndex].userName;
    //                     testroom.game.status = "ChoosingWord"
    //                     console.log("第", drawerIndex, "位drawer开始绘画");
    //                     setTimeout(function () {
    //                         socket.emit("choosingWord", testroom)
    //                         socket.broadcast.emit("choosingWord", testroom)

    //                     }, 3000)



    //                 } else {
    //                     console.log("第", drawerIndex, "位drawer完成绘画")
    //                     console.log("第", testroom.game.currentRound, "轮结束")
    //                     testroom.globalStatus = "finnished";
    //                     testroom.game.status = "ChoosingWord";
    //                     console.log("现在是最终结果展示时间...")
    //                     console.log("游戏结束")
    //                     setTimeout(function () {
    //                         socket.emit("gameUpdate", testroom)
    //                         socket.broadcast.emit("gameUpdate", testroom)

    //                     }, 3000)

    //                 }
    //             }
    //         } else {
    //             //TODO: Drawer已经退出房间的情况
    //             console.log("Drawer已经退出房间的情况")
    //         }
    //     }

    // },






}