import { useState, useEffect } from "react";
import { getMe, logout } from "./adapters/auth-adapters";

import AuthPage from "./components/AuthPage";
import TaskPage from "./components/TaskPage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔐 SESSION REHYDRATION
  useEffect(() => {
    const checkForSession = async () => {
      const { data, error } = await getMe();

      if (error) {
        setCurrentUser(null);
      } else {
        setCurrentUser(data);
      }

      setIsLoading(false);
    };

    checkForSession();
  }, []);

  // 🔑 LOGIN (passed to AuthPage)
  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  // 🔑 REGISTER (same pattern as login)
  const handleRegister = (user) => {
    setCurrentUser(user);
  };

  // 🚪 LOGOUT
  const handleLogout = async () => {
    const { error } = await logout();

    if (error) {
      setError("Logout failed");
      return;
    }

    setCurrentUser(null);
  };

  // ⏳ LOADING STATE (rubric requirement)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading session...</p>
      </div>
    );
  }

  return (
    <main>
      <h1>Todo App</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {currentUser ? (
        <TaskPage
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
      ) : (
        <AuthPage
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}
    </main>
  );
}

export default App;
