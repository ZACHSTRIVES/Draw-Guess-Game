import { useEffect, useRef, useState } from 'react';
import './canvas.css';
import CanvasDraw from "react-canvas-draw";
import { DeleteForever, LineWeight, Palette, Undo, } from '@material-ui/icons';
import { Slider } from '@material-ui/core';
import { TwitterPicker } from 'react-color';
import React from 'react';
import Timer from './timer';
import WordSelectionMask from './wordSelectionMask';
import StartGameMask from './startGameMask';

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
  const colors = ['#DB3E00', '#FF6900', '#ffeb3b', '#008B02', '#4caf50', '#03a9f4', '#8ED1FC', '#F78DA7', '#9900EF', '#000000'];
  const words = ['pig', 'rabbit', 'dog', 'starfish', 'bridge', 'library', 'park', 'tower'];
  const DEFAULT_BRUSH_SIZE = 10;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [showOption, setShowOption] = useState("none");
  const [size, setSize] = useState(0);
  const [drawing, setDrawing] = useState("");
  const [brushSize, setBrushSize] = useState(DEFAULT_BRUSH_SIZE);
  const [brushColor, setBrushColor] = useState("#000");
  const [word, setWord] = useState("");
  const [wordChoices, setWordChoices] = useState(null);
  const [startGame, setStartGame] = useState(false);
  const [pause, setPause] = useState(true);

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

    const sizeBtn = document.querySelector('.size-btn');
    sizeBtn.classList.toggle('btn-active');
  }

  const handleStrokeColorToggle = () => {
    if (showOption !== "color") {
      setShowOption("color");
    } else {
      setShowOption("none");
    }

    const colorBtn = document.querySelector('.color-btn');
    colorBtn.classList.toggle('btn-active');
  }

  const handleSliderChange = (event, newValue) => {
    setBrushSize(newValue);
  }

  const handleSliderChangeCommitted = (event, newValue) => {
    setBrushSize(newValue);
    setShowOption("none");

    const sizeBtn = document.querySelector('.size-btn');
    sizeBtn.classList.remove('btn-active')
  }

  const handleColorChangeComplete = (color, event) => {
    setBrushColor(color.hex);
    setShowOption("none");

    const colorBtn = document.querySelector('.color-btn');
    colorBtn.classList.remove('btn-active');
  }

  const handleSelectWord = (word) => {
    console.log("handle select word for word: ", word);
    setWord(word);
    setPause(false);
  }

  const handleGamePause = () => {
    console.log("handle game pause");
    setPause(true);
    setWord("");

    var results = words.slice(0, 3);
    setWordChoices(results);
  }

  const handleStartGame = () => {
    console.log("starting game btn pressed");
    setStartGame(true);
  }

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

  useEffect(() => {
    debouncedHandleResize();

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  });

  useEffect(() => {
    // setRandomWord();

    // var results = words.slice(0, 3);
    // setWordChoices(results);
  });

  return (
    <div className="canvas-container flex-center-all" ref={containerRef} >
      { (!startGame) ? <StartGameMask isHost={true} onStartGame={handleStartGame}></StartGameMask> :
       (pause) && <WordSelectionMask words={words.slice(0, 3)} onSelectWord={handleSelectWord}></WordSelectionMask>}
      <div className="canvas-header glass-rect">
        {console.log("Pause: ", pause)}
        {console.log("start game: ", startGame)}
        <span>You're drawing: {word}</span>
        <Timer gameOn={!pause} onPause={handleGamePause} />
        {/* <div className="canvas-timer flex-center-all"></div> */}
      </div>
      <CanvasDraw
        lazyRadius={0}
        brushColor={brushColor}
        brushRadius={brushSize}
        canvasWidth={size}
        canvasHeight={size}
        ref={canvasRef}
        onChange={deboundCanvasChange}
      />
      <div className="tools-overlay flex-center-all">
        {
          (showOption !== "none") &&
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
                <TwitterPicker colors={colors} onChangeComplete={handleColorChangeComplete} />
              </div>
            }
          </div>
        }

        <div className="tools-container flex bottom">
          <div className="tool flex-center-all" onClick={handleStrokeColorToggle}>
            <div className="tool-btn flex-center-all color-btn">
              <Palette style={{ color: brushColor }} />
            </div>
            <span>Color</span>
          </div>
          <div className="tool flex-center-all" onClick={handleStrokeSizeToggle}>
            <div className="tool-btn flex-center-all size-btn">
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