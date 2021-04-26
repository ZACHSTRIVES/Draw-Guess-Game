import Button from '@material-ui/core/Button';
import "./wordSelectionMask.css";

export default function WordSelectionMask({words, onSelectWord}) {
  return (
    <div className="select-word-container flex-center-all mask rounded-rect">
      <div className="words-container flex-center-all flex-column rounded-rect">
        <p>Choose a word:</p>
        <div className="words-btn-group">
          <Button variant="outlined" className="word-btn" onClick={() => onSelectWord(words[0])}>{words[0]}</Button>
          <Button variant="outlined" className="word-btn" onClick={() => onSelectWord(words[1])}>{words[1]}</Button>
          <Button variant="outlined" className="word-btn" onClick={() => onSelectWord(words[2])}>{words[2]}</Button>
        </div>
      </div>      
    </div>
  );
}