import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';

import useSound from 'use-sound';
import timeSfx from '../sounds/time.wav';

export default function WordSelectionMask({ drawer, isDrawer, words, onSelectWord, socket }) {
  const [time] = useSound(timeSfx);
  const [timer, setTime] = useState(10)
  useEffect(() => {
    socket.on('settingWordTimer', (data) => {
      setTime(data)
      time();
    })
  }, []);

  return (
    <div className="mask-container flex-center-all mask rounded-rect">
      {isDrawer ?
        <div className="pop-up-container flex-center-all flex-column rounded-rect glass-rect">
          <div className="mask-timer canvas-timer flex-center-all">{timer}</div>
          <p>Choose a word:</p>
          <div className="options-btn-group">
            <Button variant="outlined" className="option-btn" onClick={e => onSelectWord(words[0])}>{words[0]}</Button>
            <Button variant="outlined" className="option-btn" onClick={e => onSelectWord(words[1])}>{words[1]}</Button>
            <Button variant="outlined" className="option-btn" onClick={e => onSelectWord(words[2])}>{words[2]}</Button>
          </div>
        </div> :
        <div className="pop-up-container flex-center-all flex-column rounded-rect glass-rect">
          <p>Waiting for player {drawer} to choose a word...</p>
        </div>
      }
    </div>
  );
}