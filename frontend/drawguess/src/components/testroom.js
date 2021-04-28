import React from 'react';
import Timer from './timer'

export default function TestRoom({ socket }) {
    const [time,setTime]=React.useState(60)
    



    React.useEffect(() => {
        socket.on('timer', (data) => {
            setTime(data)
        })
    }, []);






    function handleStart() {
        socket.emit('startTimer',0)
        
    }
    
    function handleSet() {
        socket.emit("finishedTimer",0)
    }


    return (
        <div>
            <button onClick={handleStart}>开始计时</button>
            <button onClick={handleSet}>结束计时</button>
            <p>{time}</p>
           

        </div>

    )




}