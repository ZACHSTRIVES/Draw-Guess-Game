import { useEffect, useState } from "react";

export default function Timer({gameOn, onPause}) {

  const [counter, setCounter] = useState(60);

  useEffect(() => {
    if (gameOn) {
      let startTimer = setTimeout(() => {
        if (counter > 0) {
          setCounter(counter - 1);
        } else {
          setCounter(60);
          onPause();
        }
      }, 1000);
  
      return () => {
        clearTimeout(startTimer);
      }
    }    
  }, [gameOn, counter, onPause]);

  return(
    <div className="canvas-timer flex-center-all">{counter}</div>
  );
}