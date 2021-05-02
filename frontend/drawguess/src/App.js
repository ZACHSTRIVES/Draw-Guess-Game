import logo from './static/logo.png';
import './App.css';
import Lobby from './components/lobby/lobby';
// import Login from './components/login/login.js'
import Game from './components/game';
import io from 'socket.io-client'
import axios from 'axios'
import React from 'react';
import Test  from'./components/testroom';
import Register from './components/register';
import Login from './components/login';
import TestLogin from './components/testLogin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";


const instance = axios.create({
  baseURL: 'https://localhost:8000/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});




const socket = io('ws://localhost:8000')

function App() {
  const [userName, setUserName] = React.useState(null)
  const [initData, setInitData] = React.useState(null)

  function handleLogin(username, initData) {
    console.log(username, initData)
    setUserName(username);
    setInitData(initData)
  }

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
                  <Lobby socket={socket} userName={userName} initData={initData}></Lobby>
                </header>
              </div>

            }

          </Route>

          <Route exact path='/register'>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="logo"></img>
                <Register></Register>
              </header>
            </div>
          </Route>

          <Route exact path='/login'>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="logo"></img>
                <Login/>
              </header>
            </div>
          </Route>

          {/* <Route exact path='/login'>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="logo"></img>
                <Login socket={socket} handleLogin={handleLogin}></Login>
              </header>
            </div>
          </Route> */}
          

          <Route path='/room/'>
            {userName === null ? <Redirect to="/login" /> :
              <div className="App game-room">
                <Game socket={socket} userName={userName} />
              </div>
            }
          </Route>

          <Route path='/test/'>
            <Test socket={socket}></Test>
          </Route>
          <Route path='/test2/'>
            <TestLogin socket={socket}></TestLogin>
          </Route>

        </div>




      </Switch>
    </Router>


  );
}

export default App;
