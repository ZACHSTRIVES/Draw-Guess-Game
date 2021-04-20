import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Canvas from './canvas';
import Chat from './chat';
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
    socket.on('updatCurrentRoomInfo', (data) => { 
     setRoomInfo(data)
    
    })
    
  }, []);

  const dense = false;
  const secondary = false;


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
      <div className="message border">
        <h5 className="title">MESSAGE</h5>
        <Chat socket={socket} />
      </div>
    </div>
  );
}