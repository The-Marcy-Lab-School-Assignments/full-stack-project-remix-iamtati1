import TaskItem from "./TaskItem";

function TaskList({ tasks, loadTasks }) {

  // 🔥 EMPTY STATE
  if (tasks.length === 0) {
    return (
      <div
        className="
          bg-zinc-900
          border border-zinc-800
          rounded-2xl
          p-8
          text-center
          text-zinc-400
        "
      >
        <p className="text-lg">
          No tasks yet.
        </p>

        <p className="mt-2 text-sm">
          Start by creating your first task.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.task_id}
          task={task}
          loadTasks={loadTasks}
        />
      ))}
    </ul>
  );
}

export default TaskList;
