import logo from './static/logo.png';
import './App.css';
import Lobby from './components/lobby/lobby';
// import Login from './components/login/login.js'
import Game from './components/game';
import io from 'socket.io-client'
import axios from 'axios'
import React from 'react';
import Test from './components/testroom';
import Register from './components/register';
import Login from './components/login';
import TestLogin from './components/testLogin';
import { AppContext } from "./libs/contextLib";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useParams
} from "react-router-dom";


const instance = axios.create({
  baseURL: 'https://localhost:8000/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});




const socket = io('ws://localhost:8000')

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName'))
  const [rooms, setRooms] = React.useState([])

  function handleLogin(username, initData) {
    console.log(username, initData)
    setUserName(username);
    setRooms(initData.rooms)
  }

  function checkRoom(id) {
    const room = null;
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].roomID) {
        room = rooms[i]
      }
    }
  }
  React.useEffect(() => {
    socket.on('user_on_connection', (data) => {
      setRooms(data.rooms)
      console.log(rooms)
    })
  }, []);
  React.useEffect(() => {
    socket.on('updateRoomInfo', (data) => {   //Listen for "Create Room"
      console.log("Listen for 'Create Room'")
      setRooms(data)
    })
  }, []);


  return (
    <Router>
      <Switch>
        <div>
          <Route exact path='/'>
            {/* {userName === null ? <Redirect to="/login" /> : */}
            {userName === null ? <Redirect to="/login" /> :

              <div className="App">
                <header className="App-header">
                  <img src={logo} className="logo"></img>
                  <Lobby socket={socket} userName={userName} rooms={rooms}></Lobby>
                </header>
              </div>

            }

          </Route>

          <Route exact path='/register'>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="logo"></img>
                <Register socket={socket}></Register>
              </header>
            </div>
          </Route>

          <Route exact path='/login'>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="logo"></img>
                <Login socket={socket} handleLogin={handleLogin} />
              </header>
            </div>
          </Route>



          <Route path='/room/:id'>
            {(() => {

              if (userName === null) {
                return <Redirect to="/login" />
              } else {
                return (<div className="App game-room">
                  <Game socket={socket} userName={userName} />
                </div>)
              }

            })()}
          </Route>

          <Route path='/test/'>
            <Test socket={socket}></Test>
          </Route>

        </div>




      </Switch>
    </Router>


  );
}

export default App;
