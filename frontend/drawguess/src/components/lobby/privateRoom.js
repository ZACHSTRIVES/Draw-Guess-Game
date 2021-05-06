import React from 'react';
import styles from './room.css';
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

export default function PublicRoomCard({ room,joinRoom}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordAlert,setPasswordAlert] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setPasswordAlert(false);
  };

  const handleJoinPrivateRoom = () => {
    if(password===room.password){
      setOpen(false);
      setPasswordAlert(false);
      joinRoom(room.roomID);

      
    }else{
      
      setPasswordAlert(true);
    }

  };


  return (
    <li>
      <Card className="{classes.root} margin_top_card" onClick={handleOpen}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            ID {room.roomID}
          </Typography>
          <Typography className={classes.name} variant="h5" component="h2">
            {room.roomName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {/* <GroupIcon className={classes.icon}/> */}
            <GroupIcon style={{ verticalAlign: 'middle' }} />
            {room.currentPlayers}/{room.maxPlayers}
          </Typography>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Private Room</DialogTitle>
        <DialogContent>
          <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Room Password"></input>
          {passwordAlert===false?<a></a>:<Alert severity="error">Incorrect Password!</Alert>}
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={handleJoinPrivateRoom} color="primary" autoFocus>
            enter
          </Button>
        </DialogActions>
      </Dialog>
    </li>)
}