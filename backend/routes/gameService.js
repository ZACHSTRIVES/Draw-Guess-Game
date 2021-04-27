const roomService = require("./roomService");

// const testroom = {
//     socoreBoard: [
//         {
//             userName: "USER1",
//             score: 0,
//         },
//         {
//             userName: "USER2",
//             score: 0,
//         },
//     ],
//     current_user: 2,
//     maxRound: 2,
//     game: { status: "waiting", round: 0, drawer: null, drawerindex: null, currentRound: 1, word: null },
// }

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
            console.log("ondraw")
            var temp_data = get_current_room_by_id(all_room_info, data.roomID)
            const current_room = temp_data.current_room;
            const current_index = temp_data.current_index;
            if (current_room) {
                current_room.game.canvas=data.canvas
                io.sockets.to(data.roomID).emit("onDraw", current_room)
                all_room_info[current_index] = current_room
                io.sockets.emit("updateRoomInfo", all_room_info)

            } else {
                console.log("[ERROR]:Room Undefined")
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