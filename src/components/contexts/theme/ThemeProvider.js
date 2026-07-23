import React, { useMemo, useState } from "react";
import ThemeContext from "./ThemeContext";

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    function toggleTheme() {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }

    const value = useMemo(() => {
        return {
            theme,
            setTheme,
            toggleTheme,
        };
    }, [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}