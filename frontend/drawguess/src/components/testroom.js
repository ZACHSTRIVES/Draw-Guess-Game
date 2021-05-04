import React from 'react';
import Timer from './timer'

export default function TestRoom({ socket }) {
    const [userName,setUsername]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [email,setEmail]=React.useState("")
    const [info,setInfo]=React.useState("")


    function handleStart() {
        const data={userName:userName,password:password,email:email}
        socket.emit('register',data)
        
    }

    React.useEffect(() => {
        socket.on('registerResponse', (data) => {
         setInfo(data)
    
        })
      }, []);
    
 

    return (
        <div>
            <label>Email</label> <input onChange={e=>setEmail(e.target.value)}></input>
           <br></br>
           <label>UserName</label> <input onChange={e=>setUsername(e.target.value)}></input>
           <br></br>
           <label>Password</label> <input type="password" onChange={e=>setPassword(e.target.value)}></input>    
           <button onClick={handleStart}>注册</button>      
           <h1>{info}</h1>
        </div>
    )
}