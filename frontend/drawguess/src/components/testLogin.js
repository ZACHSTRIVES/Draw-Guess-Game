import React from 'react';
import Timer from './timer'

export default function TestLogin({ socket }) {
    const [password,setPassword]=React.useState("")
    const [email,setEmail]=React.useState("")
    const [info,setInfo]=React.useState("")


    function handleStart() {
        const data={password:password,email:email}
        socket.emit('testLogin',data)
        
    }

    React.useEffect(() => {
        socket.on('loginResponse', (data) => {
         setInfo(data)
    
        })
      }, []);
    
 

    return (
        <div>
            <label>Email</label> <input onChange={e=>setEmail(e.target.value)}></input>
           <br></br>
           <label>Password</label> <input type="password" onChange={e=>setPassword(e.target.value)}></input>    
           <button onClick={handleStart}>登陆</button>      
           <h1>{info}</h1>
        </div>
    )
}