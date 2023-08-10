import React from "react";
import "./cardclasscomponent.css";
import { Link } from "react-router-dom";

export default function CardClassComponent(props) {
    return (
        <div className="card" style={{ width: "15rem" }}>
            <div className="card-body">
                <h2 className="card-title">{props.classTitle}</h2>
                <br />
                <h5 className="card-group">
                    Código de acceso: <br /> {props.code}
                </h5>
                <br />
                <Link
                    to={`${props.link}`}
                    className="btn custom-register card-button"
                >
                    Iniciar monitoreo
                </Link>
                <Link to={props.detailLink} className="btn custom-login">
                    Ver más
                </Link>
            </div>
        </div>
    );
}
