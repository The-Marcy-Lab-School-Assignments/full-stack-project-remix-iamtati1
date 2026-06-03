import {
    Sparkles,
    CheckCircle2,
    Clock3,
    BrainCircuit,
    ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <section className="space-y-10 fade-in">

            {/* =====================================================
                HERO (PRIMARY ENTRY)
            ===================================================== */}

            <div className="flow-card p-8 md:p-12 relative overflow-hidden">

                {/* ambient glow layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-500/5" />

                <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-500/10 blur-[120px] rounded-full" />

                <div className="relative z-10 max-w-4xl">

                    <div className="
                        inline-flex items-center gap-2
                        px-4 py-2
                        rounded-full
                        border border-white/10
                        bg-white/[0.04]
                        text-white/70 text-sm
                        mb-6
                    ">
                        <Sparkles size={16} />
                        Flow Productivity System
                    </div>

                    <h1 className="text-hero heading-flow text-glow max-w-3xl">
                        Design your workflow like an artist.
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
                        A focused productivity space blending task management,
                        intelligent planning, and calming visual design into one modern workflow experience.
                    </p>

                    {/* PRIMARY CTA ONLY (CLEAN SYSTEM) */}
                    <div className="flex flex-wrap gap-4 mt-10">
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

            {/* =====================================================
                FEATURE GRID
            ===================================================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <div className="flow-card p-7 space-y-5 hover-lift">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-cyan-400/10 border border-cyan-400/10">
                        <CheckCircle2 className="text-cyan-300" size={26} />
                    </div>

                    <div>
                        <h3 className="card-title">Smart Task Management</h3>
                        <p className="card-subtitle leading-relaxed">
                            Organize your workflow with elegant drag-and-drop interactions and structured task flows.
                        </p>
                    </div>
                </div>

                <div className="flow-card p-7 space-y-5 hover-lift">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-violet-500/10 border border-violet-500/10">
                        <Clock3 className="text-violet-300" size={26} />
                    </div>

                    <div>
                        <h3 className="card-title">Focused Deep Work</h3>
                        <p className="card-subtitle leading-relaxed">
                            Reduce distractions and build momentum through calm, structured productivity design.
                        </p>
                    </div>
                </div>

                <div className="flow-card p-7 space-y-5 hover-lift">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-pink-500/10 border border-pink-500/10">
                        <BrainCircuit className="text-pink-300" size={26} />
                    </div>

                    <div>
                        <h3 className="card-title">AI Workflow Planning</h3>
                        <p className="card-subtitle leading-relaxed">
                            Intelligent suggestions, planning support, and workflow insights powered by AI.
                        </p>
                    </div>
                </div>

            </div>

            {/* =====================================================
                SHOWCASE
            ===================================================== */}

            <div className="flow-card p-8 md:p-10 relative overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-500/5" />

                <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">

                    <div className="space-y-6">

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                            Premium Workflow Experience
                        </div>

                        <h2 className="text-title leading-tight">
                            A productivity environment designed for clarity, creativity, and momentum.
                        </h2>

                        <p className="text-white/60 leading-relaxed">
                            Flow combines modern aesthetics with structured task systems to keep users focused and visually inspired.
                        </p>

                    </div>

                    <div className="relative min-h-[320px] rounded-[2rem] border border-white/10 bg-white/[0.03] overflow-hidden">

                        <div className="absolute top-10 left-10 w-52 p-5 rounded-3xl bg-white/[0.06] border border-white/10 backdrop-blur-xl rotate-[-6deg] shadow-2xl">
                            <div className="text-xs text-white/50 mb-2">Focus Score</div>
                            <div className="text-4xl font-bold">92%</div>
                        </div>

                        <div className="absolute bottom-12 right-10 w-60 p-5 rounded-3xl bg-white/[0.06] border border-white/10 backdrop-blur-xl rotate-[5deg] shadow-2xl">
                            <div className="text-xs text-white/50 mb-3">Active Tasks</div>
                            <div className="space-y-3">
                                <div className="h-2 rounded-full bg-cyan-400/60 w-full" />
                                <div className="h-2 rounded-full bg-violet-400/60 w-3/4" />
                                <div className="h-2 rounded-full bg-pink-400/60 w-1/2" />
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Dashboard;