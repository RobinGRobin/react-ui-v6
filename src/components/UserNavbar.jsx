import { useSignOut } from "react-auth-kit";
import { Link } from "react-router-dom";

export default function UserNavbar({ name }) {
    const signOut = useSignOut();
    const logout = () => {
        signOut();
        location.replace("/");
    };
    return (
        <header className="header">
            <nav className="navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        eMotiva
                    </Link>
                    <div>
                        <Link className="btn custom-login">{name}</Link>
                        <Link className="btn custom-register" onClick={logout}>
                            Cerrar Sesión
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
