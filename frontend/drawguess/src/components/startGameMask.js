import Button from '@material-ui/core/Button';

export default function StartGameMask({ isHost, onStartGame }) {

  return (
    <div className="mask-container flex-center-all mask rounded-rect">
      <div className="pop-up-container flex-center-all flex-column rounded-rect glass-rect">
        {isHost
          ? <div className="flex-center-all flex-column start-game-txt">
              <p>Start game?</p>
              <Button variant="outlined" className="option-btn" onClick={() => onStartGame()}>Ready</Button>
            </div>
          : <p>Waiting for host to start game</p>
        }
      </div>
    </div>
  );
}