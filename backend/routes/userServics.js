const md5 = require('md5')
var dateTime = require('silly-datetime');

function compare(param) {
  return function (m, n) {
    var a = m[param];
    var b = n[param];
    return b - a;
  }
}

module.exports = {
  userLogin: function (app, socket, all_room_info, initdata, all_users, database, onlineUsers) {
    function CheckIfTheUserIsLoggedIn(userName) {
      if (onlineUsers.indexOf(userName) === -1) {
        return false;
      } else {
        return true;
      }
    }
    socket.on('login', function (data) {
      var query = { email: data.flag }
      database.collection("users").find(query).toArray(function (err, result) {
        if (err) throw err;

        if (result.length === 0) {
          query = { userName: data.flag }
          database.collection("users").find(query).toArray(function (err, res) {
            if (err) throw err;
            if (res.length === 0) {
              socket.emit("loginFailed", "UserNotExists")

            } else {
              if (res[0].password === md5(data.password)) {
                if (CheckIfTheUserIsLoggedIn(res[0].userName)) {
                  socket.emit("loginFailed", "alreadyOnline")
                } else {
                  onlineUsers.push(res[0].userName)
                  socket.emit("loginResponse", "loginSuccess")
                  all_users.push({
                    userName: res[0].userName,
                    socket: socket
                  })
                  console.log(res[0].userName, "has logged in successfully")
                  data = { userName: res[0].userName, initdata: initdata }
                  socket.emit('loginSuccess', data)
                  const playerInfo = { userName: res[0].userName }
                  socket.PLAYER_INFO = playerInfo
                }
              } else {
                socket.emit("loginFailed", "passwordInvalid")
              }
            }
          })
        } else {
          if (result[0].password === md5(data.password)) {
            if (CheckIfTheUserIsLoggedIn(result[0].userName)) {
              socket.emit("loginFailed", "alreadyOnline")
            } else {
              onlineUsers.push(result[0].userName)
              socket.emit("loginResponse", "loginSuccess")
              all_users.push({
                userName: result[0].userName,
                socket: socket
              })
              /*login success*/
              console.log(result[0].userName, "has logged in successfully")
              data = { userName: result[0].userName, initdata: initdata }
              socket.emit('loginSuccess', data)
              const playerInfo = { userName: result[0].userName }
              socket.PLAYER_INFO = playerInfo
            }
          } else {
            socket.emit("loginFailed", "passwordInvalid")
          }
        }
      })
    }),
    socket.on("autoLogin", function (userName) {
      if (CheckIfTheUserIsLoggedIn(userName)) {
        socket.emit('autoLoginFailed')
      } else {
        socket.emit('autoLoginSuccess')
        onlineUsers.push(userName)
        const playerInfo = { userName: userName }
        socket.PLAYER_INFO = playerInfo
      }
    })
  },
  userRegister: function (socket, io, database) {
    socket.on('register', function (data) {
      var query = { userName: data.userName };
      database.collection("users").find(query).toArray(function (err, result) { //Check if the user name already exists?
        if (err) throw err;
        if (result.length === 0) {
          const query1 = { email: data.email }
          database.collection("users").find(query1).toArray(function (err, res) { //Check if the email already exists?
            if (err) throw err;
            if (res.length === 0) {
              const new_user = { userName: data.userName, password: md5(data.password), email: data.email } //Encrypted password
              database.collection("users").insertOne(new_user, function (err, res) {
                if (err) throw err;
                socket.emit("registerResponse", "success")
              });

            } else {
              socket.emit("registerResponse", "emailExisting")
            }
          })
        } else {
          socket.emit("registerResponse", "userNameExisting")
        }
      });
    })
  },

  getGameStats: function (socket, database) {
    socket.on('gameStats', function (userName) {
      const query = { userName: userName }
      database.collection("records").find(query).sort("time", -1).toArray(function (err, result) {
        if (err) throw err;
        var stats = {
          rounds: result.length,
          firstRanks: 0,
          secondRanks: 0,
          thirdRanks: 0,
          firstRate: 0,
          secondRate: 0,
          thirdRate: 0,
          history: result,
          highestScore: "N/A",
          highestScoreDate: "N/A"
        };
        var scores = [0];

        for (i = 0; i < result.length; i++) {
          stats.history[i].time = dateTime.format(result[i].time, 'YYYY-MM-DD HH:mm');
          scores.push(stats.history[i].score)
          if (result[i].rank === 1) {
            stats.firstRanks = stats.firstRanks + 1;
          } else if (result[i].rank === 2) {
            stats.secondRanks = stats.secondRanks + 1;
          } else if (result[i].rank === 3) {
            stats.thirdRanks = stats.thirdRanks + 1;
          }
        }
        if (stats.firstRanks !== 0) {
          stats.firstRate = Math.ceil((stats.firstRanks / stats.rounds) * 100);
        }
        if (stats.secondRanks !== 0) {
          stats.secondRate = Math.ceil((stats.secondRanks / stats.rounds) * 100);
        }
        if (stats.thirdRanks !== 0) {
          stats.thirdRate = Math.ceil((stats.thirdRanks / stats.rounds) * 100);
        }

        if (result.length !== 0) {
          stats.history.sort(compare("score"));
          stats.highestScore = stats.history[0].score;
          stats.highestScoreDate = stats.history[0].time;
        }
        socket.emit("setStats", stats);
      })
    });
  },
}