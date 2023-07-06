import { useAuthUser } from "react-auth-kit";
import UserNavbar from "../components/UserNavbar";
import { Outlet } from "react-router-dom";

export default function UserRoot() {
    const auth = useAuthUser();
    const userInfo = auth();

    return (
        <>
            <div className="container">
                <UserNavbar name={userInfo.name} />
            </div>
            <div className="container">
                <Outlet />
            </div>
        </>
    );
}
