import './chartCard.css';
import ProgressBar from "@ramonak/react-progress-bar";

export default function ChartCard({ title, count, percentage }) {
  return (
    <div className="chart-card flex flex-column chart-border">
      <div className="chart-top chart-border flex-center-all flex-column">        
        <div className="chart-count">
          <span className="text-bold">{count}</span> {"time"}{(count !== 1) ? 's' : ''}
        </div>
        <div className="chart-card-title">{title}</div>
      </div>
      <div className="chart-bar-section flex">
        <div className="chart-bar">
          <ProgressBar
            completed={percentage}
            className="chart-rank-bar"
            baseBgColor={"rgba(0, 0, 0, 0.3)"}
            transitionDuration="1s"
            bgColor={"rgba(255, 255, 255, 1)"}
            labelColor="black"
            height="12px"
          />
        </div>
      </div>
    </div>
  )
}