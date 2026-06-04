import TaskItem from "./TaskItem";

function TaskList({
    tasks = [],
    onDelete,
    onToggle,
    onSelect,
    onEdit,
    selectedTaskId,
}) {
    console.log("🔥 TASKS:", tasks);

    if (!Array.isArray(tasks)) return null;

    return (
        <ul className="space-y-3">
            {tasks.map((task) => {
                if (!task) return null;

                const id = task.task_id; // ✅ STANDARDIZED

                return (
                    <TaskItem
                        key={id}
                        task={task}
                        onDelete={() => onDelete(id)}
                        onToggle={() => onToggle(id)}
                        onSelect={() => onSelect?.(id)}
                        onEdit={(updates) => onEdit?.(id, updates)}
                        isSelected={selectedTaskId === id}
                    />
                );
            })}
        </ul>
    );
}

export default TaskList;