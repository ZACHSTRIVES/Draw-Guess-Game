import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './room.css';
import doorClosed from '../../static/doorClosed.png';

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
    //   marginBottom: 12,
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <li>
      <div className="room-card flex" onClick={handleOpen}>
        <div className="room-icon private-room-icon"><img src={doorClosed} alt="private room" /></div>
        <div className="room-info flex-column">
          <div className="room-title">{room.roomName}</div>
          <div className="room-id">ID {room.roomID}</div>
          <div className="room-players">
            <GroupIcon className={classes.icon} />
            {room.currentPlayers}/{room.maxPlayers}
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{room.roomName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {room.roomName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </li>)
}