import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import './register.css';

export default function Login({socket,handleLogin}) {
  const [password, setPassword] = React.useState("")
  const [emailUserName, setEmail] = React.useState("")
  const [info, setInfo] = React.useState("")
  var  history= useHistory();


  function handleLoginButton() {
    const data = { password: password, flag: emailUserName }
    socket.emit('login', data)

  }

  function handleNavToReg(){
    history.push('/register')

  }

  React.useEffect(() => {
    socket.on('loginFiled', (data) => {
      setInfo(data)
    })
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
    <div className="paper">
      <Typography component="h1" variant="h5">
        Login
          </Typography>
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
          <div>
            <label htmlFor="exampleInputUsername1">Email/Username</label>
            <input
              variant="outlined"
              required
              fullWidth
              value={emailUserName}
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="exampleInputEmail1">Password</label>
            <input
              variant="outlined"
              required
              fullWidth
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleLoginButton} >
          Login
            </button>
        <button
          onClick={handleNavToReg}
          className="btn btn-primary"
        >
        </button>
   
    </div>
  );
}
