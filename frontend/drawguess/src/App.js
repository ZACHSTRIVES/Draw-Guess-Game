import logo from './logo.svg';
import './App.css';
import Lobby from './components/lobby/lobby';
import Public from './components/lobby/publicroom';


const rooms = [
  { 'id': 0,
    'name': 'RoomName1',
    'number': 'Room1',
    'player': '2/6',
   },
   { 'id': 1,
      'name': 'RoomName2',
      'number': 'Room2',
      'player': '5/6',
   },
   { 'id': 2,
     'name': 'RoomName3',
     'number': 'Room3',
     'player': '4/6',
    }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DrawGuess</h1>
        <Lobby></Lobby>
        <Public rooms={rooms}></Public>
      </header>
    </div>
  );
}

export default App;
