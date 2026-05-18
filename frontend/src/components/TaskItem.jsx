import {
  updateTask,
  deleteTask,
} from "../adapters/task-adapters";

function TaskItem({ task, loadTasks }) {

  // 🔥 TOGGLE COMPLETE
  const handleChange = async (e) => {
    const { error } = await updateTask(
      task.task_id,
      {
        is_complete: e.target.checked,
      }
    );

    if (error) {
      return console.error(error);
    }

    await loadTasks();
  };

  // 🔥 DELETE TASK
  const handleDelete = async () => {
    const { error } = await deleteTask(
      task.task_id
    );

    if (error) {
      return console.error(error);
    }

    await loadTasks();
  };

  // 🎨 PRIORITY COLORS
  const priorityColors = {
    low: "bg-green-500/20 text-green-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    high: "bg-red-500/20 text-red-400",
  };

  return (
    <li
      className="
        bg-zinc-900
        border border-zinc-800
        rounded-2xl
        p-5
        shadow-lg
        flex
        flex-col
        gap-4
      "
    >

      {/* TOP ROW */}
      <div className="flex items-start justify-between gap-4">

        {/* LEFT SIDE */}
        <div className="flex items-start gap-3">

          {/* CHECKBOX */}
          <input
            type="checkbox"
            checked={task.is_complete}
            onChange={handleChange}
            className="mt-1 h-5 w-5"
          />

          {/* TASK INFO */}
          <div>

            <h3
              className={`text-lg font-semibold ${task.is_complete
                  ? "line-through text-zinc-500"
                  : "text-white"
                }`}
            >
              {task.title}
            </h3>

            {/* PRIORITY BADGE */}
            <span
              className={`
                inline-block
                mt-2
                px-3 py-1
                rounded-full
                text-sm
                font-medium
                ${priorityColors[
                task.priority || "medium"
                ]
                }
              `}
            >
              {task.priority || "medium"} priority
            </span>
          </div>
        </div>

        {/* DELETE BUTTON */}
        <button
          className="
            bg-red-600
            hover:bg-red-500
            transition
            px-4 py-2
            rounded-lg
            font-medium
          "
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {/* OPTIONAL AI BUTTON */}
      <button
        className="
          bg-blue-600
          hover:bg-blue-500
          transition
          px-4 py-2
          rounded-lg
          font-medium
          self-start
        "
      >
        Generate AI Plan
      </button>
    </li>
  );
}

export default TaskItem;