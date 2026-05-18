function WelcomeBanner({ currentUser }) {

    // 👋 OPTIONAL TIME-BASED GREETING
    const hour = new Date().getHours();

    let greeting = "Welcome";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    return (
        <div>

            <h1 className="text-4xl font-bold">
                {greeting}, {currentUser.username}
            </h1>

            <p className="text-zinc-400 mt-2">
                Stay focused. Small progress compounds.
            </p>

        </div>
    );
}

export default WelcomeBanner;