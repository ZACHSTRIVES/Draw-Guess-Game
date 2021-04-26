import Button from '@material-ui/core/Button';

export default function WordSelectionMask({words, onSelectWord}) {
  return (
    <div className="mask-container flex-center-all mask rounded-rect">
      <div className="pop-up-container flex-center-all flex-column rounded-rect glass-rect">
        <p>Choose a word:</p>
        <div className="options-btn-group">
          <Button variant="outlined" className="option-btn" onClick={() => onSelectWord(words[0])}>{words[0]}</Button>
          <Button variant="outlined" className="option-btn" onClick={() => onSelectWord(words[1])}>{words[1]}</Button>
          <Button variant="outlined" className="option-btn" onClick={() => onSelectWord(words[2])}>{words[2]}</Button>
        </div>
      </div>      
    </div>
  );
}