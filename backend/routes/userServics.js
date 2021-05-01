var users = []
const md5 = require('md5')
module.exports = {
    userLogin: function (app, socket, all_room_info, initdata, all_users) {
    
    
        socket.on('login', function (username) {
            var isNewPerson = true;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username) {  //Check for duplicate user names
                    isNewPerson = false
                    break;
                } else {
                    isNewPerson = true
                }
            }
            if (isNewPerson) {
                username = username
                users.push({
                    username: username
                })
                all_users.push({
                    userName: username,
                    socket: socket
                })
                /*login success*/
                console.log(username, "has logged in successfully")
                data = { username: username, initdata: initdata }
                socket.emit('loginSuccess', data)
            } else {
                /*login fail*/
                socket.emit('loginFail', '')
                console.log(username, "failed to log in [Error:duplicate user name!]")
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
    // testLogin: function(socket,io,database){
    //     socket.on('testLogin',function(data){
    //         var query={email:data.email}
    //         database.collection("users").findOne(query).toArray(function(err,result){
    //             if (err) throw err;
    //             if(result.length!==0){
    //                 console.log()


    //             }
    //         })
    //     })
    // }
}