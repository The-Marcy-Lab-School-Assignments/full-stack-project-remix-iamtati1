function WelcomeBanner({ currentUser }) {
    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
                ? "Good Afternoon"
                : "Good Evening";

    const username = currentUser?.username || "there";

    return (
        <div className="space-y-3">

            {/* HEADER */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                {greeting},{" "}
                <span className="text-cyan-300">
                    {username}
                </span>
            </h1>

            {/* ACCENT LINE */}
            <div className="w-16 h-px bg-cyan-400/40" />

            {/* SUBTEXT */}
            <p className="text-sm md:text-base text-white/50 max-w-md leading-relaxed">
                Stay focused. Small progress compounds over time.
            </p>

        </div>
    );
}

export default WelcomeBanner;