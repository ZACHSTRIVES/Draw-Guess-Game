import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import './login.css';
import '../App.css';


export default function Login({socket,handleLogin}) {
  const [password, setPassword] = React.useState("")
  const [emailUserName, setEmail] = React.useState("")
  const [info, setInfo] = React.useState("")
  const [wrongAlert, setWrongAlert] = React.useState(false)
  const [failAlert, setFailAlert] = React.useState(false)
  var  history= useHistory();


  function handleLoginButton() {
    const data = { password: password, flag: emailUserName }
    if(password === ''|| emailUserName===''){
      setInfo("Please Enter All Your Login Information!");
    }
    if(password !== '' && emailUserName!==''){
      socket.emit('login', data)
    }  
  }

  function handleNavToReg(){
    history.push('/register')

  }

  React.useEffect(() => {
    socket.on("loginFailed", (data) => {
      if(data==="UserNotExists"){
        setInfo("User Not Exists!")
      }
      else if(data==="passwordInvalid"){
        setInfo("Password Invalid!")
      }
    });
  }, []);

  React.useEffect(() => {
    socket.on('loginSuccess', (data) => {
      handleLogin(data.userName, data.initdata)
      localStorage.setItem("userName",data.userName)
      console.log(data)
      history.push('/')
    })
  }, []);




  return (
    <div className="card">
      <div className="card--header ">
        <p className='title'>Login</p>
        {info===""?<a></a>: <Alert severity="error">{info}</Alert>}
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
          class="btn_sign-up"
          onClick={handleLoginButton} >
          Login
            </button>
        <p className="link"><a onClick={handleNavToReg}>Register</a></p>
    </div>
  );
}

