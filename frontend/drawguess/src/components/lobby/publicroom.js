import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import './room.css';
import doorOpen from '../../static/doorOpen.png';

const useStyles = makeStyles({
  root: {
    Width: 400,
    height: 100,
  },
  title: {
    fontSize: 14,
    textAlign: 'left',
  },
  pos: {
    textAlign: 'right',
  },
  name: {
    textAlign: 'left',
  },
  icon: {
    display: 'inline-flex',
  }
});

export default function PublicRoomCard({ room }) {
  const classes = useStyles();

  return (
    <li>
      <div className="room-card flex">
        <div className="room-icon public-room-icon"><img src={doorOpen} alt="public room"/></div>
        <div className="room-info flex-column">
          <div className="room-title">{room.roomName}</div>
          <div className="room-id">ID {room.roomID}</div>
          <div className="room-players">
            <GroupIcon className={classes.icon}/>
            {room.currentPlayers}/{room.maxPlayers}
          </div>
        </div>        
      </div>
    </li>)
}