import {
    Bell,
    Shield,
    Sparkles,
    Moon,
    Palette,
    BrainCircuit,
    User,
    LogOut,
    Check,
    Monitor,
    Zap,
} from "lucide-react";

import { motion } from "framer-motion";

/* =====================================================
   DATA (move to config layer later if needed)
===================================================== */

const appearanceOptions = ["Glass", "Midnight", "Aurora"];

const aiSettings = [
    "Smart task prioritization",
    "AI workflow suggestions",
    "Focus session recommendations",
    "Productivity insights",
];

const quickSettings = [
    { icon: Bell, label: "Notifications" },
    { icon: Moon, label: "Focus Mode" },
    { icon: Monitor, label: "Desktop Layout" },
];

/* =====================================================
   PAGE
===================================================== */

function Settings() {
    return (
        <section className="space-y-10 fade-in">

            {/* HEADER */}
            <div className="flow-card p-8 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-400/10 blur-[120px]" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-500/10 blur-[120px]" />

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm mb-6">
                        <Sparkles size={15} />
                        Workspace Settings
                    </div>

                    <h1 className="text-4xl font-bold text-white">
                        Personalize your workspace
                    </h1>

                    <p className="mt-4 text-white/50 max-w-2xl">
                        Customize appearance, AI behavior, and workflow preferences.
                    </p>
                </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* LEFT */}
                <div className="xl:col-span-2 space-y-6">

                    {/* APPEARANCE */}
                    <div className="flow-card p-7 space-y-6">
                        <SectionHeader
                            icon={Palette}
                            title="Appearance"
                            subtitle="Visual styling and theme options"
                            color="text-cyan-300"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {appearanceOptions.map((theme) => (
                                <button
                                    key={theme}
                                    className="
                                        group cursor-pointer
                                        rounded-2xl
                                        border border-white/10
                                        bg-white/[0.04]
                                        p-4
                                        hover:bg-white/[0.06]
                                        hover:-translate-y-1
                                        transition
                                        text-left
                                    "
                                >
                                    <div className="h-20 rounded-xl bg-gradient-to-br from-[#101726] to-[#1a2035] mb-3" />
                                    <p className="text-white font-medium">{theme}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AI SETTINGS */}
                    <div className="flow-card p-7 space-y-6">
                        <SectionHeader
                            icon={BrainCircuit}
                            title="AI Preferences"
                            subtitle="Control how AI supports your workflow"
                            color="text-cyan-300"
                        />

                        <div className="space-y-3">
                            {aiSettings.map((setting) => (
                                <div
                                    key={setting}
                                    className="
                                        flex items-center justify-between
                                        p-4
                                        rounded-2xl
                                        border border-white/10
                                        bg-white/[0.04]
                                    "
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                                            <Check size={16} className="text-cyan-300" />
                                        </div>

                                        <p className="text-white/80 text-sm">
                                            {setting}
                                        </p>
                                    </div>

                                    <Toggle />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-6">

                    {/* PROFILE */}
                    <div className="flow-card p-7 text-center">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 flex items-center justify-center text-2xl font-bold mb-4">
                            T
                        </div>

                        <h2 className="text-xl font-semibold text-white">
                            Tatiana
                        </h2>

                        <p className="text-white/45 text-sm mt-1">
                            Productivity builder
                        </p>

                        <div className="mt-6 space-y-3">
                            <SidebarButton icon={User} label="Edit Profile" />
                            <SidebarButton icon={Shield} label="Security" />

                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/10 text-red-300 border border-red-400/10 hover:bg-red-500/20 transition">
                                <LogOut size={18} />
                                Log Out
                            </button>
                        </div>
                    </div>

                    {/* QUICK SETTINGS */}
                    <div className="flow-card p-7 space-y-4">

                        <div className="flex items-center gap-2">
                            <Zap className="text-cyan-300" size={18} />
                            <h3 className="text-lg font-semibold">
                                Quick Settings
                            </h3>
                        </div>

                        {quickSettings.map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="
                                    flex items-center justify-between
                                    p-3
                                    rounded-xl
                                    border border-white/10
                                    bg-white/[0.04]
                                "
                            >
                                <div className="flex items-center gap-2">
                                    <Icon size={16} className="text-white/60" />
                                    <span className="text-white/70 text-sm">
                                        {label}
                                    </span>
                                </div>

                                <Toggle small />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

/* =====================================================
   COMPONENTS
===================================================== */

function SectionHeader({ icon: Icon, title, subtitle, color }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon className={color} size={18} />
            </div>

            <div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm text-white/45">{subtitle}</p>
            </div>
        </div>
    );
}

function SidebarButton({ icon: Icon, label }) {
    return (
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.06] transition">
            <Icon size={16} className="text-white/60" />
            <span className="text-white/70 text-sm">{label}</span>
        </button>
    );
}

function Toggle({ small }) {
    return (
        <div
            className={`
                rounded-full bg-white/10 flex items-center px-1
                ${small ? "w-10 h-5" : "w-11 h-6"}
            `}
        >
            <div
                className={`
                    rounded-full bg-white/70
                    ${small ? "w-3.5 h-3.5" : "w-4 h-4"}
                `}
            />
        </div>
    );
}

export default Settings;