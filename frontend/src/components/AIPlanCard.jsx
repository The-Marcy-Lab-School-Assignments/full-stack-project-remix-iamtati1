function AIPlanCard({ task }) {

    if (!task) {
        return (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <h2 className="text-xl font-bold mb-2">
                    AI Task Planner
                </h2>

                <p className="text-zinc-400">
                    Select a task to generate a plan.
                </p>
            </div>
        );
    }

    // 🧠 MOCK AI LOGIC (simple but effective)
    const generateSteps = (title) => [
        `Understand what "${title}" requires`,
        `Break "${title}" into small subtasks`,
        `Start with the easiest step first`,
        `Complete and review progress`
    ];

    const steps = generateSteps(task.title);

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">

            <h2 className="text-xl font-bold mb-4">
                AI Task Plan
            </h2>

            <p className="text-zinc-400 mb-3">
                Task: <span className="text-white">{task.title}</span>
            </p>

            <ul className="space-y-2">
                {steps.map((step, index) => (
                    <li
                        key={index}
                        className="bg-zinc-800 p-2 rounded"
                    >
                        Step {index + 1}: {step}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AIPlanCard;