import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import RoomList from './roomList';
import axios from 'axios'
import CreateRoom from '../CreateRoom/CreateRoomModal';

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





export default function Lobby({socket}) {
  const classes = useStyles();
  const [rooms,setRooms]=React.useState([])
  const [current_users,setCurrentUsers]=React.useState(0)
  
 React.useEffect(()=>{
  socket.on('create_room', (data)=>{   //Listen for "Create Room"
    setRooms(data)
 })}, []);

 React.useEffect(()=>{
  socket.on('user_on_conection', (data)=>{   //Listen for "User Connection"
    setRooms(data.rooms)
    setCurrentUsers(data.current_users)
    
 })}, []);

 React.useEffect(()=>{
  socket.on('disconnected', (data)=>{   //Listen for "Disconnected Create Room"
    setCurrentUsers(data)
    
 })}, []);

 function handleCreateRoom(room){
  socket.emit('create_room',room)
  
}


 
  return (
    <div>
      <div className="online_info">Current Online：{current_users}</div>
  
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
      <br/>
      <CreateRoom socket={socket} handleCreateRoom={handleCreateRoom}></CreateRoom>
      <br/>
      <div>
        <RoomList rooms={rooms}></RoomList>
      </div>    
    </div>      
    );
  }