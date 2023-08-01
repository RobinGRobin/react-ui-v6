import { useEffect, useRef, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import Webcam from "react-webcam";
import { monitoring, monitoringProfessor } from "../controllers/emotionHandler";
import { Link, useParams } from "react-router-dom";

export default function UserMonitoring() {
    const { idClass } = useParams();
    const auth = useAuthUser();
    const userInfo = auth();
    const webCamRef = useRef(null);
    const [emotionData, setEmotionData] = useState({
        calm: "",
        surprise: "",
        fear: "",
        sad: "",
        confused: "",
        angry: "",
        disgusted: "",
        happy: "",
        distracted: "",
    });

    function executeMonitoring() {
        let times = 0;
        useEffect(() => {
            const intervalId = setInterval(async () => {
                const imageSrc = webCamRef.current.getScreenshot();
                const emotion = await monitoring(
                    imageSrc,
                    userInfo.id,
                    idClass
                );
                times++;
                if (times >= 10 || !webCamRef) {
                    times = 0;
                    clearInterval(intervalId);
                }
            }, 3000);
        }, []);
    }

    async function emotionsInClass(idClass) {
        let dataClass;
        if (emotionData.angry === "") {
            dataClass = await monitoringProfessor(idClass);
        }
        const jsonData = JSON.parse(await dataClass.text());
        setEmotionData({
            calm: jsonData.filter((element) => element.name === "CALM").length,
            surprise: jsonData.filter((element) => element.name === "SURPRISED")
                .length,
            fear: jsonData.filter((element) => element.name === "FEAR").length,
            sad: jsonData.filter((element) => element.name === "SAD").length,
            confused: jsonData.filter((element) => element.name === "CONFUSED")
                .length,
            angry: jsonData.filter((element) => element.name === "ANGRY")
                .length,
            disgusted: jsonData.filter(
                (element) => element.name === "DISGUSTED"
            ).length,
            happy: jsonData.filter((element) => element.name === "HAPPY")
                .length,
            distracted: jsonData.filter(
                (element) => element.name === "NO_FACE_DETECTED"
            ).length,
        });
    }

    emotionsInClass(idClass);

    if (userInfo.type === "student") {
        return (
            <>
                <div className="row cam-container">
                    <Webcam
                        audio={false}
                        ref={webCamRef}
                        height={200}
                        screenshotFormat="image/png"
                        mirrored={true}
                    />
                </div>
                {executeMonitoring()}
                <div className="monitoring-container">
                    <h1 className="monitoring-flag">
                        Monitoreo en marcha, atiende a la videoconferencia.
                        Cuando se te indique, pulsa el botón para terminar el
                        monitoreo.
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

    if (userInfo.type === "professor") {
        return (
            <>
                {
                    <div className="user-container">
                        <p>Emociones registradas</p>
                        <div className="class-container">
                            <h3>CALMA: {emotionData.calm}</h3>
                            <h3>SORPRESA: {emotionData.surprise}</h3>
                            <h3>MIEDO: {emotionData.fear}</h3>
                            <h3>TRISTEZA: {emotionData.sad}</h3>
                            <h3>CONFUSIÓN: {emotionData.confused}</h3>
                            <h3>ENOJO: {emotionData.angry}</h3>
                            <h3>DISGUSTO: {emotionData.disgusted}</h3>
                            <h3>FELICIDAD: {emotionData.happy}</h3>
                            <h3>DISTRAIDO: {emotionData.distracted}</h3>
                        </div>
                    </div>
                }
            </>
        );
    }
}
