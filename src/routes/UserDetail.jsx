import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";
import {
    getClassDetail,
    getStudentsInClass,
} from "../controllers/classHandler";
import {
    emotionStudentByClass,
    monitoringProfessor,
} from "../controllers/emotionHandler";
import BarChart from "../components/BarChart";

function UserDetail() {
    const auth = useAuthUser();
    const userInfo = auth();
    const { idClass } = useParams();
    const [detailClass, setDetailClass] = useState({
        name: "",
        group: "",
        accessCode: "",
        professorId: "",
        students: [],
    });

    const [studentData, setStudentData] = useState();

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

    const [studentEmotions, setStudentEmotions] = useState({
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
    // 1. Get the class information
    const getClassInfo = async () => {
        // Get class' data
        var infoClass = JSON.parse(
            await (await getClassDetail(idClass)).text()
        );
        setDetailClass({
            id: infoClass._id,
            name: infoClass.name,
            group: infoClass.group,
            accessCode: infoClass.accessCode,
            professorId: infoClass.professorId,
            students: infoClass.students,
        });
        // Get student's data
        var studentsClass = JSON.parse(
            await (await getStudentsInClass(idClass)).text()
        );
        setStudentData(studentsClass);
    };

    // 2. Get group emotions
    const emotionsInClass = async (idClass) => {
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
    };

    // 3. Get student emotions
    const getstudentEmotions = async (idStudent, idClass) => {
        let dataStudent = [];
        if (studentEmotions.angry === "") {
            dataStudent = await emotionStudentByClass(idStudent, idClass);
        }
        const studentEmotionsJSON = JSON.parse(await dataStudent.text());
        console.log(studentEmotionsJSON);
        setStudentEmotions({
            calm: studentEmotionsJSON.filter(
                (element) => element.name === "CALM"
            ).length,
            surprise: studentEmotionsJSON.filter(
                (element) => element.name === "SURPRISED"
            ).length,
            fear: studentEmotionsJSON.filter(
                (element) => element.name === "FEAR"
            ).length,
            sad: studentEmotionsJSON.filter((element) => element.name === "SAD")
                .length,
            confused: studentEmotionsJSON.filter(
                (element) => element.name === "CONFUSED"
            ).length,
            angry: studentEmotionsJSON.filter(
                (element) => element.name === "ANGRY"
            ).length,
            disgusted: studentEmotionsJSON.filter(
                (element) => element.name === "DISGUSTED"
            ).length,
            happy: studentEmotionsJSON.filter(
                (element) => element.name === "HAPPY"
            ).length,
            distracted: studentEmotionsJSON.filter(
                (element) => element.name === "NO_FACE_DETECTED"
            ).length,
        });
    };

    // Execute function in 1 when the component is rendered
    useEffect(() => {
        getClassInfo();
    }, []);

    const showStudentsInClass = () => {
        if (studentData) {
            return studentData.map((student, index) => {
                return (
                    <tr key={student._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.email}</td>
                    </tr>
                );
            });
        }
    };

    if (userInfo.type === "professor") {
        emotionsInClass(idClass);
        return (
            <div className="user-container">
                <p style={{ textAlign: "center" }}>{detailClass.name}</p>
                <br />
                <br />
                <p>Alumnos registrados</p>
                <table className="table table-dark table-striped students-table">
                    <thead>
                        <tr className="">
                            <th scope="col">No.</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Contacto</th>
                        </tr>
                    </thead>
                    <tbody>{showStudentsInClass()}</tbody>
                </table>
                <br />
                <br />
                <p>Emociones registradas en la clase</p>
                <h6>
                    A continuación se muestra el numero de emociones detectadas
                    por cada tipo de emoción
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
            </div>
        );
    }

    if (userInfo.type === "student") {
        getstudentEmotions(userInfo.id, idClass);
        return (
            <div className="user-container">
                <p style={{ textAlign: "center" }}>{detailClass.name}</p>
                <br />
                <br />
                <p>Emociones registradas en la clase</p>
                <h6>
                    A continuación se muestra el numero de emociones detectadas
                    por cada tipo de emoción
                </h6>
                <br />
                <div
                    className="emotion-graph-container"
                    style={{ width: "700px", height: "350px" }}
                >
                    <BarChart
                        numEmotions={[
                            `${studentEmotions.calm}`,
                            `${studentEmotions.surprise}`,
                            `${studentEmotions.fear}`,
                            `${studentEmotions.sad}`,
                            `${studentEmotions.confused}`,
                            `${studentEmotions.angry}`,
                            `${studentEmotions.disgusted}`,
                            `${studentEmotions.happy}`,
                            `${studentEmotions.distracted}`,
                        ]}
                    />
                </div>
            </div>
        );
    }
}

export default UserDetail;
