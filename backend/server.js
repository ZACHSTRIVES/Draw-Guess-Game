const express = require('express');
var MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');

var server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
const port = 8000;

var all_room_info = []
var all_users = []
var onlineUsers = [];

MongoClient.connect(db.url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err)

  // Make sure you add the database name and not the collection name
  database = database.db("drawguess")
  io.on('connection', function (socket) {
    //调用传入的回调方法，将操作结果返回
    const init_data = { rooms: all_room_info }
    setTimeout(function () {

      socket.emit('user_on_connection', init_data)
    }, 200)

    socket.emit('user_on_connection', init_data)
    console.log("User Connected")
    require('./routes')(app, socket, all_room_info, init_data, all_users, io, database, onlineUsers);
  });

  server.listen(port, () => {
    console.log('We are live on ' + port);
  });
})