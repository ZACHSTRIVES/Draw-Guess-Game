import './statistics.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChartCard from './chartCard';

export default function Statistics({ data }) {
  return (
    <div className="stats">
      <div className="stats-summary flex">
        <div className="stats-left stats-first flex flex-column">
          <div className="stats-first-desc-title text-subtitle">1st Rank</div>
          <div className="progress-bar">
            <CircularProgressbar
              value={data.firstRate}
              text={`${data.firstRate}%`}
              styles={buildStyles({
                rotation: 0,
                strokeLinecap: 'round',
                textSize: '24px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(255, 255, 255, 1)`,
                textColor: '#fff',
                trailColor: 'rgba(0, 0, 0, 0.3)',
                backgroundColor: `rgba(255, 255, 255, 0.3)`
              })}
            />
          </div>
          <div className="stats-first-desc flex-center-all">
            <div className="stats-rank-time text-subtitle"><span className="text-bold">{data.firstRanks}</span> {"time"}{(data.firstRanks !== 1) ? 's' : ''}</div>
          </div>
          <div className="stats-highest-score flex-column flex-center-all">
            <div className="chart-title">Highest Score</div>
            <div><span className="text-bold">{data.highestScore}</span></div>
            <div className="chart-title">Time</div>
            <div><span className="record-col-value">{data.highestScoreDate}</span></div>
          </div>
        </div>
        <div className="stats-right flex flex-column">
          <div className="stats-rounds flex-column flex-center-all">
            <div><span className="text-bold">{data.rounds}</span></div>
            <div className="chart-title">Rounds Played</div>
          </div>
          <ChartCard title={"2nd Rank"} count={data.secondRanks} percentage={data.secondRate} />
          <ChartCard title={"3rd Rank"} count={data.thirdRanks} percentage={data.thirdRate} />
        </div>
      </div>
      <div className="records">
        <div className="record-title lobby-title text-title">
          Records
        </div>
        <div className="record-list">
          {data.history.map((history) =>
            <div className="record-card flex">
              <div className="record-rank flex flex-column record-col">
                <div className="record-col-title">Rank</div>
                <div className="record-col-value">{history.rank} / {history.players}</div>
              </div>
              <div className="record-time flex flex-column record-col">
                <div className="record-col-title">Time</div>
                <div className="record-col-value">{history.time}</div>
              </div>
              <div className="score flex flex-column record-col">
                <div className="record-col-title">Score</div>
                <div className="record-col-value">{history.score}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}