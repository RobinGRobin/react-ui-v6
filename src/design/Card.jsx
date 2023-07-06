import "./card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

export default function Card({
    percent,
    title,
    emotion,
    professor,
    detailLink,
    monitoringLink,
}) {
    return (
        <div className="card">
            <div className="card-body">
                <h5>{title}</h5>
                {professor ? <h4>{professor}</h4> : null}
                <CircularProgressbar value={percent} text={`${percent}%`} />
                <h6>{emotion}</h6>
                <Link to={detailLink} className="details">
                    Ver detalles
                </Link>
                {!professor ? (
                    <Link to={monitoringLink} className="monitoring">
                        Iniciar monitoreo
                    </Link>
                ) : null}
            </div>
        </div>
    );
}
