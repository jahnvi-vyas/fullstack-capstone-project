import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/app" element={<MainPage />} />

                <Route
                    path="/"
                    element={<Navigate to="/app" replace />}
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