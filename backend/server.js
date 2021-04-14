const express        = require('express');
var MongoClient = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
var cors = require('cors');

var server =require('http').createServer(app);
const io = require('socket.io')(server,{cors:{
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}})

app.use(cors())
const port = 8000;

var current_users=0

// app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
                      
  // Make sure you add the database name and not the collection name
  database = database.db("drawguess")
  io.on('connection', function(socket){
    current_users++;
    var query= database.collection('rooms').find().toArray(function(err, result) { 
      //如果存在错误
      if(err)
      {
          console.log('Error:'+ err);
          return;
      } 
      //调用传入的回调方法，将操作结果返回
      const init_data={rooms:result,current_users:current_users}
      socket.emit('user_on_conection',init_data)
      socket.broadcast.emit('user_on_conection',init_data);
  
      });
  



    console.log("User Connected, Current Online: ",current_users)
    require('./routes')(app,database,socket);

    socket.on('disconnect', function () {
      current_users--;
      socket.emit('disconnected',current_users)
      socket.broadcast.emit('disconnected',current_users);
      console.log("User Disconnected, Current Online: ",current_users)
      

  });
    
  });
  require("./apis")(app,database);
 
  server.listen(port, () => {
    console.log('We are live on ' + port);
  
  });               
})