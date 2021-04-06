import logo from './logo.svg';
import './App.css';
import Lobby from './components/lobby/lobby';
import Public from './components/lobby/publicroom';
import io from 'socket.io-client'

const socket = io('ws://localhost:8000')

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DrawGuess</h1>
        <Lobby socket={socket}></Lobby>
      </header>
    </div>
  );
}

export default App;
