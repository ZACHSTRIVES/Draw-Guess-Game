import "./App.css";
import Canvas from "./components/canvas";

function App() {
  return (
    <div className="App">
      <div className="room">        
        <Canvas />        
        <div className="sidebar"></div>
      </div>
    </div>
  );
}

export default App;
