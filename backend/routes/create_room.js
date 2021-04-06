module.exports = function(app,db,socket) {
  socket.on('create_room', function(room){
    console.log("Create Room:",room)
    db.collection('rooms').insertOne(room, (err, result) => {
      if (err) { 
        console.log({ 'error': 'An error has occurred' }); 
      } else {
        console.log(result.ops[0]);
      }
    });
     })
     

  };
