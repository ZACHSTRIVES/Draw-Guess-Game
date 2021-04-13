import { useEffect, useRef, useState } from 'react';
import './canvas.css';
import CanvasDraw from "react-canvas-draw";
import { DeleteForever, LineWeight, Palette, Undo, } from '@material-ui/icons';
import { Slider } from '@material-ui/core';
import React from 'react';

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
  const DEFAULT_BRUSH_SIZE = 10;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [showOption, setShowOption] = useState("none");
  const [size, setSize] = useState(0);
  const [drawing, setDrawing] = useState("");
  const [brushSize, setBrushSize] = useState(DEFAULT_BRUSH_SIZE);

  const deboundCanvasChange = debounce(function handleCanvasChange() {
    const canvas = canvasRef.current;
    const drawings = canvas.getSaveData();

    if (drawings !== "") {
      setDrawing(drawings);
    }
  }, 50);

  const handleClear = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.clear();
  }

  const handleUndo = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.undo();
  }

  const handleStrokeSizeToggle = () => {
    if (showOption !== "size") {
      setShowOption("size");
    } else {
      setShowOption("none");
    }
  }

  const handleStrokeColorToggle = () => {
    if (showOption !== "color") {
      setShowOption("color");
    } else {
      setShowOption("none");
    }
  }

  const handleSliderChange = (event, newValue) => {
    setBrushSize(newValue);
    console.log("brush size: ", brushSize);
  }

  const handleSliderChangeCommitted = () => {
    setShowOption("none");
  }

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
    <div className="canvas flex-center-all" ref={containerRef} >
      <div className="canvas-header"></div>
      <CanvasDraw
        lazyRadius={0}
        brushRadius={brushSize}
        canvasWidth={size}
        canvasHeight={size}
        ref={canvasRef}
        onChange={deboundCanvasChange}
      />
      <div className="tools-overlay flex-center-all">
        <div className="tools-container flex bottom-offset">
          {
            (showOption === "size") &&
            <div className="size-options">
              <Slider
                value={brushSize}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                marks
                step={1}
                min={1}
                max={20}
                onChange={handleSliderChange}
                onChangeCommitted={handleSliderChangeCommitted}
              />
            </div>
          }
          {
            (showOption === "color") &&
            <div className="color-options">
              <h2>Color Picker</h2>
            </div>
          }
        </div>
        <div className="tools-container flex bottom">
          <div className="tool flex-center-all" onClick={handleStrokeColorToggle}>
            <div className="tool-btn flex-center-all">
              <Palette />
            </div>
            <span>Color</span>
          </div>
          <div className="tool flex-center-all" onClick={handleStrokeSizeToggle}>
            <div className="tool-btn flex-center-all">
              <LineWeight />
            </div>
            <span>Size</span>
          </div>
          <div className="tool flex-center-all" onClick={handleUndo}>
            <div className="tool-btn flex-center-all">
              <Undo />
            </div>
            <span>Undo</span>
          </div>
          <div className="tool flex-center-all" onClick={handleClear}>
            <div className="tool-btn flex-center-all">
              <DeleteForever />
            </div>
            <span>Clear</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canvas;