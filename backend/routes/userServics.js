var users=[]
module.exports={
    userLogin:function(app,socket,all_room_info,initdata,all_users){
        socket.on('login',function(username){
            var isNewPerson = true; 
            for(var i=0;i<users.length;i++){
                if(users[i].username === username){  //Check for duplicate user names
                      isNewPerson = false
                      break;
                }else{
                      isNewPerson = true
                }
            }
            if(isNewPerson){
                username = username
                users.push({
                  username:username
                })
                all_users.push({
                    userName:username,
                    socket:socket
                })
                /*login success*/
                console.log(username, "has logged in successfully")
                data={username:username,initdata:initdata}
                socket.emit('loginSuccess',data)
            }else{
                /*login fail*/
                socket.emit('loginFail','')
                console.log(username, "failed to log in [Error:duplicate user name!]")
            }  
        })

    }
}