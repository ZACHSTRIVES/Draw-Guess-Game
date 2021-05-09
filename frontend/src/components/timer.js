import React from 'react';
import useSound from 'use-sound';
import timeSfx from '../sounds/time.wav';

export default function Timer({ socket }) {

  const [count, setCount] = React.useState(60);
  const [time] = useSound(timeSfx);

  React.useEffect(() => {
    socket.on('timer', (data) => {
      setCount(data)
      time();
    })
  }, []);

 
  return (
    <div className="canvas-timer flex-center-all">{count}</div>
  );
}