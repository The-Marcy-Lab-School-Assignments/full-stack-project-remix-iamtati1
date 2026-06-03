function UpcomingTasks({ tasks = [] }) {
    const safeTasks = Array.isArray(tasks) ? tasks : [];

    const upcoming = safeTasks
        .filter(task => !task?.is_complete)
        .slice(0, 5);

    return (
        <div className="flow-card p-6 space-y-4">

            <h3 className="text-lg font-semibold text-white">
                Upcoming Tasks
            </h3>

            {upcoming.length === 0 ? (
                <p className="text-white/40 text-sm">
                    No upcoming tasks.
                </p>
            ) : (
                <div className="space-y-2">
                    {upcoming.map((task, index) => (
                        <div
                            key={task?.task_id || index}
                            className="text-sm text-white/70 flex items-start gap-2"
                        >
                            <span className="text-white/30">•</span>
                            <span>{task?.title || "Untitled task"}</span>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default UpcomingTasks;