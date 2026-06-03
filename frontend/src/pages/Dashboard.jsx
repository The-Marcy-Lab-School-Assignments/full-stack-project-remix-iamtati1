import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Sparkles,
    CheckCircle2,
    Clock3,
    BrainCircuit,
    ArrowRight,
} from "lucide-react";

function Dashboard() {
    const navigate = useNavigate();

    // =========================
    // STYLE MAPS
    // =========================
    const colorMap = {
        cyan: "bg-cyan-400/10 border-cyan-400/10",
        violet: "bg-violet-400/10 border-violet-400/10",
        pink: "bg-pink-400/10 border-pink-400/10",
    };

    // =========================
    // FEATURES DATA
    // =========================
    const features = [
        {
            icon: CheckCircle2,
            title: "Smart Task Management",
            desc: "Structured workflows with drag-and-drop precision.",
            color: "cyan",
        },
        {
            icon: Clock3,
            title: "Focused Deep Work",
            desc: "Reduce noise and maintain cognitive momentum.",
            color: "violet",
        },
        {
            icon: BrainCircuit,
            title: "AI Workflow Planning",
            desc: "Intelligent execution guidance for clarity.",
            color: "pink",
        },
    ];

    // =========================
    // UI
    // =========================
    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-16 max-w-[1400px] mx-auto"
        >
            {/* HERO */}
            <div className="flow-card relative overflow-hidden p-10 md:p-14 border border-white/10 bg-white/[0.04]">
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-400/10 blur-[120px]" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-violet-500/10 blur-[120px]" />

                <div className="relative z-10 max-w-3xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm">
                        <Sparkles size={16} />
                        Flow Productivity System
                    </div>

                    <h1 className="text-4xl font-bold text-white">
                        Design your workflow like an artist.
                    </h1>

                    <p className="text-lg text-white/60 leading-relaxed">
                        A structured productivity system blending tasks,
                        intelligence, and calm visual rhythm into one unified workspace.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button
                            className="btn-flow"
                            onClick={() => navigate("/tasks")}
                        >
                            Open Workspace
                            <ArrowRight size={18} />
                        </button>

                        <button
                            className="btn-secondary"
                            onClick={() => navigate("/analytics")}
                        >
                            Explore Analytics
                        </button>
                    </div>
                </div>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {features.map((item) => {
                    const Icon = item.icon;

                    return (
                        <motion.div
                            key={item.title}
                            whileHover={{ y: -6 }}
                            className="flow-card p-7 space-y-5 cursor-pointer"
                        >
                            <div
                                className={`
                                    w-14 h-14
                                    rounded-2xl
                                    flex items-center justify-center
                                    border
                                    ${colorMap[item.color]}
                                `}
                            >
                                <Icon className="text-white/80" size={24} />
                            </div>

                            <div>
                                <h3 className="text-white font-semibold">
                                    {item.title}
                                </h3>
                                <p className="text-white/50 text-sm mt-1">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* SHOWCASE */}
            <div className="flow-card relative overflow-hidden p-10 md:p-12">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-violet-500/5" />

                <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
                    {/* LEFT */}
                    <div className="space-y-6 max-w-xl">
                        <div className="text-sm text-white/60 px-4 py-2 border border-white/10 rounded-full bg-white/5 w-fit">
                            Premium Workflow Experience
                        </div>

                        <h2 className="text-2xl font-semibold text-white">
                            A productivity environment designed for clarity and momentum.
                        </h2>

                        <p className="text-white/60 leading-relaxed">
                            Flow organizes your attention into structured systems,
                            reducing friction and increasing execution speed.
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="relative min-h-[320px] rounded-[2rem] border border-white/10 bg-white/[0.03]">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute top-10 left-10 w-52 p-5 rounded-3xl bg-white/5 border border-white/10"
                        >
                            <p className="text-xs text-white/50">Focus Score</p>
                            <p className="text-3xl font-bold text-white">92%</p>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 7, repeat: Infinity }}
                            className="absolute bottom-10 right-10 w-60 p-5 rounded-3xl bg-white/5 border border-white/10"
                        >
                            <p className="text-xs text-white/50 mb-3">
                                Active Tasks
                            </p>

                            <div className="space-y-2">
                                <div className="h-2 bg-cyan-400/60 rounded-full w-full" />
                                <div className="h-2 bg-violet-400/60 rounded-full w-3/4" />
                                <div className="h-2 bg-pink-400/60 rounded-full w-1/2" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default Dashboard;