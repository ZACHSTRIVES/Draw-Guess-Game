import React from 'react';

export default function Timer({ socket }) {

  const [count, setCount] = React.useState(60);

  React.useEffect(() => {
    socket.on('timer', (data) => {
      setCount(data)
    })
  }, []);

  return (
    <div className="canvas-timer flex-center-all">{count}</div>
  );
}