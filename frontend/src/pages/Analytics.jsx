import {
    BarChart3,
    TrendingUp,
    Activity,
    CheckCircle2,
    Sparkles,
    Clock3,
} from "lucide-react";
import useTasks from "../hooks/useTasks";
import { motion } from "framer-motion";

function Analytics() {
    const stats = [
        {
            label: "Tasks Completed",
            value: "128",
            growth: "+18%",
            icon: CheckCircle2,
            color: "text-cyan-300",
        },
        {
            label: "Focus Hours",
            value: "42h",
            growth: "+12%",
            icon: Clock3,
            color: "text-violet-300",
        },
        {
            label: "Productivity Score",
            value: "92%",
            growth: "+7%",
            icon: TrendingUp,
            color: "text-pink-300",
        },
    ];

    return (
        <section className="space-y-10 fade-in">

            {/* ================= HERO ================= */}
            <div className="flow-card p-8 md:p-10 relative overflow-hidden">
                const {tasks} = useTasks();

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-violet-500/5" />

                <div className="relative z-10 max-w-4xl space-y-6">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm">
                        <Sparkles size={15} />
                        Intelligent Productivity Insights
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                        Understand your workflow{" "}
                        <span className="heading-flow">at a deeper level.</span>
                    </h1>

                    <p className="text-lg text-white/55 max-w-2xl leading-relaxed">
                        Visualize momentum, monitor productivity,
                        and discover patterns that help you stay focused daily.
                    </p>
                </div>
            </div>

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {stats.map((stat, i) => {
                    const Icon = stat.icon;

                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -5 }}
                            className="flow-card p-7 relative overflow-hidden"
                        >

                            <div className="flex items-center justify-between">

                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5">
                                    <Icon size={24} className={stat.color} />
                                </div>

                                <span className="px-3 py-1.5 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-medium">
                                    {stat.growth}
                                </span>

                            </div>

                            <div className="mt-5">
                                <p className="text-white/45 text-sm">{stat.label}</p>
                                <h2 className="text-4xl font-bold mt-2">{stat.value}</h2>
                            </div>

                        </motion.div>
                    );
                })}
            </div>

            {/* ================= VISUAL SECTION ================= */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

                {/* LEFT: CHART */}
                <div className="xl:col-span-3 flow-card p-8 relative overflow-hidden">

                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-500/5" />

                    <div className="relative z-10 space-y-8">

                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-cyan-400/10 border border-cyan-400/10">
                                <Activity size={22} className="text-cyan-300" />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold">Weekly Momentum</h3>
                                <p className="text-sm text-white/45">
                                    Your productivity rhythm this week
                                </p>
                            </div>
                        </div>

                        {/* chart */}
                        <div className="flex items-end gap-4 h-[260px]">
                            {[45, 72, 58, 90, 68, 110, 96].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: h }}
                                    transition={{ duration: 0.7, delay: i * 0.05 }}
                                    className="flex-1 rounded-t-[1.5rem] bg-gradient-to-t from-cyan-400/40 to-violet-500/50 border border-white/10"
                                />
                            ))}
                        </div>

                    </div>
                </div>

                {/* RIGHT: INSIGHTS */}
                <div className="xl:col-span-2 space-y-6">

                    <div className="flow-card p-7 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/45 uppercase tracking-wider">
                            AI Insight
                        </div>

                        <h3 className="text-2xl font-semibold">
                            Focus consistency improved by 18%
                        </h3>

                        <p className="text-white/55 leading-relaxed">
                            You perform best in morning sessions between 8 AM and 11 AM.
                        </p>
                    </div>

                    <div className="flow-card p-7 space-y-4">

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-white/45">Focus Rating</p>
                                <h2 className="text-4xl font-bold mt-2">9.2</h2>
                            </div>

                            <BarChart3 size={34} className="text-cyan-300" />
                        </div>

                        <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                            <div className="h-full w-[92%] bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" />
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

export default Analytics;