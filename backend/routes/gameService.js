const roomService = require("./roomService");

const testroom = {
    socoreBoard: [
        {
            userName: "USER1",
            score: 0,
        },
        {
            userName: "USER2",
            score: 0,
        },
    ],
    current_user: 2,
    maxRound: 2,
    game: { status: "waiting", round: 0, drawer: null, drawerindex: null, currentRound: 1, word: null },
}



const testTime = { timeChangeDrawer: 13000, timeShowResult: 3000 }

module.exports = {
    beginGame: function (socket, io, all_room_info) {
        socket.on('beginGame', () => {
            console.log("接收到游戏开始信号")
            testroom.globalStatus = "playing";
            testroom.game.status = "ChoosingWord";
            testroom.game.round++;
            console.log("进入第", testroom.game.round, "轮");
            testroom.game.drawer = testroom.socoreBoard[0].userName
            socket.emit("choosingWord", testroom)
            socket.broadcast.emit("choosingWord", testroom)

        })
    },
    setWord: function (socket, io, all_room_info) {
        socket.on('setWord', (word) => {
            console.log("set word:", word)
            testroom.game.status = "drawing";
            testroom.game.word = word;
            socket.emit("drawing", testroom)
            socket.broadcast.emit("drawing", testroom)
        })
    },
    finnishDrawing: function (socket, io, all_room_info) {
        socket.on("finnishedDrawing", (word) => {
            testroom.game.status = "finnished"
            socket.emit("gameUpdate", testroom)
            socket.broadcast.emit("gameUpdate", testroom)
            changeDrawer()
        })

        function changeDrawer() {
            var drawerIndex = null;   //Find the index of drawer
            for (i = 0; i < testroom.socoreBoard.length; i++) {
                if (testroom.socoreBoard[i].userName == testroom.game.drawer) {
                    drawerIndex = i;
                } 
            }
        
            if (drawerIndex != null) {
                if (drawerIndex !== testroom.socoreBoard.length - 1) { //If the player is not the last player
                    //TODO：在这里发送答案 设置Round Type为：Finished
                    console.log("第", drawerIndex, "位drawer完成绘画");
                    drawerIndex++;
                    testroom.game.drawer = testroom.socoreBoard[drawerIndex].userName;
                    testroom.game.status = "ChoosingWord"
                    console.log("第", drawerIndex, "位drawer开始绘画");
                    setTimeout(function() {
                        socket.emit("choosingWord",testroom)
                        socket.broadcast.emit("choosingWord",testroom)
        
                    }, 3000)
                    
        
        
                } else {
        
                    if (testroom.game.currentRound !== testroom.maxRound) { //If it's not the last round
                        console.log("第", drawerIndex, "位drawer完成绘画")
                        console.log("第", testroom.game.currentRound, "轮结束")
                        testroom.game.currentRound++;
                        console.log("第", testroom.game.currentRound, "轮开始")
                        drawerIndex = 0;
                        testroom.game.drawer = testroom.socoreBoard[drawerIndex].userName;
                        testroom.game.status = "ChoosingWord"
                        console.log("第", drawerIndex, "位drawer开始绘画");
                        setTimeout(function() {
                            socket.emit("choosingWord",testroom)
                            socket.broadcast.emit("choosingWord",testroom)
            
                        }, 3000)
        
        
        
                    } else {
                        console.log("第", drawerIndex, "位drawer完成绘画")
                        console.log("第", testroom.game.currentRound, "轮结束")
                        testroom.globalStatus="finnished";
                        testroom.game.status = "ChoosingWord";
                        console.log("现在是最终结果展示时间...")
                        console.log("游戏结束")
                        setTimeout(function() {
                            socket.emit("gameUpdate",testroom)
                            socket.broadcast.emit("gameUpdate",testroom)
            
                        }, 3000)
        
                    }
                }
            } else {
                //TODO: Drawer已经退出房间的情况
                console.log("Drawer已经退出房间的情况")
            }
        }

    },

     




}