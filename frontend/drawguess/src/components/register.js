import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import './register.css';

export default function Register(props) {
    const [state , setState] = useState({
        username: "",
        email : "",
        password : "",
        confirmPassword: ""
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
        // console.log(state)
        // console.log(state.password)
        // console.log(state.confirmPassword)
        if(state.password === state.confirmPassword) {
            console.log('Passwords match');
        } else {
           console.log('Passwords do not match');
        }
    }
  
    return (
        <div className="paper">
          <Typography component="h1" variant="h5">
            Sign up
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
                    id="email"
                    label="Email Address"
                    name="email"
                    type='email'
                    autoComplete="email"
                    value={state.email}
                    onChange={handleChange}
                    />
              </div>
              <div>
                <label htmlFor="exampleInputPassword1">Password</label>
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
              <div>
                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    value={state.confirmPassword}
                    onChange={handleChange}
                    />
              </div>
            </div>
            <button 
            type="submit" 
            className="btn btn-primary"
            onClick={handleSubmitClick}
            >
            Register
            </button>
            <button 
            type="submit" 
            className="btn btn-primary"
            >
            <Link to="/login">Login</Link>
            </button>
          </form>
        </div>
    );
  }
  