import "./cardstudent.css";
import userAvatar from "../assets/user-avatar.png";

export default function CardStudent({ title, image }) {
    return (
        <div className="card card-student">
            <div className="card-body card-body-student">
                <h5>{title}</h5>
                <img src={userAvatar}></img>
            </div>
        </div>
    );
}
