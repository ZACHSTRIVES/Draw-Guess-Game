import { useEffect, useRef, useState } from 'react';
import './canvas.css';
import CanvasDraw from "react-canvas-draw";
import { DeleteForever, LineWeight, Palette, Undo, } from '@material-ui/icons';
import { Slider } from '@material-ui/core';
import { TwitterPicker } from 'react-color';
import data from './words';
import React from 'react';
import Timer from './timer';
import WordSelectionMask from './wordSelectionMask';
import StartGameMask from './startGameMask';
import LeaderBoardMask from './leaderBoardMask';
import FinalLeaderBoardMask from './finalLeaderBoardMask';
import useSound from 'use-sound';
import ClickonSfx from '../sounds/Clickon.wav';

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

function Canvas({ roomInfo, userName, socket }) {
  const colors = ['#DB3E00', '#FF6900', '#ffeb3b', '#008B02', '#4caf50', '#03a9f4', '#8ED1FC', '#F78DA7', '#9900EF', '#000000'];
  const words = data.words;
  const DEFAULT_BRUSH_SIZE = 5;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [showOption, setShowOption] = useState("none");
  const [size, setSize] = useState(0);
  const drawing = "";
  const [brushSize, setBrushSize] = useState(DEFAULT_BRUSH_SIZE);
  const [brushColor, setBrushColor] = useState("#000");
  const [drawingMode, setDrawingMode] = useState("none");
  const [randomWords, setRandomWords] = useState([])
  const [Clickon] = useSound(ClickonSfx);


  const deboundCanvasChange = function handleCanvasChange() {
    const canvas = canvasRef.current;
    const drawings = canvas.getSaveData();

    if (drawings !== "") {
      if (roomInfo.game.drawer === userName) {
        if (drawingMode === "done") {
          const data = { roomID: roomInfo.roomID, canvas: drawings }
          socket.emit('draw', data)
          setDrawingMode("none")
        }
      }
    }
  }
  React.useEffect(() => {
    socket.on('clearCanvas', () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.clear();
    })
  }, []);

  React.useEffect(() => {
    socket.on('choosingWord', (data) => {
      if (data.game.drawer === userName) {
          setRandomWords(getRandomWords(3, words));        
      }
    })
  }, []);

  React.useEffect(() => {
    socket.on('onDraw', (data) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.loadSaveData(data.game.canvas, true)

    })
  }, []);

  React.useEffect(() => {
    const canvasContainer = document.querySelector(".canvas-container");
    if (!canvasContainer) return;
    canvasContainer.addEventListener("mouseup", stopDrawing);
    canvasContainer.addEventListener("touchend", stopDrawing);
  }, []);

  const stopDrawing = () => {
    Clickon();
    if (drawingMode === "none") {
      setDrawingMode("done");
    }
  }

  const handleClear = () => {
    Clickon();
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.clear();
  }

  const handleUndo = () => {
    Clickon();
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.undo();
  }

  const handleStrokeSizeToggle = () => {
    Clickon();
    if (showOption !== "size") {
      setShowOption("size");
    } else {
      setShowOption("none");
    }

    const sizeBtn = document.querySelector('.size-btn');
    sizeBtn.classList.toggle('btn-active');
  }

  const handleStrokeColorToggle = () => {
    Clickon();
    if (showOption !== "color") {
      setShowOption("color");
    } else {
      setShowOption("none");
    }

    const colorBtn = document.querySelector('.color-btn');
    colorBtn.classList.toggle('btn-active');
  }

  const handleSliderChange = (event, newValue) => {
    Clickon();
    setBrushSize(newValue);
  }

  const handleSliderChangeCommitted = (event, newValue) => {
    Clickon();
    setBrushSize(newValue);
    setShowOption("none");

    const sizeBtn = document.querySelector('.size-btn');
    sizeBtn.classList.remove('btn-active')
  }

  const handleColorChangeComplete = (color, event) => {
    Clickon();
    setBrushColor(color.hex);
    setShowOption("none");

    const colorBtn = document.querySelector('.color-btn');
    colorBtn.classList.remove('btn-active');
  }

  function handleSelectWord(word) {
    Clickon();
    const data = { word: word, roomID: roomInfo.roomID }
    socket.emit('setWord', data)
  }

  const handleStartGame = () => {
    Clickon();
    const temp = { roomID: roomInfo.roomID, userName: userName }
    socket.emit('beginGame', temp)
  }

  const maskWord = (word) => {
    return word.replace(/\S/gi, '_ ');
  }

  const debouncedHandleResize = debounce(function handleResize() {
    Clickon();
    if (!canvasRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    const length = containerHeight < containerWidth ? containerHeight : containerWidth;
    setSize(length);

    const canvas = canvasRef.current;
    let draw = () => {
      if (drawing !== "") {
        canvas.loadSaveData(drawing, true);
      }
    }
    draw();
  }, 100);

  const getRandomWords = (size, words) => {
    Clickon();
    var arr = getRandomNumbers(size, words.length);

    var randomWords = [];
    arr.forEach(i => randomWords.push(words[i].word));
    return randomWords;
  }

  const getRandomNumbers = (size, length) => {
    Clickon();
    var arr = [];
    while (arr.length < size) {
      var r = Math.floor(Math.random() * length);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }

  useEffect(() => {
    debouncedHandleResize();

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, []);

  return (
    <div className="canvas-container flex-center-all" ref={containerRef} >

      {(() => {
        const isDrawer = roomInfo.game.drawer === userName
        const isHost = roomInfo.host === userName


        if (roomInfo.globalStatus === "waiting") {
          return (<StartGameMask isHost={isHost} onStartGame={handleStartGame} currentPlayers={roomInfo.currentPlayers}></StartGameMask>);
        }
        else if (roomInfo.globalStatus === "playing") {
          if (roomInfo.game.status === "ChoosingWord") {
            return (<WordSelectionMask drawer={roomInfo.game.drawer} isDrawer={isDrawer} words={randomWords} onSelectWord={handleSelectWord} socket={socket}>  </WordSelectionMask>);
          }
          else if (roomInfo.game.status === "drawing") {
            return (<div className="canvas-header glass-rect">
              <span>{isDrawer ? `You're drawing: ${roomInfo.game.word}` : `The drawing is: ${maskWord(roomInfo.game.word)}`}</span>
              <Timer socket={socket} />
            </div>)
          }
          else {
            return (<LeaderBoardMask players={roomInfo.scoreBoard} />);
          }
        }
        else {
          return (<FinalLeaderBoardMask players={roomInfo.scoreBoard} isHost={isHost} handleStartGame={handleStartGame}/>);
        }
      })()}
      {(() => {
        const isDrawer = roomInfo.game.drawer === userName
        if (roomInfo.globalStatus === "playing" && isDrawer) {
          return (
            <div>
              <CanvasDraw
                lazyRadius={0}
                brushColor={brushColor}
                brushRadius={brushSize}
                canvasWidth={size}
                canvasHeight={size}
                ref={canvasRef}
                disabled={false}
                onChange={deboundCanvasChange}
              />
              <div className="tools-overlay flex-center-all">
                {
                  (showOption !== "none") &&
                  <div className="tools-container flex bottom-offset glass-rect-bright rounded-rect">
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

                <div className="tools-container flex bottom glass-rect-bright rounded-rect">
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
          )

        } else {
          return (
            <CanvasDraw
              lazyRadius={0}
              brushColor={brushColor}
              brushRadius={brushSize}
              canvasWidth={size}
              canvasHeight={size}
              ref={canvasRef}
              disabled={true}
              onChange={deboundCanvasChange}
              hideInterface={true}
            />)
        }
      })()}
    </div>
  );
}

export default Canvas;