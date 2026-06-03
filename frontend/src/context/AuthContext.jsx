import {
    createContext,
    useEffect,
    useState,
} from "react";

import {
    getMe,
    login,
    register,
    logout,
} from "../api/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // =====================================================
    // AUTH RESPONSE HELPER
    // =====================================================

    const handleAuthResponse = (data) => {
        const user = data?.user ?? data;

        setCurrentUser(user);

        return true;
    };

    // =====================================================
    // LOGIN
    // =====================================================

    const handleLogin = async (username, password) => {
        setError(null);

        const { data, error } = await login(
            username,
            password
        );

        if (error) {
            setError(error.message || "Login failed");
            return false;
        }

        return handleAuthResponse(data);
    };

    // =====================================================
    // REGISTER
    // =====================================================

    const handleRegister = async (username, password) => {
        setError(null);

        const { data, error } = await register(
            username,
            password
        );

        if (error) {
            setError(error.message || "Registration failed");
            return false;
        }

        return handleAuthResponse(data);
    };

    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setCurrentUser(null);
        }
    };

    // =====================================================
    // SESSION CHECK
    // =====================================================

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data, error } = await getMe();

                if (error) {
                    setCurrentUser(null);
                } else {
                    setCurrentUser(data?.user ?? data ?? null);
                }
            } catch (err) {
                console.error("Session check failed:", err);
                setCurrentUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isLoading,
                error,

                login: handleLogin,
                register: handleRegister,
                logout: handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}