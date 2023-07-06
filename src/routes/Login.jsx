import { useSignIn } from "react-auth-kit";
import { loginUser } from "../controllers/userHandler";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const signIn = useSignIn();
    const navigate = useNavigate();

    const handleFormLogin = async (event) => {
        try {
            const response = await loginUser(event.target);
            response.json().then((data) => {
                signIn({
                    token: data.token,
                    tokenType: "Bearer",
                    expiresIn: 120,
                    authState: {
                        name: data.user.name,
                        email: data.user.email,
                        id: data.user._id,
                        type: data.user.typeUser,
                    },
                });
                navigate(`/user/${data.user._id}`);
            });
        } catch (error) {
            alert("Ha ocurrido un error", error);
        }
    };

    return (
        <div className="container row-form-container">
            <h1 className="brand-slogan">Iniciar sesión</h1>
            <p className="brand-instructions">Ingresa tus datos</p>

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleFormLogin(event);
                }}
            >
                <div className="row row-form-container">
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
                    </div>
                    <div className="col">
                        <div className="mb-3 custom-mb">
                            <label className="form-label custom-label">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                className="form-control custom-form"
                                name="passwordLogin"
                                placeholder="Ingresa una contraseña"
                            />
                        </div>
                    </div>
                </div>

                <div className="container custom-btn-container">
                    <button
                        className="btn btn-primary custom-btn"
                        type="submit"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </div>
    );
}
