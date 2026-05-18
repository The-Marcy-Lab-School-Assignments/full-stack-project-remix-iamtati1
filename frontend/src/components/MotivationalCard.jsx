function MotivationalCard({ tasks = [] }) {

    // Simple dynamic message based on progress
    const completed = tasks.filter(t => t.is_complete).length;
    const total = tasks.length;

    let message = "Start small. Build momentum.";

    if (total > 0 && completed === total) {
        message = "You finished everything, that's huge! Reset and keep going!";
    } else if (completed > 0) {
        message = "You're making progress. Keep going.";
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
                Daily Focus
            </h3>

            <p className="text-zinc-300">
                {message}
            </p>
        </div>
    );
}

export default MotivationalCard;