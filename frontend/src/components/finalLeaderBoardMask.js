import goldMedal from "../static/gold.png";
import silverMedal from "../static/silver.png";
import bronzeMedal from "../static/bronze.png";
import restartIcon from "../static/restart.png";
import { useEffect, useState } from "react";
import "./leaderBoardMask.css";

export default function FinalLeaderBoardMask({ players, isHost ,handleStartGame}) {

  const [sortedPlayers, setSortedPlayers] = useState(null);

  useEffect(() => {
    const playersToSort = players;
    playersToSort.sort((a, b) => b.score - a.score);
    setSortedPlayers(playersToSort);
  }, [sortedPlayers])

  function getTopThreePlayers() {
    const topThree = sortedPlayers.slice(0, 3);
    return (
      <div className="top-three flex top-three-final">
        {
          (topThree.length >= 1) &&
          <div key={1} className="gold-medal-final flex-column medal-final">

            <div className="rank-icon rank-icon-final">
              <img src={goldMedal} alt="gold medal" />
            </div>

            <div className="leader-board-name-final text-subtitle">{topThree[0].userName}</div>

            <div className="score text-bold">{topThree[0].score}</div>
          </div>
        }
        {
          (topThree.length >= 2) &&
          <div key={2} className="silver-medal-final flex-column medal-final">
            <div className="rank-icon rank-icon-final">
              <img src={silverMedal} alt="silver medal" />
            </div>
            <div className="leader-board-name-final text-subtitle chart-title">{topThree[1].userName}</div>
            <div className="score text-bold">{topThree[1].score}</div>
          </div>
        }
        {
          (topThree.length >= 3) &&
          <div key={3} className="bronze-medal-final flex-column medal-final">

            <div className="rank-icon rank-icon-final">
              <img src={bronzeMedal} alt="bronze medal" />
            </div>
            <div className="leader-board-name-final text-subtitle chart-title">{topThree[2].userName}</div>

            <div className="score text-bold">{topThree[2].score}</div>
          </div>
        }
      </div>
    )
  }

  function getRestOfPlayers() {
    const startIndex = 3;
    const restOfPlayers = sortedPlayers.slice(startIndex);
    if (restOfPlayers.length <= 0) return;

    return (
      <div className="rest-of-players flex-column">
        {
          restOfPlayers.map((player, index) =>
            <div className="player flex" key={index}>
              <div className="medal-name flex">
                <div className="rank-icon-none">
                  <div className="rank-icon-sm">{index + startIndex + 1}</div>
                </div>

                <div className="leader-board-name">{player.userName}</div>
              </div>
              <div className="score">{player.score}</div>
            </div>
          )
        }

      </div>
    )
  }

  function handleRestartGame() {

  }

  return (
    <div className="mask-container flex-center-all mask rounded-rect flex-column">
      <div className="pop-up-container flex-column rounded-rect glass-rect leader-board-container">
        <div className="leader-board-title text-title">Leaderboard</div>
        <div className="picture"><img src="" alt="" /></div>
        {
          sortedPlayers && getTopThreePlayers()
        }
        {
          sortedPlayers && getRestOfPlayers()
        }
      </div>
      { isHost &&
        <div className="restart-btn flex flex-center-all" onClick={e => handleStartGame()}>
          <div className="rank-icon-none-sm restart-icon-wrapper">
            <img className="restart-icon" src={restartIcon} alt="restart icon" />
          </div>
          Restart?
        </div>
      }
    </div>
  );
}