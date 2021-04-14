all_room_ID=[]
module.exports = function(app,db,socket) {
  socket.on('create_room', function(room){
    var tempID = parseInt(Math.random() * 9999).toString(); // The temporary room id
    while (all_room_ID.indexOf(tempID) >= 0) { // Determine if there is a duplicate ID
        tempID = parseInt(Math.random() * 9999).toString();
    }
    all_room_ID.push(tempID)
    room.roomID=tempID;

    console.log("Create Room:",room)
    db.collection('rooms').insertOne(room, (err, result) => {
      if (err) { 
        console.log({ 'error': 'An error has occurred' }); 
      } else{
        var query= db.collection('rooms').find().toArray(function(err, result) { 
          //如果存在错误
          if(err)
          {
              console.log('Error:'+ err);
              return;
          } 
          //调用传入的回调方法，将操作结果返回
          socket.emit('create_room',result)
          socket.broadcast.emit('create_room',result)
      
          });
        
      }
    });
     });

  };
