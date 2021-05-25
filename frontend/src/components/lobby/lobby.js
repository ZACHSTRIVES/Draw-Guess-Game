import React, { useState } from 'react';
import RoomList from './roomList';
import CreateRoom from '../CreateRoom/CreateRoomModal/CreateRoomModal';
import Statistics from './statistics';
import logo from '../../static/drawguesslogo.png';
import publicRoom from '../../static/publicRoom.png';
import privateRoom from '../../static/privateRoom.png';
import allRoom from '../../static/allRoom.png';
import { useHistory } from "react-router-dom";
import './lobby.css';

import useSound from 'use-sound';
import ClickonSfx from '../../sounds/Clickon.wav';

export default function Lobby({ socket, userName, rooms, isLogin }) {
  const [Clickon] = useSound(ClickonSfx);
  const [roomType, setRoomType] = useState("All");
  const history = useHistory();
  const [stats, setStats] = React.useState({
    rounds: 0,
    firstRanks: 0,
    secondRanks: 0,
    thirdRanks: 0,
    firstRate: 0,
    secondRate: 0,
    thirdRate: 0,
    history: []
  });

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    socket.on('joinRoomSuccess', (data) => {
      const path = "/room/" + data.roomID;
      history.push(path);

    })
  }, []);

  React.useEffect(() => {
    socket.on('setStats', (data) => {
      setStats(data);
      console.log(data);

    })
  }, []);

  const handleRoomSelection = (roomType) => {
    Clickon();
    console.log("Room type: ", roomType);
    setRoomType(roomType);
  }

  React.useEffect(() => {

    socket.on('autoLoginFailed', () => {
      history.replace("/login")
      setLoading(false)
    })
  }, []);

  React.useEffect(() => {
    socket.on('autoLoginSuccess', () => {
      console.log("ss")
      setLoading(false)
      socket.emit('gameStats', (userName));
    })
  }, []);

  React.useEffect(() => {
    if (isLogin) {
      socket.emit('gameStats', (userName));
    } else {
      setLoading(true)
      socket.emit('autoLogin', (userName));
    }
  }, []);

  function handleCreateRoom(room) {
    Clickon();
    const data = { room: room, userName: userName }
    socket.emit('create_room', data);
  }

  function handleJoinRoom(roomID) {
    Clickon();
    const temp = { roomID: roomID, userName: userName }
    socket.emit('joinRoom', temp)
  }

  function handleLogout() {
    history.go();
    Clickon();
    history.push('/login');
    localStorage.clear();
  }

  return (
    <div className="lobby flex">
      <div className="left flex">
        <div className="left-top glass-blur flex flex-column">
          <div className="logo-bg lobby-title">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="account-bg">
            <div className="account-name">Hello, {userName}</div>
            <div className="logout-btn" onClick={e => handleLogout()}>Logout</div>
          </div>
          <div className="nav-room">
            <div className="nav-all nav-btn" onClick={e => handleRoomSelection("All")}>
              <div className="nav-icon"><img src={allRoom} alt="all room"></img></div>
              <div className="nav-text">All<span> Rooms</span></div>
            </div>
            <div className="nav-public nav-btn" onClick={e => handleRoomSelection("Public")}>
              <div className="nav-icon"><img src={publicRoom} alt="public room"></img></div>
              <div className="nav-text">Public<span> Rooms</span></div>
            </div>
            <div className="nav-private nav-btn" onClick={e => handleRoomSelection("Private")}>
              <div className="nav-icon"><img src={privateRoom} alt="private room"></img></div>
              <div className="nav-text">Private<span> Rooms</span></div>
            </div>
          </div>
        </div>
        <div className="left-btm glass-blur flex flex-column">
          <div className="room-banner flex">
            <div className="room-type lobby-title text-title">{roomType} Rooms</div>
          </div>
          <CreateRoom socket={socket} handleCreateRoom={handleCreateRoom}></CreateRoom>
          <RoomList rooms={rooms} joinRoom={handleJoinRoom} show={roomType}></RoomList>
        </div>
      </div>
      <div className="right glass-blur flex flex-column">
        <div className="stats-banner lobby-title text-title">Statistics</div>
        <Statistics data={stats} />
      </div>
    </div>
  );
}