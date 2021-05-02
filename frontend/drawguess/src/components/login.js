import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import './register.css';

export default function Register(props) {
    const [state , setState] = useState({
        username: "",
        password : "",
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        console.log(state)
        console.log(state.password)
        console.log(state.confirmPassword)
        if(state.password === state.confirmPassword) {
            console.log('Passwords match');
        } else {
           console.log('Passwords do not match');
        }
    }
  
    return (
        <div className="paper">
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className="form" noValidate>
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
              <div>
              <label htmlFor="exampleInputUsername1">User Name</label>
                <input
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="User name"
                  name="Username"
                  autoComplete="Username"
                  value={state.username}
                onChange={handleChange}
                />
              </div>
              <div>
              <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button 
            type="submit" 
            className="btn btn-primary"
            onClick={handleSubmitClick}
            >
            Login
            </button>
            <button 
            type="submit" 
            className="btn btn-primary"
            >
            <Link to="/register">Register</Link>
            </button>
          </form>
        </div>
    );
  }
  