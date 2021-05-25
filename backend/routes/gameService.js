var dateTime = require('silly-datetime');

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

module.exports = {
  beginGame: function (socket, io, all_room_info) {
    socket.on('beginGame', (data) => {
      var temp_data = get_current_room_by_id(all_room_info, data.roomID)
      const current_room = temp_data.current_room;
      const current_index = temp_data.current_index;

      if (current_room) {
        if (current_room.host == data.userName) {
          for (i = 0; i < current_room.scoreBoard.length; i++) {
            current_room.scoreBoard[i].score = 0,
              current_room.scoreBoard[i].right = false
          }

          current_room.game.round = 0;
          current_room.num_of_right = 0;
          current_room.word = null;
          current_room.canvas = null;
          console.log(current_room)


          console.log("Room", current_room.roomID, "Start the game")
          current_room.globalStatus = "playing";
          current_room.game.status = "ChoosingWord";
          current_room.game.round++;
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
  gaming: function (socket, io, all_room_info, db, onlineUsers) {
    let globalTimer;
    let wordTimer;
    let seconds = 60;
    let settingWordsSeconds = 10;
    function randomNumber(min, max) {
      const r = Math.random() * (max - min) + min
      return Math.floor(r)
    };
    function changeDrawer(roomID, all_room_info, show_leaderBoard) {
      var temp_data = get_current_room_by_id(all_room_info, roomID);
      const current_room = temp_data.current_room;
      const current_index = temp_data.current_index;
      var drawerIndex = null;   //Find the index of drawer
      if (current_room) {
        for (i = 0; i < current_room.scoreBoard.length; i++) {
          current_room.scoreBoard[i].right = false
          if (current_room.scoreBoard[i].userName == current_room.game.drawer) {
            drawerIndex = i;
          }
        }
      }

      if (drawerIndex != null) {
        if (drawerIndex !== current_room.scoreBoard.length - 1) { //If the player is not the last player
          drawerIndex++;
          current_room.game.drawer = current_room.scoreBoard[drawerIndex].userName;
          current_room.game.status = "ChoosingWord"

          all_room_info[current_index] = current_room;
          if (show_leaderBoard) {
            setTimeout(function () {
              io.to(socket.PLAYER_INFO.roomID).emit("choosingWord", current_room);
              io.sockets.emit("updateRoomInfo", all_room_info);
            }, 5000)

          } else {
            io.to(socket.PLAYER_INFO.roomID).emit("choosingWord", current_room);
            io.sockets.emit("updateRoomInfo", all_room_info);
          }

        } else {

          if (current_room.game.currentRound !== current_room.rounds) { //If it's not the last round
            current_room.game.currentRound++;
            drawerIndex = 0;
            current_room.game.drawer = current_room.scoreBoard[drawerIndex].userName;
            current_room.game.status = "ChoosingWord"
            all_room_info[current_index] = current_room

            if (show_leaderBoard) {
              setTimeout(function () {
                io.to(socket.PLAYER_INFO.roomID).emit("choosingWord", current_room);
                io.sockets.emit("updateRoomInfo", all_room_info);
              }, 5000)
            } else {
              io.to(socket.PLAYER_INFO.roomID).emit("choosingWord", current_room);
              io.sockets.emit("updateRoomInfo", all_room_info);
            }
          } else {
            current_room.globalStatus = "finished";
            current_room.game.status = "ChoosingWord";
            all_room_info[current_index] = current_room;
            console.log("Room", current_room.roomID, "End the game")
            setTimeout(function () {
              io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
              io.sockets.emit("updateRoomInfo", all_room_info);
            }, 5000)
            var records = [];
            const playersToSort = current_room.scoreBoard;
            playersToSort.sort((a, b) => b.score - a.score);
            for (var i = 0; i < playersToSort.length; i++) {
              records.push({
                userName: playersToSort[i].userName,
                rank: i + 1,
                players: current_room.currentPlayers,
                score: playersToSort[i].score,
                time: new Date()
              })
            }
            db.collection("records").insertMany(records);
          }
        }
      } else {
        //TODO: Drawer left the room
        console.log("[ERROR] Drawer left the room")
      }
    }
    socket.on('startTimer', (roomID) => {
      if (socket.PLAYER_INFO.roomID === roomID) {
        globalTimer = setInterval(() => {
          seconds--;
          io.sockets.to(roomID).emit('timer', seconds);

          if (seconds <= 0) {
            clearInterval(globalTimer);
            seconds = 60;
            var temp_data = get_current_room_by_id(all_room_info, roomID);
            const current_room = temp_data.current_room;
            const current_index = temp_data.current_index;

            if (current_room) {
              const drawerScore = Math.min(10 * current_room.game.num_of_right, 40)
              for (var i = 0; i < current_room.scoreBoard.length; i++) {
                if (current_room.scoreBoard[i].userName == current_room.game.drawer) {
                  current_room.scoreBoard[i].score += drawerScore
                }
              }
              current_room.game.status = "finished"
              current_room.game.num_of_right = 0
              const message = {
                type: "info",
                content:"The correct answer is: "+current_room.game.word
              }
              current_room.messages.push(message)
              all_room_info[current_index] = current_room
              io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
              io.sockets.emit("updateRoomInfo", all_room_info);
              changeDrawer(current_room.roomID, all_room_info, true)
              io.sockets.to(roomID).emit("clearCanvas")
            }
          }
        }, 1000)
      }
    }),

      socket.on('finishedTimer', (data) => {
        if (socket.PLAYER_INFO.roomID === data.roomID) {
          var temp_data = get_current_room_by_id(all_room_info, data.roomID)
          const current_room = temp_data.current_room;
          const current_index = temp_data.current_index;
          clearInterval(globalTimer);
          if (current_room) {
            const drawerScore = Math.min(10 * current_room.game.num_of_right, 40)
            for (var i = 0; i < current_room.scoreBoard.length; i++) {
              if (current_room.scoreBoard[i].userName == current_room.game.drawer) {
                current_room.scoreBoard[i].score += drawerScore
              }
            }
            current_room.game.status = "finished"
            current_room.game.num_of_right = 0
            const message = {
              type: "info",
              content:"The correct answer is: " + current_room.game.word
            }
            current_room.messages.push(message)
            all_room_info[current_index] = current_room
            io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
            io.sockets.emit("updateRoomInfo", all_room_info);
            changeDrawer(current_room.roomID, all_room_info, true)
            io.sockets.to(data.roomID).emit("clearCanvas")

          }
          seconds = 60;
        }
      }),

      socket.on('startSettingWord', (roomID) => {
        if (socket.PLAYER_INFO.roomID === roomID) {
          var temp_data = get_current_room_by_id(all_room_info, roomID)
          const current_room = temp_data.current_room;
          const current_index = temp_data.current_index;

          if (current_room) {
            wordTimer = setInterval(() => {
              settingWordsSeconds--;
              io.sockets.to(roomID).emit('settingWordTimer', settingWordsSeconds);

              if (settingWordsSeconds <= 0) {
                clearInterval(wordTimer);
                settingWordsSeconds = 10;
                changeDrawer(roomID, all_room_info, false)
              }
            }, 1000)
          }
        }
      }),
      socket.on('setWord', (data) => {
        if (socket.PLAYER_INFO.roomID === data.roomID) {
          var temp_data = get_current_room_by_id(all_room_info, data.roomID)
          const current_room = temp_data.current_room;
          const current_index = temp_data.current_index;
          clearInterval(wordTimer)
          settingWordsSeconds = 10;

          if (current_room) {
            current_room.game.status = "drawing";
            current_room.game.word = data.word;
            io.sockets.to(data.roomID).emit("drawing", current_room)
            all_room_info[current_index] = current_room
            io.sockets.emit("updateRoomInfo", all_room_info)

          } else {
            console.log("[ERROR]:Room Undefined")
          }
        }
      }),
      socket.on('forceStopTimer', () => {
        clearInterval(globalTimer);
        clearInterval(wordTimer);
        seconds = 60;
        settingWordsSeconds = 10;
      })
    socket.on('leaveRoom', (data) => {
      var temp_data = get_current_room_by_id(all_room_info, data.roomID)
      var current_room = temp_data.current_room;
      const current_index = temp_data.current_index;
      socket.leave(data.roomID)

      if (current_room) {
        current_room.currentPlayers--;
        if (current_room.currentPlayers == 0) { //If there are no players left in the room, delete the room.
          all_room_info.splice(current_index, 1)
          socket.leave(data.roomID)
          io.to(current_room.roomID).emit("updateCurrentRoomInfo", current_room)
          io.sockets.emit("updateRoomInfo", all_room_info);
          socket.emit('leave')
        } else {
          if (current_room.globalStatus === "playing") { //When exiting the room the game is being played
            if (current_room.currentPlayers === 1) {
              for (i = 0; i < current_room.scoreBoard.length; i++) {
                if (current_room.scoreBoard[i].userName == socket.PLAYER_INFO.userName) {
                  current_room.scoreBoard.splice(i, 1)
                }
              }
              socket.leave(data.roomID)
              seconds = 60;
              settingWordsSeconds = 10;
              current_room.globalStatus = "finished";
              current_room.game.status = "ChoosingWord";
              all_room_info[current_index] = current_room
              io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
              io.sockets.emit("updateRoomInfo", all_room_info);
              socket.emit('leave')
            } else if (current_room.game.drawer === socket.PLAYER_INFO.userName) {
              all_room_info[current_index] = current_room
              io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
              io.sockets.emit("updateRoomInfo", all_room_info);
              if (current_room) {
                const drawerScore = Math.min(10 * current_room.game.num_of_right, 40)
                for (var i = 0; i < current_room.scoreBoard.length; i++) {
                  if (current_room.scoreBoard[i].userName == current_room.game.drawer) {
                    current_room.scoreBoard[i].score += drawerScore
                  }
                }
                current_room.game.status = "finished"
                current_room.game.num_of_right = 0
                all_room_info[current_index] = current_room
                io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
                io.sockets.emit("updateRoomInfo", all_room_info);
                changeDrawer(current_room.roomID, all_room_info, true)
                io.sockets.to(data.roomID).emit("clearCanvas")
              }
              socket.emit('leave')
              current_room = all_room_info[current_index]

              for (i = 0; i < current_room.scoreBoard.length; i++) {
                if (current_room.scoreBoard[i].userName == socket.PLAYER_INFO.userName) {
                  current_room.scoreBoard.splice(i, 1)
                }
              }
              all_room_info[current_index] = current_room
              io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
              io.sockets.emit("updateRoomInfo", all_room_info);
            } else {
              socket.leave(data.roomID)
              for (i = 0; i < current_room.scoreBoard.length; i++) {
                if (current_room.scoreBoard[i].userName == socket.PLAYER_INFO.userName) {
                  current_room.scoreBoard.splice(i, 1)
                }
              }
              socket.emit('leave')
              all_room_info[current_index] = current_room
              io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
              io.sockets.emit("updateRoomInfo", all_room_info);
            }
          } else {
            for (i = 0; i < current_room.scoreBoard.length; i++) {
              if (current_room.scoreBoard[i].userName == socket.PLAYER_INFO.userName) {
                current_room.scoreBoard.splice(i, 1)
              }
            }
            socket.emit('leave')
            all_room_info[current_index] = current_room
            io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
            io.sockets.emit("updateRoomInfo", all_room_info);
          }
          if (current_room.host === socket.PLAYER_INFO.userName) {
            socket.leave(data.roomID)
            const randomIndex = randomNumber(0, current_room.scoreBoard.length - 1)
            current_room.host = current_room.scoreBoard[randomIndex].userName
            all_room_info[current_index] = current_room
            io.sockets.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
            io.sockets.emit("updateRoomInfo", all_room_info);
          }
        }
        socket.PLAYER_INFO.roomID = null
      }
    }),
      socket.on('disconnect', () => {
        if (socket.PLAYER_INFO) {
          for (i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i] === socket.PLAYER_INFO.userName) {
              onlineUsers.splice(i, 1)
            }
          }

          if (socket.PLAYER_INFO.roomID) {
            var temp_data = get_current_room_by_id(all_room_info, socket.PLAYER_INFO.roomID)
            var current_room = temp_data.current_room;
            const current_index = temp_data.current_index;
            socket.leave(socket.PLAYER_INFO.roomID)

            if (current_room) {
              if (current_room.game.drawer === socket.PLAYER_INFO.userName) {
                clearInterval(globalTimer)
              }
              current_room.currentPlayers--;
              if (current_room.currentPlayers == 0) { //If there are no players left in the room, delete the room.
                all_room_info.splice(current_index, 1)
                socket.leave(socket.PLAYER_INFO.roomID)
                io.to(current_room.roomID).emit("updateCurrentRoomInfo", current_room)
                io.sockets.emit("updateRoomInfo", all_room_info);
                socket.emit('leave')
              } else {
                if (current_room.globalStatus === "playing") { //When exiting the room the game is being played
                  if (current_room.currentPlayers === 1) {
                    for (i = 0; i < current_room.scoreBoard.length; i++) {
                      if (current_room.scoreBoard[i].userName == socket.PLAYER_INFO.userName) {
                        current_room.scoreBoard.splice(i, 1)
                      }
                    }
                    socket.leave(socket.PLAYER_INFO.roomID)

                    seconds = 60;
                    settingWordsSeconds = 10;
                    current_room.globalStatus = "finished";
                    current_room.game.status = "ChoosingWord";
                    all_room_info[current_index] = current_room
                    io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
                    io.sockets.emit("updateRoomInfo", all_room_info);
                    socket.emit('leave')
                  } else if (current_room.game.drawer === socket.PLAYER_INFO.userName) {
                    all_room_info[current_index] = current_room
                    io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
                    io.sockets.emit("updateRoomInfo", all_room_info);
                    if (current_room) {
                      const drawerScore = Math.min(10 * current_room.game.num_of_right, 40)
                      for (var i = 0; i < current_room.scoreBoard.length; i++) {
                        if (current_room.scoreBoard[i].userName == current_room.game.drawer) {
                          current_room.scoreBoard[i].score += drawerScore
                        }
                      }
                      current_room.game.status = "finished"
                      current_room.game.num_of_right = 0
                      all_room_info[current_index] = current_room
                      io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
                      io.sockets.emit("updateRoomInfo", all_room_info);
                      changeDrawer(current_room.roomID, all_room_info, true)
                      io.sockets.to(socket.PLAYER_INFO.roomID).emit("clearCanvas")
                    }
                    socket.emit('leave')
                    current_room = all_room_info[current_index]

                    for (i = 0; i < current_room.scoreBoard.length; i++) {
                      if (current_room.scoreBoard[i].userName == socket.PLAYER_INFO.userName) {
                        current_room.scoreBoard.splice(i, 1)
                      }
                    }
                    all_room_info[current_index] = current_room
                    io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
                    io.sockets.emit("updateRoomInfo", all_room_info);
                  } else {
                    socket.leave(socket.PLAYER_INFO.roomID)
                    for (i = 0; i < current_room.scoreBoard.length; i++) {
                      if (current_room.scoreBoard[i].userName == socket.PLAYER_INFO.userName) {
                        current_room.scoreBoard.splice(i, 1)
                      }
                    }
                    socket.emit('leave')
                    all_room_info[current_index] = current_room
                    io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
                    io.sockets.emit("updateRoomInfo", all_room_info);
                  }
                } else {
                  for (i = 0; i < current_room.scoreBoard.length; i++) {
                    if (current_room.scoreBoard[i].userName == socket.PLAYER_INFO.userName) {
                      current_room.scoreBoard.splice(i, 1)
                    }
                  }
                  socket.emit('leave')
                  all_room_info[current_index] = current_room
                  io.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
                  io.sockets.emit("updateRoomInfo", all_room_info);
                }
                if (current_room.host === socket.PLAYER_INFO.userName) {
                  socket.leave(socket.PLAYER_INFO.roomID)
                  const randomIndex = randomNumber(0, current_room.scoreBoard.length - 1)
                  current_room.host = current_room.scoreBoard[randomIndex].userName
                  all_room_info[current_index] = current_room
                  io.sockets.to(socket.PLAYER_INFO.roomID).emit("updateCurrentRoomInfo", current_room);
                  io.sockets.emit("updateRoomInfo", all_room_info);
                }
              }
            }
            socket.PLAYER_INFO.roomID = null;
          }
        }
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
              current_room.scoreBoard[user_index].right = true;
              const score = Math.max(60 - (current_room.game.num_of_right * 10), 10);
              current_room.scoreBoard[user_index].score += score;
              const new_msg = { user: socket.PLAYER_INFO.userName, type: 'ans' };
              current_room.messages.push(new_msg);
              all_room_info[current_index] = current_room;
              io.to(socket.PLAYER_INFO.roomID).emit("userGotRightAns", current_room);
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
  },
}