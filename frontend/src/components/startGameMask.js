import Button from '@material-ui/core/Button';

export default function StartGameMask({ isHost, currentPlayers,onStartGame }) {

  return (
    <div className="mask-container flex-center-all mask rounded-rect">
      <div className="pop-up-container flex-center-all flex-column rounded-rect glass-rect">
      {(() => {
        if(isHost){
          if(currentPlayers>1){
            return (
              <div className="flex-center-all flex-column start-game-txt">
                <p>Are you ready?</p>
                <Button variant="outlined" className="option-btn" onClick={() => onStartGame()}>Start</Button>
              </div>
            )

          }else{
            return(
              <div className="flex-center-all flex-column start-game-txt">
                <p>Waiting for players</p>
                
              </div>

            )
          }

         
        }else{
          return( <p>Waiting for host to start game</p>)
        }


      })()}
      </div>
    </div>
  );
}