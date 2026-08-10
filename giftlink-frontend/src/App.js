import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import MainPage from "./components/MainPage/MainPage";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import SearchPage from "./components/SearchPage/SearchPage";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const authToken = sessionStorage.getItem("auth-token");

  if (!authToken) {
    return (
      <Navigate
        to="/app/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          <Route
            path="/app"
            element={<MainPage />}
          />
          <Route
            path="/app/search"
            element={<SearchPage />}
          />
          <Route
            path="/app/login"
            element={<LoginPage />}
          />
          <Route
            path="/app/register"
            element={<RegisterPage />}
          />
          <Route
            path="/app/product/:productId"
            element={
              <ProtectedRoute>
                <DetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to="/app" replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;