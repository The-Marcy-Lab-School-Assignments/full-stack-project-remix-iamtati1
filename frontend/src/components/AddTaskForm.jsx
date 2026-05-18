import { useState } from "react";

import { createTask } from "../adapters/task-adapters";

function AddTaskForm({ loadTasks }) {
  const [title, setTitle] = useState("");

  const [priority, setPriority] = useState("medium");

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    setIsLoading(true);

    setErrorMessage(null);

    const taskData = {
      title,
      priority,
    };

    const { error } = await createTask(taskData);

    if (error) {
      setErrorMessage("Could not create task.");

      setIsLoading(false);

      return;
    }

    // 🔥 REFETCH TASKS
    await loadTasks();

    // 🔥 RESET FORM
    setTitle("");
    setPriority("medium");

    setIsLoading(false);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        Create New Task
      </h2>

      {errorMessage && (
        <p className="text-red-400 mb-4">
          {errorMessage}
        </p>
      )}

      <form
        id="add-task-form"
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* TASK TITLE */}
        <input
          type="text"
          name="title"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        />

        {/* PRIORITY */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-lg font-semibold"
        >
          {isLoading
            ? "Adding Task..."
            : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;