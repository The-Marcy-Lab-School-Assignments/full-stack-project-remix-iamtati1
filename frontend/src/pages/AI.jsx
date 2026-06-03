import { useNavigate } from "react-router-dom";

import {
    Sparkles,
    BrainCircuit,
    Wand2,
    MessageSquare,
    ArrowRight,
} from "lucide-react";

function AI() {
    const navigate = useNavigate();

    // =====================================================
    // AI TOOL CARDS
    // =====================================================

    const cards = [
        {
            title: "AI Task Planner",
            desc: "Generate structured plans from your tasks instantly.",
            icon: BrainCircuit,
            route: "/ai/planner",
        },
        {
            title: "Smart Suggestions",
            desc: "Get productivity recommendations based on your habits.",
            icon: Sparkles,
            route: "/ai/suggestions",
        },
        {
            title: "Quick Assistant",
            desc: "Ask questions and get instant workflow help.",
            icon: MessageSquare,
            route: "/ai/assistant",
        },
        {
            title: "Automation Builder",
            desc: "Create intelligent task flows with AI assistance.",
            icon: Wand2,
            route: "/ai/automation",
        },
    ];

    return (
        <section className="space-y-10 fade-in max-w-[1400px] mx-auto">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="flow-card p-10 relative overflow-hidden">

                <div className="
                    absolute inset-0
                    bg-gradient-to-br
                    from-cyan-400/5
                    to-violet-500/5
                " />

                <div className="relative z-10 space-y-6">

                    <div className="
                        inline-flex items-center gap-2
                        px-4 py-2
                        rounded-full
                        border border-white/10
                        bg-white/5
                        text-white/60 text-sm
                    ">
                        <Sparkles size={16} />
                        AI Workspace
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-4xl font-bold text-white">
                            Your AI command center
                        </h1>

                        <p className="text-white/50 max-w-xl leading-relaxed">
                            Access intelligent tools to plan, optimize, and automate your workflow.
                        </p>
                    </div>

                </div>
            </header>

            {/* =====================================================
                GRID
            ===================================================== */}

            <div className="
                grid grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
            ">

                {cards.map(({ title, desc, icon: Icon, route }) => (
                    <button
                        key={title}
                        onClick={() => navigate(route)}
                        className="
                            flow-card
                            text-left
                            p-6
                            group

                            transition-all duration-300
                            hover:-translate-y-2
                            hover:border-white/20
                        "
                    >

                        {/* ICON */}
                        <div className="
                            w-12 h-12
                            rounded-2xl
                            flex items-center justify-center
                            bg-white/5 border border-white/10
                            mb-4
                        ">
                            <Icon className="text-cyan-300" size={20} />
                        </div>

                        {/* CONTENT */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">
                                {title}
                            </h3>

                            <p className="text-sm text-white/50">
                                {desc}
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="
                            mt-4
                            flex items-center gap-2
                            text-sm text-cyan-300

                            opacity-0
                            group-hover:opacity-100
                            transition
                        ">
                            Open Tool
                            <ArrowRight size={16} />
                        </div>

                    </button>
                ))}

            </div>

        </section>
    );
}

export default AI;