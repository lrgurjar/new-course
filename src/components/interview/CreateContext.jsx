import React, { createContext, useMemo, useState, useContext } from 'react'

const ThemeContext = createContext(null);


export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    function toggleTheme() {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }

    const value = useMemo(() => {
        return { theme, toggleTheme };
    }, [theme]);

    return (
        <>
            <ThemeContext.Provider value={value}>
                {children}
            </ThemeContext.Provider>
        </>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return context;
}

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            style={{
                background: theme === "light" ? "#ffffff" : "#222222",
                color: theme === "light" ? "#111111" : "#ffffff",
                padding: "16px",
                borderRadius: "8px",
            }}
        >
            <p>Current theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
}

const UserContext = createContext();


function Component2() {
    const [user, setUser] = useState("Linus");
    return (
        <UserContext.Provider value={user} >
            <Component3 />
        </UserContext.Provider>
    )
}
function Component3() {
    const user = useContext(UserContext);

    return (
        <>
            <h1>Component 3</h1>
            <h2>{`Hello ${user} again!`}</h2>
        </>
    );
}