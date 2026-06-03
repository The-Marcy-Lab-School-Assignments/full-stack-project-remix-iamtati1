function RecentActivity({ tasks = [] }) {
    const safeTasks = Array.isArray(tasks) ? tasks : [];

    const recentTasks = safeTasks.slice(0, 5);

    return (
        <div className="flow-card p-6 space-y-4">

            <h3 className="text-lg font-semibold text-white">
                Recent Activity
            </h3>

            {recentTasks.length === 0 ? (
                <p className="text-white/40 text-sm">
                    No recent activity yet.
                </p>
            ) : (
                <div className="space-y-2">
                    {recentTasks.map((task, index) => (
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

export default RecentActivity;