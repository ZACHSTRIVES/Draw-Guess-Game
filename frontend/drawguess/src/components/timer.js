import { useEffect, useState } from "react";

export default function Timer({gameOn}) {

  const [counter, setCounter] = useState(60);

  useEffect(() => {
    if (gameOn) {
      let startTimer = setTimeout(() => {
        if (counter > 0) {
          setCounter(counter - 1);
        } else {
          setCounter(60);
        }
      }, 1000);
  
      return () => {
        clearTimeout(startTimer);
      }
    }    
  }, [gameOn, counter]);

  return(
    <div className="canvas-timer flex-center-all">{counter}</div>
  );
}