import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './login.css'
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import {
  useHistory
} from "react-router-dom";
import useSound from 'use-sound';
import ClickonSfx from '../../sounds/Clickon.wav';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    '& > *': {
      margin: theme.spacing(1),
      width: 'x25ch',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(18),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

export default function Login({ socket, handleLogin }) {
  const classes = useStyles();
  const [Clickon] = useSound(ClickonSfx);
  const [username, handleUsernameChange] = React.useState('')
  const [showWarning, handleShowWarning] = React.useState(false)
  const history = useHistory();

  React.useEffect(() => {
    socket.on('loginSuccess', (data) => {
      handleLogin(data.username, data.initdata)
      history.push('/')
    })
  }, []);

  React.useEffect(() => {
    socket.on('loginFail', (data) => {
      handleShowWarning(true)
    })
  }, []);

  function login() {
    Clickon();
    socket.emit('login', username)
  }

  return (
    <Container component="main" maxWidth="xs" className="loginCard">
      {showWarning ? <Alert severity="error" className="margin_top">You enter the same nickname as the other player!</Alert> : ""}
      <TextField
        margin="normal"
        required
        fullWidth
        id="Please Enter Nickname"
        label="Please Enter Nickname"
        name="Please Enter Nickname"
        autoComplete="Please Enter Nickname"
        autoFocus
        onChange={e => handleUsernameChange(e.target.value)} />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={login}>
        PLAY!
      </Button>
    </Container>
  );
}