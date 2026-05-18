import { useState } from "react";

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);

    const error = await handleLogin(username, password);

    if (error) {
      setErrorMessage("Invalid username or password.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Log In</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
      />

      {errorMessage && (
        <p className="text-red-400 text-sm">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-lg"
      >
        {isLoading ? "Loading..." : "Log In"}
      </button>
    </form>
  );
}

function RegisterForm({ handleRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);

    const error = await handleRegister(username, password);

    if (error) {
      setErrorMessage(
        "Could not register. Username may already be taken."
      );
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
      />

      {errorMessage && (
        <p className="text-red-400 text-sm">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-lg"
      >
        {isLoading ? "Loading..." : "Register"}
      </button>
    </form>
  );
}

function AuthPage({ handleLogin, handleRegister }) {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">

        <h1 className="text-4xl font-bold text-center mb-2">
          TaskFlow
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Organize your goals. Build consistency.
        </p>

        {isLoginMode ? (
          <LoginForm handleLogin={handleLogin} />
        ) : (
          <RegisterForm handleRegister={handleRegister} />
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            {isLoginMode
              ? "Need an account? Register"
              : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;