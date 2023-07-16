import { useAuthUser } from "react-auth-kit";
import {
    registerNewClass,
    registerUserInClass,
    getProfessorClassesRegistered,
} from "../controllers/classHandler";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserIndex() {
    const auth = useAuthUser();
    const userInfo = auth();
    console.log("UserInfo: ", userInfo);
    console.log("User token: ", userInfo.token);
    const [classInfo, setClassInfo] = useState([]);

    const UserClases = async (idUser) => {
        const classes = await getProfessorClassesRegistered(
            idUser,
            userInfo.token
        );
        const dataPre = JSON.parse(await classes.text());
        for (let i = 0; i < dataPre.length; i++) {
            if (
                !classInfo.find((element) => element.name === dataPre[i].name)
            ) {
                setClassInfo(
                    classInfo.concat({
                        name: dataPre[i].name,
                        accessCode: dataPre[i].accessCode,
                        idClass: dataPre[i]._id,
                    })
                );
            }
        }
    };

    const ShowUserClasses = () => {
        return classInfo.map((item) => (
            <div className="row" key={item.name}>
                <div className="col">
                    <Link className="btn custom-access">
                        Access code: {item.accessCode}
                    </Link>
                </div>
                <div className="col">
                    <h3>{item.name}</h3>
                </div>
                <div className="col">
                    <Link
                        className="btn custom-register"
                        to={`/user/${userInfo.id}/${item.idClass}/monitoring`}
                    >
                        Iniciar Monitoreo
                    </Link>
                </div>
            </div>
        ));
    };

    const handleSubmitProfessor = async (event, idUser) => {
        const data = event.target;
        try {
            const response = await registerNewClass(
                data,
                idUser,
                userInfo.token
            );
            const dataReceived = await response.text();
            if (dataReceived === "CLASS_ALREADY_REGISTERED") {
                alert("La clase ya está registrada");
            } else {
                const Message = "Clase registrada: " + dataReceived;
                alert(Message);
                location.reload();
            }
        } catch (error) {
            console.log(error);
            alert("Ha ocurrido un error", error);
        }
    };

    const handleSubmitStudent = async (event, idUser) => {
        const data = event.target;
        try {
            const response = await (
                await registerUserInClass(data, idUser, userInfo.token)
            ).text();
            if (response === "USER_ALREADY_IN_CLASS") {
                alert("El ususario ya esta registrado en la clase");
            } else {
                alert("Se ha unido a la clase exitosamente");
                location.reload();
            }
        } catch (error) {
            console.log(error), alert("Ha ocurrido un error");
        }
    };

    const FormClass = (idUser, userType) => {
        if (userType === "professor") {
            return (
                <div className="new-class-container">
                    <div className="data-form">
                        <p>Registrar una nueva clase</p>
                        <h5>Ingresa los datos de la nueva clase</h5>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleSubmitProfessor(event, idUser);
                            }}
                        >
                            <div className="row row-form-container">
                                <div className="col">
                                    <div className="mb-3 custom-mb">
                                        <label className="form-label custom-label">
                                            Nombre de la clase
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control custom-form"
                                            name="nombreClase"
                                            placeholder="Nombre de la clase"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3 custom-mb">
                                        <label className="form-label custom-label">
                                            Grupo
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control custom-form"
                                            name="grupoClase"
                                            placeholder="Ingresa un identificador"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="submit-button-container">
                                <button
                                    className="btn btn-primary custom-btn"
                                    type="submit"
                                >
                                    Registrar clase
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        if (userType === "student") {
            return (
                <div className="new-class-container">
                    <div className="data-form">
                        <p>Unirse a una clase</p>
                        <h5>Ingresa el código de la clase</h5>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleSubmitStudent(event, idUser);
                            }}
                        >
                            <div className="row row-form-container">
                                <div className="col">
                                    <div className="mb-3 custom-mb">
                                        <label className="form-label custom-label">
                                            Código de la clase de la clase
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control custom-form"
                                            name="accessCode"
                                            placeholder="Código de la clase"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="submit-button-container">
                                <button
                                    className="btn btn-primary custom-btn"
                                    type="submit"
                                >
                                    Unirse
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    };

    // Ejecutar UserClasses para obtener las materias registradas
    UserClases(userInfo.id);

    return (
        <>
            <div className="user-container">
                <p>Clases registradas</p>
                <div className="class-container">
                    <div className="row">{ShowUserClasses()}</div>
                </div>
                {FormClass(userInfo.id, userInfo.type)}
            </div>
        </>
    );
}
