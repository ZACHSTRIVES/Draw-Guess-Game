import React from 'react';
import Canvas from './canvas';
import Chat from './chat';
import './room.css';
import {
  Redirect,useLocation

} from "react-router-dom";

// socket.emit("UserJoin",data)


export default function GameRoom({ socket, userName,init_room }) {
  const [roomInfo, setRoomInfo] = React.useState(init_room)
  React.useEffect(() => {
    socket.on('newUserJoinRoom', (data) => { 
      console.log(data)
     setRoomInfo(data.roomInfo)
    
    })
    
  }, []);
  React.useEffect(() => {
    socket.on('updateCurrentRoomInfo', (data) => { 
     setRoomInfo(data)
    
    })
    
  }, []);

  return (
    <div className="root container">
      <div className="title border">
        <h5 className="title">{roomInfo.roomName}</h5>
      </div>
      <div className="canvas border">
        <Canvas />
      </div>
      <div className="round border">
        <h5 className="title">ROUND</h5>
        <ul>
          {roomInfo.scoreBoard.map((player, index) =>
            <li className="flex-between" key={index}>
              <div>{player.userName}</div><div>{player.score}</div> 
            </li>)}
        </ul>
      </div>
      <div className="message border">
        <h5 className="title">CHATBOX</h5>
        <Chat socket={socket} userName={userName} room={roomInfo}/>
      </div>
    </div>
  );
}