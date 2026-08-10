import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path="/app" element={<MainPage />} />

                <Route
                    path="/app/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/app/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/app" replace />}
                />
            </Routes>
        </>
    );
}

export default App;