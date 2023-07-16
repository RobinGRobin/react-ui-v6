import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import Root from "./routes/Root";
import Index from "./routes/Index";
import Login from "./routes/Login";
import Register from "./routes/Register";
import UserRoot from "./routes/UserRoot";
import UserIndex from "./routes/UserIndex";
import UserMonitoring from "./routes/UserMonitoring";
import Card from "./design/Card";
import DetailClass from "./routes/DetailClass";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Root />}>
                    <Route index element={<Index />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route
                    path="/user"
                    element={
                        <RequireAuth loginPath="/login">
                            <UserRoot />
                        </RequireAuth>
                    }
                >
                    <Route
                        path=":idUser"
                        element={
                            <RequireAuth loginPath="/login">
                                <UserIndex />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path=":idUser/:idClass/monitoring"
                        element={
                            <RequireAuth loginPath="/login">
                                <UserMonitoring />
                            </RequireAuth>
                        }
                    />
                </Route>
                <Route
                    path="/card-design-page"
                    element={<Card title={"Clase de prueba"} percent={33} />}
                />
            </Routes>
        </div>
    );
}

export default App;
