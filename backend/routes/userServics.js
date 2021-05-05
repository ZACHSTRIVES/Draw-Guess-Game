const md5 = require('md5')
module.exports = {
    userLogin: function (app, socket, all_room_info, initdata, all_users, database) {
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
                                socket.emit("loginResponse", "loginSuccess")
                                all_users.push({
                                    userName: res[0].userName,
                                    socket: socket
                                })
                                /*login success*/
                                console.log(res[0].userName, "has logged in successfully")
                                data = { userName: res[0].userName, initdata: initdata }
                                socket.emit('loginSuccess', data)

                            } else {
                                socket.emit("loginFailed", "passwordInvalid")
                            }

                        }
                    })
                } else {
                    if (result[0].password === md5(data.password)) {
                        socket.emit("loginResponse", "loginSuccess")
                        all_users.push({
                            userName: result[0].userName,
                            socket: socket
                        })
                        /*login success*/
                        console.log(result[0].userName, "has logged in successfully")
                        data = { userName: result[0].userName, initdata: initdata }
                        socket.emit('loginSuccess', data)

                    } else {
                        socket.emit("loginFailed", "passwordInvalid")
                    }


                }
            })
        })

    },
    userRegister: function (socket, io, database) {
        socket.on('register', function (data) {
            console.log(data)
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

    }
}