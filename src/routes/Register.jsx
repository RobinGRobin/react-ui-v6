import { useNavigate } from "react-router-dom";
import { registerUser } from "../controllers/userHandler";

export default function Register() {
    const navigate = useNavigate();

    const handleFormData = async (event) => {
        try {
            const response = await registerUser(event.target);
            response.json().then((data) => {
                console.log(data);
                alert(
                    "Usuario creado correctamente, ahora puedes iniciar sesión"
                );
                navigate("/login");
            });
        } catch (error) {
            console.log("Ha ocurrido un error: ", error);
        }
    };

    return (
        <>
            <div className="container row-form-container">
                <h1 className="brand-slogan">Registrarse</h1>
                <p className="brand-instructions">Ingresa tus datos</p>
                <form
                    onSubmit={(event) => {
                        console.log(event.target.name.value);
                        event.preventDefault();
                        handleFormData(event);
                    }}
                >
                    <div className="row row-form-container">
                        <div className="col">
                            <div className="mb-3 custom-mb">
                                <label className="form-label custom-label">
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    className="form-control custom-form"
                                    name="name"
                                    placeholder="Nombre(s) Apellido(s)"
                                />
                            </div>

                            <div className="mb-3 custom-mb">
                                <label className="form-label custom-label">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    className="form-control custom-form"
                                    name="password1"
                                    placeholder="Ingresa una contraseña"
                                />
                            </div>

                            <div className="mb-3 custom-mb">
                                <label className="form-label custom-label">
                                    Número de teléfono
                                </label>
                                <input
                                    type="text"
                                    className="form-control custom-form"
                                    name="phone"
                                    placeholder="55-5555-5555"
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3 custom-mb">
                                <label className="form-label custom-label">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    className="form-control custom-form"
                                    name="email"
                                    placeholder="ejemplo@something.com"
                                />
                            </div>

                            <div className="mb-3 custom-mb">
                                <label className="form-label custom-label">
                                    Verificar contraseña
                                </label>
                                <input
                                    type="password"
                                    className="form-control custom-form"
                                    name="password2"
                                    placeholder="Ingresa de nuevo tu contraseña"
                                />
                            </div>

                            <div className="mb-3 custom-mb">
                                <label className="form-label custom-label">
                                    Tipo de usuario
                                </label>
                                <select
                                    className="form-select custom-form"
                                    name="usertype"
                                >
                                    <option selected>Seleccionar</option>
                                    <option value="student">Estudiante</option>
                                    <option value="professor">Profesor</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row row-date-container">
                        <label className="form-label custom-label">
                            Fecha de nacimiento
                        </label>
                        <div className="col">
                            <div className="mb-3 custom-mb">
                                <label className="form-label custom-label">
                                    Día
                                </label>
                                <input
                                    type="number"
                                    className="form-control custom-form"
                                    name="dayselect"
                                    placeholder="1-31"
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3 custom-mb">
                                <label className="form-label custom-label">
                                    Mes
                                </label>
                                <select
                                    className="form-select custom-form"
                                    name="monthselect"
                                >
                                    <option selected>Seleccionar</option>
                                    <option value="1">Enero</option>
                                    <option value="2">Febrero</option>
                                    <option value="3">Marzo</option>
                                    <option value="4">Abril</option>
                                    <option value="5">Mayo</option>
                                    <option value="6">Junio</option>
                                    <option value="7">Julio</option>
                                    <option value="8">Agosto</option>
                                    <option value="9">Septiembre</option>
                                    <option value="10">Octubre</option>
                                    <option value="11">Noviembre</option>
                                    <option value="12">Diciembre</option>
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3 custom-mb">
                                <label className="form-label custom-label">
                                    Año
                                </label>
                                <input
                                    type="number"
                                    className="form-control custom-form"
                                    name="yearselect"
                                    placeholder="1998"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="container custom-btn-container">
                        <button
                            className="btn btn-primary custom-btn"
                            type="submit"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
