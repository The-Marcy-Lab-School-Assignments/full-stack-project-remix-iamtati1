const handleFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include", // 🔥 REQUIRED for session auth
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error || `${response.status} ${response.statusText}`
      );
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

//
// 📌 GET ALL TASKS
//
export const getTasks = async () => {
  return handleFetch("/api/tasks");
};

//
// 📌 CREATE TASK
//
export const createTask = async (taskData) => {
  return handleFetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
};

//
// 📌 UPDATE TASK (toggle complete, edit, etc.)
//
export const updateTask = async (taskId, updates) => {
  return handleFetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
};

//
// 📌 DELETE TASK
//
export const deleteTask = async (taskId) => {
  return handleFetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });
};
