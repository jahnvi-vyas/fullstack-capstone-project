import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!sessionStorage.getItem("auth-token")
    );

    const [userName, setUserName] = useState(
        sessionStorage.getItem("name") || ""
    );

    const [userEmail, setUserEmail] = useState(
        sessionStorage.getItem("email") || ""
    );

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                userName,
                setUserName,
                userEmail,
                setUserEmail,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AuthContext);
};