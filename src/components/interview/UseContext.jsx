import React from "react";
import { useTheme } from "../contexts/theme";
import { useAuth } from "../contexts/auth";

export default function UseContextComp() {
    const { theme, toggleTheme } = useTheme();
    const { user, login, logout } = useAuth();

    return (
        <div
            style={{
                padding: "16px",
                display: "flex",
                gap: "12px",
                background: theme === "light" ? "#f4f4f4" : "#333",
                color: theme === "light" ? "#111" : "#fff",
            }}
        >
            <span>Theme: {theme}</span>
            <button onClick={toggleTheme}>Toggle Theme</button>

            <span style={{ marginLeft: "auto" }}>
                {user ? `Hello, ${user.name}` : "Not logged in"}
            </span>

            {user ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <button onClick={login}>Login</button>
            )}
        </div>
    );
}