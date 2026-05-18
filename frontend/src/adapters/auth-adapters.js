const handleFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `Fetch failed. ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return { data, error: null };

  } catch (error) {
    return { data: null, error };
  }
};

// GET current logged-in user (session rehydration)
export const getMe = async () => {
  return handleFetch("/api/auth/me");
};

// Register new user
export const register = async (username, password) => {
  return handleFetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
};

// Login user
export const login = async (username, password) => {
  return handleFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
};

// Logout user
export const logout = async () => {
  return handleFetch("/api/auth/logout", {
    method: "DELETE",
  });
};
