import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        eMotiva
                    </Link>
                    <div>
                        <Link className="btn custom-login" to="/">
                            Inicio
                        </Link>
                        <Link className="btn custom-login" to="/login">
                            Iniciar Sesión
                        </Link>
                        <Link className="btn custom-register" to="/register">
                            Registrarse
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
