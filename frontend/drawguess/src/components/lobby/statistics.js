import './statistics.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChartCard from './chartCard';

export default function Statistics({ data }) {
  const percentage = 60;

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
            <div className="stats-rank-time text-subtitle"><span className="text-bold">{data.firstRanks}</span> times</div>
          </div>
        </div>
        <div className="stats-right flex flex-column">
          <div className="stats-rounds flex-column flex-center-all">
            <div><span className="text-bold">{data.rounds}</span></div>
            <div className="chart-title">Rounds Played</div>
          </div>
          <ChartCard title={"2nd Rank"} count={data.secondRanks} percentage={data.secondRate} />
          <ChartCard title={"3rd Rank"} count={data.thirdRanks} percentage={data.thirdRate} />
          {/* <div className="stats-second stats-rank flex">
            <div className="stats-rank-title text-subtitle">
              <div className="stats-rank-title-desc flex">
                <ProgressBar
                  completed={60}
                  className="stats-rank-bar"
                  baseBgColor={"rgba(0, 0, 0, 0.3)"}
                  transitionDuration="1s"
                  bgColor={"rgba(255, 255, 255, 1)"}
                  labelColor="black"
                  height="12px"
                />
              </div>
            </div>
            <div className="stats-rank-desc text-subtitle">2nd Rank</div>
          </div> */}
          {/* <div className="stats-third stats-rank flex">
            <div className="stats-rank-title text-subtitle">
              <div className="stats-rank-title-desc flex">
                <ProgressBar
                  completed={30}
                  className="stats-rank-bar"
                  baseBgColor={"rgba(0, 0, 0, 0.3)"}
                  transitionDuration="1s"
                  bgColor={"rgba(255, 255, 255, 1)"}
                  labelColor="black"
                  height="12px"
                />
              </div>
            </div>
            <div className="stats-rank-desc text-subtitle">3rd Rank</div>
          </div> */}
        </div>

        {/* <div className="stats-rounds flex-column stats-bubble stats-ball">
          <div className="stats-bubble-title">Rounds</div>
          <div className="stats-bubble-value">3</div>
        </div>
        <div className="stats-first flex-column stats-bubble stats-ball">
          <div className="stats-bubble-title">1st</div>
          <div className="stats-bubble-value">2</div>
        </div> */}
      </div>
      <div className="records">
        <div className="record-title lobby-title text-title">
          Records
        </div>
        <div className="record-list">
          {/* map */}
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