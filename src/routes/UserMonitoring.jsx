import { useEffect, useRef, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import Webcam from "react-webcam";
import {
    monitoring,
    monitoringProfessor,
    monitoringProfessorToday,
} from "../controllers/emotionHandler";
import { Link, useParams } from "react-router-dom";
import BarChart from "../components/BarChart";
import { getClassDetail } from "../controllers/classHandler";

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
    const [emotionDataToday, setEmotionDataToday] = useState({
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
    const [detailClass, setDetailClass] = useState({
        name: "",
        group: "",
        accessCode: "",
    });

    async function getClassData() {
        let detailClassFetch;
        if (detailClass.name === "") {
            detailClassFetch = await getClassDetail(idClass);
        }
        const jsonDetailClass = JSON.parse(await detailClassFetch.text());
        console.log(jsonDetailClass);
        setDetailClass({
            name: jsonDetailClass.name,
            group: jsonDetailClass.group,
            accessCode: jsonDetailClass.accessCode,
        });
    }

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

    async function emotionsInClassToday(idClass) {
        let dataClassToday;
        if (emotionDataToday.angry === "") {
            // avoid executing the function everytime
            dataClassToday = await monitoringProfessorToday(idClass);
        }
        const jsonDataToday = JSON.parse(await dataClassToday.text());
        setEmotionDataToday({
            calm: jsonDataToday.filter((element) => element.name === "CALM")
                .length,
            surprise: jsonDataToday.filter(
                (element) => element.name === "SURPRISED"
            ).length,
            fear: jsonDataToday.filter((element) => element.name === "FEAR")
                .length,
            sad: jsonDataToday.filter((element) => element.name === "SAD")
                .length,
            confused: jsonDataToday.filter(
                (element) => element.name === "CONFUSED"
            ).length,
            angry: jsonDataToday.filter((element) => element.name === "ANGRY")
                .length,
            disgusted: jsonDataToday.filter(
                (element) => element.name === "DISGUSTED"
            ).length,
            happy: jsonDataToday.filter((element) => element.name === "HAPPY")
                .length,
            distracted: jsonDataToday.filter(
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
        getClassData();
        emotionsInClass(idClass);
        emotionsInClassToday(idClass);
        return (
            <>
                <div className="user-emotions-container container-fluid">
                    <br />
                    <p style={{ textAlign: "center" }}>{detailClass.name}</p>
                    <br />
                    <br />
                    <p>Emociones registradas en la clase</p>
                    <h6>
                        A continuación se muestra el numero de emociones
                        detectadas por cada tipo de emoción
                    </h6>
                    <br />
                    <div
                        className="emotion-graph-container"
                        style={{ width: "700px", height: "350px" }}
                    >
                        <BarChart
                            numEmotions={[
                                `${emotionData.calm}`,
                                `${emotionData.surprise}`,
                                `${emotionData.fear}`,
                                `${emotionData.sad}`,
                                `${emotionData.confused}`,
                                `${emotionData.angry}`,
                                `${emotionData.disgusted}`,
                                `${emotionData.happy}`,
                                `${emotionData.distracted}`,
                            ]}
                        />
                    </div>
                    <br />
                    <br />
                    <p>Emociones registradas durante el día</p>
                    <h6>
                        A continuación se muestra cada una de las emociones y el
                        número de veces que se han detectado durante el día
                    </h6>
                    <br />
                    <div
                        className="emotion-graph-container"
                        style={{ width: "700px", height: "350px" }}
                    >
                        <BarChart
                            numEmotions={[
                                `${emotionDataToday.calm}`,
                                `${emotionDataToday.surprise}`,
                                `${emotionDataToday.fear}`,
                                `${emotionDataToday.sad}`,
                                `${emotionDataToday.confused}`,
                                `${emotionDataToday.angry}`,
                                `${emotionDataToday.disgusted}`,
                                `${emotionDataToday.happy}`,
                                `${emotionDataToday.distracted}`,
                            ]}
                        />
                    </div>
                    <br />
                    <br />
                </div>
            </>
        );
    }
}
