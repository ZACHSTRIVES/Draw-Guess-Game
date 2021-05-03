import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import './register.css';

export default function Register({socket}) {
  const [userName, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [c_password,setCPassowrd]=React.useState("")
  const [email, setEmail] = React.useState("")
  const [info, setInfo] = React.useState("")
  var history =useHistory();


  function handleReg() {
    const data = { userName: userName, password: password, email: email }
    console.log(data)
    if(password!==c_password){
      
      setInfo("Fuck! Two Passwords are different!")
    }else if(userName===""){
      
    
    }else{
      socket.emit('register', data)
    }
    

  }

  function handleNavToLogin(){
    history.push("/login")
    
  }

  React.useEffect(() => {
    socket.on('registerResponse', (data) => {
      setInfo(data)

    })
  }, []);


  return (
    <div className="paper">
      <Typography component="h1" variant="h5">
        Sign up
          </Typography>
     
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
          <div>
            <label htmlFor="exampleInputUsername1">User Name</label>
            <input
         
              onChange={e=>{setUsername(e.target.value)}}
            />
          </div>
          <div>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
         
              onChange={e=>{setEmail(e.target.value)}}
            />
          </div>
          <div>
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
           
              onChange={e=>{setPassword(e.target.value)}}
            />
          </div>
          <div>
            <label htmlFor="exampleInputPassword1">Confirm Password</label>
            <input
             
              onChange={e=>{setCPassowrd(e.target.value)}}
            />
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleReg}
        >
          Register
            </button>
        <button
          className="btn btn-primary"
          onClick={handleNavToLogin}
        >
       Login
        </button>
     
      <h3>{info}</h3>
    </div>
  );
}
