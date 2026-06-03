import {
    createContext,
    useContext,
    useState,
} from "react";

const NotificationContext = createContext(null);

// =====================================================
// PROVIDER
// =====================================================

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    // =========================
    // ADD NOTIFICATION
    // =========================
    const addNotification = (message, type = "info") => {
        const newNotification = {
            id: crypto?.randomUUID?.() ?? Date.now(),
            message,
            type,
        };

        setNotifications((prev) => [...prev, newNotification]);
    };

    // =========================
    // REMOVE NOTIFICATION
    // =========================
    const removeNotification = (id) => {
        setNotifications((prev) =>
            prev.filter((n) => n.id !== id)
        );
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                removeNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

// =====================================================
// HOOK
// =====================================================

export function useNotifications() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotifications must be used within a NotificationProvider"
        );
    }

    return context;
}