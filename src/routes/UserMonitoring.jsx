import { useRef } from "react";
import { useAuthUser } from "react-auth-kit";
import Webcam from "react-webcam";
import { monitoring } from "../controllers/emotionHandler";
import { Link, useParams } from "react-router-dom";

export default function UserMonitoring() {
    const { idClass } = useParams();
    const auth = useAuthUser();
    const userInfo = auth();
    const webCamRef = useRef(null);

    let times = 0;
    function executeMonitoring() {
        const intervalId = setInterval(async () => {
            try {
                const imageSrc = webCamRef.current.getScreenshot();
                const emotion = await monitoring(
                    imageSrc,
                    userInfo.id,
                    idClass
                );
                console.log(
                    "Emocion obtenida en ejecución ",
                    times,
                    " --> ",
                    await emotion.text()
                );
                times++;
                if (times > 10 || !webCamRef) {
                    times = 0;
                    clearInterval(intervalId);
                }
            } catch (error) {
                console.log(error);
                clearInterval(intervalId);
            }
        }, 30000);
    }

    return (
        <>
            <Webcam
                audio={false}
                ref={webCamRef}
                height={0}
                screenshotFormat="image/jpeg"
                mirrored={true}
            />
            {executeMonitoring()}
            <div className="monitoring-container">
                <h1 className="monitoring-flag">
                    Monitoreo en marcha, atiende a la videoconferencia
                </h1>
            </div>
            <div className="monitoring-container">
                <Link
                    className="btn custom-register"
                    to={`/user/${userInfo.id}`}
                >
                    Terminar el monitoreo
                </Link>
            </div>
        </>
    );
}
