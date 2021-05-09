import goldMedal from "../static/gold medal.png";
import silverMedal from "../static/silver medal.png";
import bronzeMedal from "../static/bronze medal.png";
import { useEffect, useState } from "react";
import "./leaderBoardMask.css";

export default function LeaderBoardMask({ players }) {

  const [sortedPlayers, setSortedPlayers] = useState(null);

  useEffect(() => {
    const playersToSort = players;
    playersToSort.sort((a, b) => b.score - a.score);
    setSortedPlayers(playersToSort);
  }, [sortedPlayers])

  function getTopThreePlayers() {
    const topThree = sortedPlayers.slice(0, 3);
    return (
      <div className="top-three flex-column">
        {
          (topThree.length >= 1) &&
          <div key={1} className="medal gold-medal flex slide-top">
            <div className="medal-name flex">
              <div className="rank-icon">
                <img src={goldMedal} alt="gold medal" />
              </div>
              <div className="leader-board-name">{topThree[0].userName}</div>
            </div>
            <div className="score">{topThree[0].score}</div>
          </div>
        }
        {
          (topThree.length >= 2) &&
          <div key={2} className="medal silver-medal flex slide-top">
            <div className="medal-name flex">
              <div className="rank-icon">
                <img src={silverMedal} alt="silver medal" />
              </div>
              <div className="leader-board-name">{topThree[1].userName}</div>
            </div>
            <div className="score">{topThree[1].score}</div>
          </div>
        }
        {
          (topThree.length >= 3) &&
          <div key={3} className="medal bronze-medal flex slide-top">
            <div className="medal-name flex">
              <div className="rank-icon">
                <img src={bronzeMedal} alt="bronze medal" />
              </div>
              <div className="leader-board-name">{topThree[2].userName}</div>
            </div>
            <div className="score">{topThree[2].score}</div>
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

  return (
    <div className="mask-container flex-center-all mask rounded-rect">
      <div className="pop-up-container flex flex-column rounded-rect glass-rect leader-board-container">
        <div className="leaderboard-title text-title">Leaderboard</div>
        <div className="picture"><img src="" alt="" /></div>
        {
          sortedPlayers && getTopThreePlayers()
        }
        {
          sortedPlayers && getRestOfPlayers()
        }
      </div>
    </div>
  );
}