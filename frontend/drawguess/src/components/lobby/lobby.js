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
import logo from '../../static/logo.png';
import publicRoom from '../../static/publicRoom.png';
import privateRoom from '../../static/privateRoom.png';
import allRoom from '../../static/allRoom.png';
import {
  Redirect, useHistory
} from "react-router-dom";
import './lobby.css';
import { ContactSupportOutlined, SportsRugbySharp } from '@material-ui/icons';


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

export default function Lobby({ socket, userName, rooms }) {
  const [roomType, setRoomType] = useState("All");
  const history = useHistory();

  const classes = useStyles();


  // React.useEffect(() => {
  //   socket.on('user_on_conection', (data) => {   //Listen for "User Connection"
  //     setRooms(data.rooms)

  //   })
  // }, []);

  // React.useEffect(() => {
  //   socket.on('joinRoomSuccess', (data) => {  
  //     var path = {
  //       pathname:'/room/'+data.roomID,
  //       query:data,
  //     }
  //     history.push(path);
  //     console.log("Listen join room lobby.js:85")
  //   })
  // }, []);

  const handleRoomSelection = (roomType) => {
    console.log("Room type: ", roomType);
    setRoomType(roomType);
  }

  React.useEffect(() => {
    socket.on('joinRoomSuccess', (data) => {
      // var path = {
      //   pathname:'/room/'+data.roomID,
      //   query:data,
      // }
      console.log("listen join room")
      history.push('room/' + data.roomID);
      console.log("Listen join room lobby.js:85")
    })
  }, []);

  function handleCreateRoom(room) {
    const data = { room: room, userName: userName }
    socket.emit('create_room', data);


  }

  function handleJoinRoom(roomID) {
    const temp = { roomID: roomID, userName: userName }
    socket.emit('joinRoom', temp)
    console.log("handle JoinRoom  lobby.js:98")
  }

  return (
    <div className="flex-center-all lobby">
      <div className="left glass-blur flex flex-column">
        <div className="logo-bg">
          Draw and Guess
          {/* <img src={logo} className="logo"></img> */}
        </div>
        <div className="account-bg flex-center-all">
          Hello, {userName}
        </div>
        <div className="nav-room">
          <div className="nav-all nav-btn" onClick={e=>handleRoomSelection("All")}>
            <div className="nav-icon"><img src={allRoom} className="all room"></img></div>
            <div className="nav-text">All Rooms</div>
          </div>
          <div className="nav-public nav-btn" onClick={e=>handleRoomSelection("Public")}>
            <div className="nav-icon"><img src={publicRoom} className="public room"></img></div>
            <div className="nav-text">Public Rooms</div>
          </div>
          <div className="nav-private nav-btn" onClick={e=>handleRoomSelection("Private")}>
            <div className="nav-icon"><img src={privateRoom} className="private room"></img></div>
            <div className="nav-text">Private Rooms</div>
          </div>
        </div>

      </div>
      <div className="middle glass-blur flex flex-column">
        <div className="room-banner flex">
          <div className="room-type">{roomType} Rooms</div>
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
      <div className="right glass-blur flex flex-column">
        <div className="stats-banner">Statistics</div>
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