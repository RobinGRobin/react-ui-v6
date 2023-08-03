import { useEffect, useRef, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import Webcam from "react-webcam";
import { monitoring, monitoringProfessor } from "../controllers/emotionHandler";
import { Link, useParams } from "react-router-dom";
import CardEmotionComponent from "../components/CardEmotionComponent";

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
                if (times >= 20 || !webCamRef) {
                    times = 0;
                    clearInterval(intervalId);
                }
            }, 180000);
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

    // If the user is a student, this section will be executed
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

    // If the user is a teacher, this section will be executed
    if (userInfo.type === "professor") {
        emotionsInClass(idClass);
        return (
            <>
                <div className="user-emotions-container container-fluid">
                    <br />
                    <p>Emociones registradas</p>
                    <h6>
                        A continuación se muestra cada una de las emociones y el
                        número de veces que se han detectado durante el día
                    </h6>
                    <br />
                    <div className="emotions-container">
                        <CardEmotionComponent
                            emotionTitle={`CALMA`}
                            times={emotionData.calm}
                        />
                        <CardEmotionComponent
                            emotionTitle={`SORPRESA`}
                            times={emotionData.surprise}
                        />
                        <CardEmotionComponent
                            emotionTitle={`MIEDO`}
                            times={emotionData.fear}
                        />
                        <CardEmotionComponent
                            emotionTitle={`TRISTEZA`}
                            times={emotionData.sad}
                        />
                        <CardEmotionComponent
                            emotionTitle={`CONFUSIÓN`}
                            times={emotionData.confused}
                        />
                        <CardEmotionComponent
                            emotionTitle={`ENOJO`}
                            times={emotionData.angry}
                        />
                        <CardEmotionComponent
                            emotionTitle={`DISGUSTO`}
                            times={emotionData.disgusted}
                        />
                        <CardEmotionComponent
                            emotionTitle={`FELICIDAD`}
                            times={emotionData.happy}
                        />
                        <CardEmotionComponent
                            emotionTitle={`DISTRACCIÓN`}
                            times={emotionData.distracted}
                        />
                    </div>
                </div>
            </>
        );
    }
}
