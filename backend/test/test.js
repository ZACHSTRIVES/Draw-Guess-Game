const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const db = require('../config/db');
const md5 = require('md5')
var MongoClient = require('mongodb').MongoClient;

jest.setTimeout(30000);


describe("Draw Guess Game", () => {
  let io, serverSocket, clientSocket, database, connection;

  beforeAll(async (done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    connection = await MongoClient.connect(db.url, {
      useNewUrlParser: true,
    });

    database = await connection.db("drawguess");
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);

    })
    await database.collection("users").deleteOne({userName:"TestUser"})
  });

  afterAll(async () => {
    await database.collection("users").deleteOne({userName:"TestUser"})
    io.close();
    clientSocket.close();
    await connection.close();
    await database.close();
  });


  test("[userService] Player login (Success)", async (done) => {
    serverSocket.on('login', async (data) => {
      var query = { userName: data.userName }

      const result = await database.collection("users").find(query).toArray()
      if (result.length !== 0) {
        if (result[0].password === md5(data.password)) {
          serverSocket.emit("loginResponse", "loginSuccess")
        } else {
          serverSocket.emit("loginResponse", "passwordInvalid")
        }
      } else {
        serverSocket.emit("loginResponse", "emailInvalid")
      }

    })

    clientSocket.on("loginResponse", function (res){
      expect(res).toBe("loginSuccess");
      done();
    })
    clientSocket.emit("login", { userName: "Zach", password: "123" });
  });

  test("[userService] Player login (Wrong Password)", async (done) => {
    serverSocket.on('login2', async (data) => {
      var query = { userName: data.userName }

      const result = await database.collection("users").find(query).toArray()
      if (result.length !== 0) {
        if (result[0].password === md5(data.password)) {
          serverSocket.emit("loginResponse2", "loginSuccess")
        } else {
          serverSocket.emit("loginResponse2", "passwordInvalid")
        }
      } else {
        serverSocket.emit("loginResponse2", "emailInvalid")
      }

    })

    clientSocket.on("loginResponse2", function (res){
      expect(res).toBe("passwordInvalid");
      done();
    })
    clientSocket.emit("login2", { userName: "Zach", password: "123678" });
  });

  test("[userService] Player login (User does not exist)", async (done) => {
    serverSocket.on('login3', async (data) => {
      var query = { userName: data.userName }

      const result = await database.collection("users").find(query).toArray()
      if (result.length !== 0) {
        if (result[0].password === md5(data.password)) {
          serverSocket.emit("loginResponse3", "loginSuccess")
        } else {
          serverSocket.emit("loginResponse3", "passwordInvalid")
        }
      } else {
        serverSocket.emit("loginResponse3", "userInvalid")
      }

    })

    clientSocket.on("loginResponse3", function (res){
      expect(res).toBe("userInvalid");
      done();
    })
    clientSocket.emit("login3", { userName: "Zachh", password: "123" });
  });


  test("[userService] Register (Success)", async (done) => {
    serverSocket.on('register', async (data)=> {

      var queryUserName = { userName: data.userName };
      var queryEmail = {email:data.email};
      const isUserExist= await  database.collection("users").find(queryUserName).toArray();
      const isEmailExist = await database.collection("users").find(queryEmail).toArray()
      if(isUserExist.length!==0){
        serverSocket.emit("registerResponse", "userNameExisting")
      }else if(isEmailExist.length!==0){
        serverSocket.emit("registerResponse", "emailExisting")

      }else{
        const new_user = { userName: data.userName, password: md5(data.password), email: data.email }
        await database.collection("users").insertOne(new_user)
        serverSocket.emit("registerResponse", "success")
      } 

    })
      
    clientSocket.on("registerResponse",(res)=>{
      expect(res).toBe("success");
      done();
    })

    clientSocket.emit("register",{userName:"TestUser",email:"test@test.com",password:"123"})
  });

  test("[userService] Register (Username already exists)", async (done) => {
    serverSocket.on('register2', async (data)=> {

      var queryUserName = { userName: data.userName };
      var queryEmail = {email:data.email};
      const isUserExist= await  database.collection("users").find(queryUserName).toArray();
      const isEmailExist = await database.collection("users").find(queryEmail).toArray()
      if(isUserExist.length!==0){
        serverSocket.emit("registerResponse2", "userNameExisting")
      }else if(isEmailExist.length!==0){
        serverSocket.emit("registerResponse2", "emailExisting")

      }else{
        const new_user = { userName: data.userName, password: md5(data.password), email: data.email }
        await database.collection("users").insertOne(new_user)
        serverSocket.emit("registerResponse2", "success")
      } 

    })
      
    clientSocket.on("registerResponse2",(res)=>{
      expect(res).toBe("userNameExisting");
      done();
    })

    clientSocket.emit("register2",{userName:"TestUser",email:"test123@test.com",password:"123"})
  });

  test("[userService] Register (Email already exists)", async (done) => {
    serverSocket.on('register3', async (data)=> {

      var queryUserName = { userName: data.userName };
      var queryEmail = {email:data.email};
      const isUserExist= await  database.collection("users").find(queryUserName).toArray();
      const isEmailExist = await database.collection("users").find(queryEmail).toArray()
      if(isUserExist.length!==0){
        serverSocket.emit("registerResponse3", "userNameExisting")
      }else if(isEmailExist.length!==0){
        serverSocket.emit("registerResponse3", "emailExisting")

      }else{
        const new_user = { userName: data.userName, password: md5(data.password), email: data.email }
        await database.collection("users").insertOne(new_user)
        serverSocket.emit("registerResponse3", "success")
      } 

    })
      
    clientSocket.on("registerResponse3",(res)=>{
      expect(res).toBe("emailExisting");
      done();
    })

    clientSocket.emit("register3",{userName:"TestUser1",email:"test@test.com",password:"123"})
  });

  test("[gameService] Create Room", async (done) => {
    var rooms=[];
    serverSocket.on("createRoom",(room)=>{
      rooms.push(room);
      serverSocket.emit("creatRoomResponse","success")
    });

    clientSocket.on("creatRoomResponse",(res)=>{
      expect(res).toBe("success");
      done();
    });

    clientSocket.emit("createRoom",{roomID:"0001",roomName:"Mock Room"});
  });

  test("[gameService] Join Room", async (done) => {
    var rooms=[{roomID:"0001",roomName:"Mock Room"}];
    serverSocket.on("joinRoom",(roomID)=>{
      
      var room=null;
      for (i=0;i<rooms.length;i++){
        if(rooms[i].roomID===roomID){
           room=rooms[i]
        }
      }
      
      if(room){
        serverSocket.join(roomID);
        serverSocket.emit("JoinRoomResponse","success")

      }else{
        serverSocket.emit("JoinRoomResponse","unsuccess")
      }
    });

    clientSocket.on("JoinRoomResponse",(res)=>{
      expect(res).toBe("success");
      done();
    });

    clientSocket.emit("joinRoom","0001");
  });





});

