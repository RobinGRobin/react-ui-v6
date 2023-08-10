import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import Root from "./routes/Root";
import Index from "./routes/Index";
import Login from "./routes/Login";
import Register from "./routes/Register";
import UserRoot from "./routes/UserRoot";
import UserIndex from "./routes/UserIndex";
import UserMonitoring from "./routes/UserMonitoring";
import UserDetail from "./routes/UserDetail";

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
                    <Route
                        path=":idUser/:idClass/detail"
                        element={
                            <RequireAuth loginPath="/login">
                                <UserDetail />
                            </RequireAuth>
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
