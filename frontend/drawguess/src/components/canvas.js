import { useEffect, useRef, useState } from 'react';
import './canvas.css';
import CanvasDraw from "react-canvas-draw";

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

function Canvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [size, setSize] = useState(0);
  const [drawing, setDrawing] = useState("");

  let deboundCanvasChange = debounce(function handleCanvasChange() {
    const canvas = canvasRef.current;
    const drawings = canvas.getSaveData();

    if (drawings !== "") {
      setDrawing(drawings);
    }
  }, 50);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      if (!canvasRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const length = containerHeight < containerWidth ? containerHeight : containerWidth;
      console.log("width: ", containerWidth, "height: ", containerHeight);
      setSize(length);

      const canvas = canvasRef.current;
      let draw = () => {
        if (drawing !== "") {
          canvas.loadSaveData(drawing, true);
        }
      }
      draw();
    }, 100);

    debouncedHandleResize();

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  });

  return (
    <div className="canvas" ref={containerRef} >
      <CanvasDraw 
        lazyRadius={0} 
        canvasWidth={size} 
        canvasHeight={size} 
        ref={canvasRef} 
        onChange={deboundCanvasChange} 
      />
    </div>
  );
}

export default Canvas;