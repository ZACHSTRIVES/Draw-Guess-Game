import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Public from './publicroom';


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

export default function Lobby() {
  const classes = useStyles();
  const rooms = [
    { 'id': 0,
      'name': 'RoomName1',
      'number': 'Room1',
      'player': '2/6',
     },
     { 'id': 1,
        'name': 'RoomName2',
        'number': 'Room2',
        'player': '5/6',
     },
     { 'id': 2,
       'name': 'RoomName3',
       'number': 'Room3',
       'player': '4/6',
      }
  ];
  return (
    <div>
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
      <Button variant="contained">Create Room</Button>
      <Button variant="contained">Quick Play</Button>
      <br/>
      <Public rooms={rooms}></Public>
    </div>      
    );
  }