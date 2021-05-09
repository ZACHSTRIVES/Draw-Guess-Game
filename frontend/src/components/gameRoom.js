import React from 'react';
import Canvas from './canvas';
import Chat from './chat';
import './gameRoom.css';
import '../App.css';
import './lobby/lobby.css';
import HostIcon from '../static/house.png';
import BrushIcon from '../static/brush.png';
import ReturnIcon from '../static/return.png';
import { useHistory } from "react-router-dom";

import useSound from 'use-sound';


import ClickonSfx from '../sounds/Clickon.wav';
import successSfx from '../sounds/success.wav';

export default function GameRoom({ socket, userName, init_room }) {
  const [Clickon] = useSound(ClickonSfx);
  const [success] = useSound(successSfx);
  const [roomInfo, setRoomInfo] = React.useState(init_room)
  const history = useHistory()

  React.useEffect(() => {
    socket.on('newUserJoinRoom', (data) => {
      setRoomInfo(data.roomInfo);
    })
  }, []);

  React.useEffect(() => {
    socket.on('updateCurrentRoomInfo', (data) => {
      setRoomInfo(data);
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
      success();
      setRoomInfo(data);
      if ((data.game.drawer === userName) && (data.game.num_of_right === data.currentPlayers - 1)) {
        socket.emit('finishedTimer', data)
      }
    })
  }, []);

  
  function handleLeaveRoom() {
    Clickon();
    history.replace('/')
    history.go()
    if (roomInfo.game.drawer === userName) {
      socket.emit("forceStopTimer")
    }
    socket.emit("leaveRoom", roomInfo)
  }

  return (
    <div className="room-bg ">
      <div className="room-container flex-column">
        <div className="block-1">
          <div className="game-room-banner flex rounded-rect border glass-rect">
            <div className="return-btn" onClick={e => handleLeaveRoom()}>
              <div className="return-button" ><img src={ReturnIcon} alt="Return Lobby" /></div>
              <div className="return-text"><span> Return</span></div>
            </div>
            <h5 className="title-font text-title room-banner-title">{roomInfo.roomName}</h5>
          </div>
        </div>
        <div className="block-2">
          <div className="room-canvas flex-center-all rounded-rect border glass-rect">
            <Canvas roomInfo={roomInfo} userName={userName} socket={socket} />
          </div>
          <div className="room-players-info flex-column">
            <div className="room-player-list flex-column rounded-rect border glass-rect">
              <h5 className="title-font text-title sticky">ROUND <span className="no-spacing">{roomInfo.game.currentRound} / {roomInfo.rounds}</span></h5>
              <div className="playerList">
                <ul>
                  {roomInfo.scoreBoard.map((player, index) =>
                    <li key={index} alignItems="flex-start">
                      <div className={`player flex ${userName === player.userName ? "player-current" : ""}`}>
                        <div className="username flex">
                          {player.userName}
                          {player.userName === roomInfo.host && <div className="rank-icon-xs margin-left-extra"><img src={HostIcon} alt="host icon" /></div>}
                          {player.userName === roomInfo.game.drawer && <div className="rank-icon-xs green-icon margin-left-extra"><img src={BrushIcon} alt="brush icon" /></div>}
                        </div>
                        <div className="score">{player.score}</div>
                      </div>
                    </li>)}
                </ul>
              </div>
            </div>
            <div className="room-chat-box flex-column rounded-rect border glass-rect">
              <h5 className="title-font text-title">MESSAGE</h5>
              <Chat socket={socket} userName={userName} room={roomInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}