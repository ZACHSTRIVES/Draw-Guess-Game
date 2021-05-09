import React from 'react';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import './login.css';
import '../App.css';
import logo from '../static/drawguesslogo.png';
import useSound from 'use-sound';
import ClickonSfx from '../sounds/Clickon.wav';

export default function Login({socket,handleLogin}) {
  const [Clickon] = useSound(ClickonSfx);
  const [password, setPassword] = React.useState("")
  const [emailUserName, setEmail] = React.useState("")
  const [info, setInfo] = React.useState("")
  var  history= useHistory();


  function handleLoginButton() {
    Clickon();
    const data = { password: password, flag: emailUserName }
    if(password === ''|| emailUserName===''){
      setInfo("Please Enter All Your Login Information!");
    }
    if(password !== '' && emailUserName!==''){
      socket.emit('login', data)
    }  
  }

  function handleNavToReg(){
    Clickon();
    history.push('/register')
  }

  React.useEffect(() => {
    socket.on("loginFailed", (data) => {
      if(data==="UserNotExists"){
        setInfo("User Not Exists!")
      }
      else if(data==="passwordInvalid"){
        setInfo("Password Invalid!")
      }else if(data==="alreadyOnline"){
        setInfo("Your Account Is Already Online!")
      }
    });
  }, []);

  React.useEffect(() => {
    socket.on('loginSuccess', (data) => {
      handleLogin(data.userName, data.initdata)
      localStorage.setItem("userName",data.userName)
      history.push('/')
    })
  }, []);

  return (
    <div className="card">
      <div className="card--header ">
        <div className="logo-bg lobby-title">
            <img src={logo} alt="logo"></img>
          </div>
        <p className='title'>Login</p>
        {info===""? "" : <Alert severity="error">{info}</Alert>}
      </div>
        <div className="card--body">
          <div>
         
            <label>Email/Username</label>
            <input
              value={emailUserName}
              type="text"
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              value={password}
              type="password"
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit" 
          id="signup" 
          className="btn_sign-up"
          onClick={handleLoginButton} >
          Login
            </button>
        <p className="link"><a onClick={handleNavToReg}>Register</a></p>
    </div>
  );
}

