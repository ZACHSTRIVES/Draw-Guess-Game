import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Canvas from './canvas';
import Chat from './chat';
import './gameRoom.css';
import {
  Redirect, useLocation,useHistory, Link

} from "react-router-dom";

// socket.emit("UserJoin",data)


export default function GameRoom({ socket, userName, init_room }) {
  let location = useLocation();


  const [roomInfo, setRoomInfo] = React.useState(init_room)
  const history = useHistory()

  React.useEffect(() => {
    socket.on('newUserJoinRoom', (data) => {
      console.log(data)
      setRoomInfo(data.roomInfo);

    })

  }, []);

  React.useEffect(() => {
    socket.on('updateCurrentRoomInfo', (data) => {
      setRoomInfo(data);
      console.log(data)

    })
  }, []);

  React.useEffect(() => {
    socket.on('choosingWord', (data) => {
      setRoomInfo(data);
      if (data.game.drawer === userName) {
        socket.emit("startSettingWord", roomInfo.roomID);
      }

    })
  }, []);

  React.useEffect(() => {
    socket.on('drawing', (data) => {
      setRoomInfo(data);
      if (data.game.drawer === userName) {
        socket.emit("startTimer", roomInfo.roomID);
      }

    })
  }, []);

  React.useEffect(() => {
    socket.on('userGotRightAns', (data) => {
      setRoomInfo(data);
      if ((data.game.drawer === userName) && (data.game.num_of_right === data.currentPlayers - 1)) {  
        socket.emit('finishedTimer',data)
      }

    })
  }, []);





  function handleLeaveRoom(){
    if(roomInfo.game.drawer===userName){
      socket.emit("forceStopTimer")
    }
    socket.emit("leaveRoom",roomInfo)
  }




  const dense = false;
  const secondary = false;


  return (
    <div className="room-bg">
      <div className="room container">
        <div className="title rounded-rect border glass-rect margin-sm">
          <button onClick={e=>handleLeaveRoom()}><Link to="/">Return Lobby</Link></button>
          <h5 className="title">{roomInfo.roomName}</h5>
        </div>
        <div className="canvas rounded-rect border glass-rect margin-sm">
          <Canvas roomInfo={roomInfo} userName={userName} socket={socket} />
        </div>
        <div className="round rounded-rect border glass-rect margin-sm">
          <h5 className="title">ROUND {roomInfo.game.currentRound} / {roomInfo.rounds}</h5>
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
        <div className="message rounded-rect border glass-rect margin-sm">
          <h5 className="title">MESSAGE</h5>
          <Chat socket={socket} userName={userName} room={roomInfo} />
        </div>
      </div>
    </div>
  );
}