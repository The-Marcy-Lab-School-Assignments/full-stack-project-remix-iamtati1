function AnalyticsPanel({
    totalTasks = 0,
    completedTasks = 0,
    completionRate = 0,
}) {

    // 🔥 SIMPLE INSIGHT LOGIC
    let insight = "Start completing tasks to see insights.";

    if (totalTasks > 0 && completionRate === 100) {
        insight = "Perfect score. You completed everything 🎉";
    } else if (completionRate >= 50) {
        insight = "You’re more than halfway there. Keep going.";
    } else if (totalTasks > 0) {
        insight = "Focus on completing your current tasks.";
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">

            <h2 className="text-xl font-bold mb-4">
                Progress Overview
            </h2>

            {/* STATS */}
            <div className="space-y-2 text-zinc-300">

                <p>
                    Total Tasks:{" "}
                    <span className="text-white font-semibold">
                        {totalTasks}
                    </span>
                </p>

                <p>
                    Completed:{" "}
                    <span className="text-white font-semibold">
                        {completedTasks}
                    </span>
                </p>

                <p>
                    Completion Rate:{" "}
                    <span className="text-white font-semibold">
                        {completionRate}%
                    </span>
                </p>
            </div>

            {/* INSIGHT BOX */}
            <div className="mt-4 p-3 bg-zinc-800 rounded-lg">
                <p className="text-sm text-zinc-300">
                    {insight}
                </p>
            </div>
        </div>
    );
}

export default AnalyticsPanel;