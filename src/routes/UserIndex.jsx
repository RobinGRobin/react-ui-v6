import { useAuthUser } from "react-auth-kit";
import {
    registerNewClass,
    registerUserInClass,
    getProfessorClassesRegistered,
    deleteClass,
} from "../controllers/classHandler";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserIndex() {
    const auth = useAuthUser();
    const userInfo = auth();
    const [classInfo, setClassInfo] = useState([]);

    // This function makes a call to the rest API to get the user classes information
    const UserClases = async (idUser) => {
        // Rest API call
        const classes = await getProfessorClassesRegistered(idUser);
        const dataPre = JSON.parse(await classes.text());
        // Sets the state variable with the information from the database
        for (let i = 0; i < dataPre.length; i++) {
            // Verifies that there´s no data repeated
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

    const handleDeleteClasss = async (event) => {
        try {
            const response = await deleteClass(
                event.target,
                userInfo.type,
                userInfo.id
            );
            const responseJSON = JSON.parse(await response.text());
            if (responseJSON === "NO_CLASS_INFO_FOUND") {
                alert("No hay registro de la clase");
            }
            alert("Clase eliminada con éxito");
            location.reload();
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    // This function shows the user's classes register
    const ShowUserClasses = () => {
        // classInfo state hook allows to get the user classes information if there's no class register, this function won't show anything
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
            const response = await registerNewClass(data, idUser);
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
                await registerUserInClass(data, idUser)
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

    const FormDeleteClass = () => {
        if (classInfo) {
            return (
                <div className="delete-class-form">
                    <div className="col-md-7">
                        <div className="data-form-delete">
                            <p>Eliminar una clase</p>
                            <h5>Ingresa el código de acceso</h5>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    handleDeleteClasss(event);
                                }}
                            >
                                <div className="row row-form-container">
                                    <div className="col">
                                        <label className="form-label custom-label">
                                            Código de acceso
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control custom-form"
                                            name="accessCode"
                                            placeholder="Código"
                                        />
                                    </div>
                                </div>
                                <div className="submit-button-container">
                                    <button
                                        className="btn btn-primary custom-btn"
                                        type="submit"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    };

    // Shows the form to register a new class or to join a new class with an access code depending on the user type
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

    // This function is executed everytime that the component is
    // rendered in order to get the user's classes register from db
    UserClases(userInfo.id);

    return (
        <>
            <div className="user-container">
                <p>Clases registradas</p>
                <div className="class-container">
                    <div className="row">{ShowUserClasses()}</div>
                </div>
                {FormClass(userInfo.id, userInfo.type)}
                <br></br>
                {FormDeleteClass()}
            </div>
        </>
    );
}
