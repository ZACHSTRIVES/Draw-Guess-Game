import React, { useEffect, useState } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import RoomList from './roomList';
import axios from 'axios'
import CreateRoom from '../CreateRoom/CreateRoomModal/CreateRoomModal';
import logo from '../../static/drawguesslogo.png';
import publicRoom from '../../static/publicRoom.png';
import privateRoom from '../../static/privateRoom.png';
import allRoom from '../../static/allRoom.png';
import {
  Redirect, useHistory
} from "react-router-dom";
import './lobby.css';
import { ContactSupportOutlined, SportsRugbySharp } from '@material-ui/icons';
import Statistics from './statistics';


const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '24px',
  },
  iconButton: {
    padding: 10,
  },


}));


export default function Lobby({ socket, userName, rooms, isLogin }) {
  const [roomType, setRoomType] = useState("All");
  const history = useHistory();

  const classes = useStyles();

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
    const data = { room: room, userName: userName }
    socket.emit('create_room', data);


  }


  function handleJoinRoom(roomID) {
    const temp = { roomID: roomID, userName: userName }
    socket.emit('joinRoom', temp)
  }

  return (
    <div className="lobby flex">
      <div className="left flex">
        <div className="left-top glass-blur flex flex-column">
          <div className="logo-bg lobby-title">
            {/* Draw and Guess */}
            {/* <img src={logo} alt="logo"></img> */}
            <img src={logo} alt="logo"></img>
          </div>
          <div className="account-bg flex-center-all">
            Hello, {userName}
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
            <div className="search-room">
              <Paper component="form" className={classes.root}>
                <input className="search-input" placeholder="Room number"></input>
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>
          </div>
          <CreateRoom socket={socket} handleCreateRoom={handleCreateRoom}></CreateRoom>
          <RoomList rooms={rooms} joinRoom={handleJoinRoom} show={roomType}></RoomList>
        </div>
      </div>
      <div className="right glass-blur flex flex-column">
        <div className="stats-banner lobby-title text-title">Statistics</div>
        <Statistics data={stats} />
      </div>
      {/* <img src={logo} className="logo"></img>
      <div className="online_info">Hello, {userName}</div>

      
      <br />
      <CreateRoom socket={socket} handleCreateRoom={handleCreateRoom}></CreateRoom>
      <br />
      <div>
        <RoomList rooms={rooms} joinRoom={handleJoinRoom} show={"public"}></RoomList>
      </div> */}
    </div>
  );
}