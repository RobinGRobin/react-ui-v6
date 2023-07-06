import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Root() {
    return (
        <>
            <div className="containter">
                <Navbar />
            </div>
            <div className="container">
                <Outlet />
            </div>
        </>
    );
}

export default Root;
