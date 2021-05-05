import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import RoomList from './roomList';
import axios from 'axios'
import CreateRoom from '../CreateRoom/CreateRoomModal/CreateRoomModal';
import {
  Redirect, useHistory
} from "react-router-dom";


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
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  '& > *': {
    margin: theme.spacing(1),
  },
}));





export default function Lobby({ socket,userName,rooms}) {
  const history = useHistory();

  const classes = useStyles();

  React.useEffect(() => {
    socket.on('joinRoomSuccess', (data) => {  
      const path = "/room/"+data.roomID;
      history.push(path);
  
    })
  }, []);

  function handleCreateRoom(room) {
    const data={room:room,userName:userName}
    socket.emit('create_room', data);
  

  }

  function handleJoinRoom(roomID){
    const temp={roomID:roomID,userName:userName}
    socket.emit('joinRoom',temp)
    console.log("handle JoinRoom  lobby.js:98")
  }

  return (
    <div>
      <div className="online_info">Hello, {userName}</div>

      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Room number"
          inputProps={{ 'aria-label': 'Room number' }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <br />
      <CreateRoom socket={socket} handleCreateRoom={handleCreateRoom}></CreateRoom>
      <br />
      <div>
        <RoomList rooms={rooms} joinRoom={handleJoinRoom}></RoomList>
      </div>
    </div>
  );
}