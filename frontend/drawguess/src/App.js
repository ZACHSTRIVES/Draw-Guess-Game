import logo from './static/logo.gif';
import './App.css';
import Lobby from './components/lobby/lobby';
import Public from './components/lobby/roomList';
import io from 'socket.io-client'
import axios from 'axios'
import React from 'react';

const instance = axios.create({
  baseURL: 'https://localhost:8000/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});



const socket = io('ws://localhost:8000')

function App() {

  return (
    <div className="App">
      <header className="App-header">
      {/* <img src={logo} className="logo"></img> */}
      <h1>Draw&Guess</h1>
        <Lobby socket={socket}></Lobby>
      </header>
    </div>
  );
}

export default App;
