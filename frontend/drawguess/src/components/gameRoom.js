import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Canvas from './canvas';
import Chat from './chat';
import './gameRoom.css';
import {
  Redirect,useLocation

} from "react-router-dom";

// socket.emit("UserJoin",data)


export default function GameRoom({ socket, userName,init_room }) {
  let location = useLocation();
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

  const dense = false;
  const secondary = false;


  return (
    <div className="room container rounded-rect">
      <div className="title rounded-rect border">
        <h5 className="title">{roomInfo.roomName}</h5>
      </div>
      <div className="canvas rounded-rect border">
        <Canvas />
      </div>
      <div className="round rounded-rect border">
        <h5 className="title">ROUND</h5>
        <ul>
          {roomInfo.scoreBoard.map((player, index) =>
            <li key={index} alignItems="flex-start">
              <div className="player">
                <List dense={dense}>
                  <ListItem>
                    <ListItemText
                      primary={player.userName}
                      secondary={secondary ? 'Secondary text' : null}
                    />
                    <ListItemText
                      edge="end"
                      primary={player.score}
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                </List>
              </div>
            </li>)}
        </ul>
      </div>
      <div className="message rounded-rect border">
        <h5 className="title">MESSAGE</h5>
        <Chat socket={socket} userName={userName} room={roomInfo}/>
      </div>
    </div>
  );
}