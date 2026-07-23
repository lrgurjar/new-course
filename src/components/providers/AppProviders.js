import React from "react";
import { ThemeProvider } from "../contexts/theme/ThemeProvider";
import { AuthProvider } from '../contexts/auth/AuthProvider';

export function AppProviders({ children }) {
    return (
        <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
    );
}