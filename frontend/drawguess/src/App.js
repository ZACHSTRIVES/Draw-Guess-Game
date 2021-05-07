import logo from './static/logo.png';
import './App.css';
import Lobby from './components/lobby/lobby';
import Game from './components/game';
import io from 'socket.io-client'
import axios from 'axios'
import React from 'react';
import Register from './components/register';
import Login from './components/login';


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
    })
  }, []);
  React.useEffect(() => {
    socket.on('updateRoomInfo', (data) => {   //Listen for "Create Room"
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
                <header className="App-header main-background">
                  <img src={logo} className="logo"></img>
                  <Lobby socket={socket} userName={userName} rooms={rooms}></Lobby>
                </header>
              </div>

            }

          </Route>

          <Route exact path='/register'>
            <div className="App">
              <header className="App-header main-background">
                <img src={logo} className="logo"></img>
                <Register socket={socket}></Register>
              </header>
            </div>
          </Route>

          <Route exact path='/login'>
            <div className="App">
              <header className="App-header main-background">
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
                return (<div className="App main-background">
                  <Game socket={socket} userName={userName} />
                </div>)
              }

            })()}
          </Route>

         

        </div>




      </Switch>
    </Router>


  );
}

export default App;
