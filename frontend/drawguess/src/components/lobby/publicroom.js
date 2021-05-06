import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import doorOpen from '../../static/doorOpen.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import './room.css';

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
          <div className="room-players">{room.currentPlayers}/{room.maxPlayers}</div>
        </div>        
      </div>
      {/* <Card className="{classes.root} margin_top_card">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            ID {room.roomID}
          </Typography>
          <Typography className={classes.name} variant="h5" component="h2">
            {room.roomName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <GroupIcon className={classes.icon}/>
            <GroupIcon style={{ verticalAlign: 'middle' }} />
            {room.currentPlayers}/{room.maxPlayers}
          </Typography>
        </CardContent>
      </Card> */}
    </li>)
}