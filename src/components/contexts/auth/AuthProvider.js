import React, { useMemo, useState } from "react";
import AuthContext from "./AuthContext";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    function login() {
        setUser({
            id: 1,
            name: "John Doe",
            email: "john@example.com",
        });
    }

    function logout() {
        setUser(null);
    }

    const value = useMemo(() => {
        return {
            user,
            login,
            logout,
        };
    }, [user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}