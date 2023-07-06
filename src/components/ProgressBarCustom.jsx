import "./progressbarcustom.css";
import ProgressBar from "react-customizable-progressbar";

export default function ProgressBarCustom({ progress }) {
    return (
        <ProgressBar
            progress={progress}
            radius={60}
            strokeWidth={10}
            strokeColor="#5d9cec"
            strokeLinecap="square"
            trackStrokeWidth={10}
        >
            <div className="indicator">
                <h5>{progress}</h5>
            </div>
        </ProgressBar>
    );
}
