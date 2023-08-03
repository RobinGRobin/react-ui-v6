import "./cardemotioncomponent.css";
import React from "react";

export default function CardEmotionComponent(props) {
    return (
        <div className="card card-emotion" style={{ width: "12rem" }}>
            <div className="card-body card-emotion-body">
                <h2 className="card-emotion-title">{props.emotionTitle}</h2>
                <div className="card-emotion-group">
                    <p>{props.times}</p>
                </div>
            </div>
        </div>
    );
}
