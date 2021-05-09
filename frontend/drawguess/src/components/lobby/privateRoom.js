import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './room.css';
import doorClosed from '../../static/doorClosed.png';
import Alert from '@material-ui/lab/Alert';

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

export default function PublicRoomCard({ room, joinRoom }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordAlert, setPasswordAlert] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setPasswordAlert(false);
  };

  const handleJoinPrivateRoom = () => {
    if (password === room.password) {
      setOpen(false);
      setPasswordAlert(false);
      joinRoom(room.roomID);
    } else {
      setPasswordAlert(true);
    }
  }

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
        <DialogTitle id="alert-dialog-title"> Private Room</DialogTitle>
        <DialogContent>
          <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Room Password"></input>
          {passwordAlert === false ? "" : <Alert severity="error">Incorrect Password!</Alert>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleJoinPrivateRoom} color="primary" autoFocus>
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    </li>
  )
}