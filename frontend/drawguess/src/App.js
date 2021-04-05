import logo from './logo.svg';
import './App.css';
import Lobby from './components/lobby/lobby';
import Public from './components/lobby/publicroom';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DrawGuess</h1>
        <Lobby></Lobby>
      </header>
    </div>
  );
}

export default App;
