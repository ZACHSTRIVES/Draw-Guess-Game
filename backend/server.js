const express        = require('express');
var MongoClient = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
var server =require('http').createServer(app);
const io = require('socket.io')(server,{cors:{
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}})

const port = 8000;

// app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
                      
  // Make sure you add the database name and not the collection name
  database = database.db("drawguess")
  io.on('connection', function(socket){
    console.log("User Connected")
    require('./routes')(app,database,socket);





    

  });
 
  server.listen(port, () => {
    console.log('We are live on ' + port);
  
  });               
})