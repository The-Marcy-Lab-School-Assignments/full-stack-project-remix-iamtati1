import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Eye,
    EyeOff,
    Sparkles,
    ArrowRight,
    BrainCircuit,
    Layers3,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";

function Auth() {
    const navigate = useNavigate();

    const { login, register, error } = useAuth();

    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // =====================
    // SUBMIT
    // =====================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const success = isRegistering
            ? await register(username, password)
            : await login(username, password);

        if (success) navigate("/tasks");

        setIsLoading(false);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-black text-white">

            {/* BACKGROUND */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-black to-[#0a0f1f]" />

                <div className="absolute top-[-250px] left-[-200px] w-[700px] h-[700px] rounded-full bg-cyan-500/20 blur-[140px]" />
                <div className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] rounded-full bg-violet-500/20 blur-[140px]" />
                <div className="absolute top-[35%] left-[50%] w-[400px] h-[400px] rounded-full bg-fuchsia-500/10 blur-[120px]" />

                <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* MAIN */}
            <div className="relative z-10 min-h-screen grid lg:grid-cols-2">

                {/* LEFT */}
                <div className="hidden lg:flex flex-col justify-between p-14">

                    <div>
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5">
                            <Sparkles size={16} className="text-cyan-300" />
                            <span className="text-sm text-white/70">TaskFlow OS</span>
                        </div>
                    </div>

                    <div className="max-w-xl">
                        <h1 className="text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight">
                            Design your productivity system.
                        </h1>

                        <p className="mt-8 text-white/45 text-lg leading-relaxed">
                            Organize tasks, execute with clarity, and build momentum through intentional systems.
                        </p>

                        <div className="mt-12 grid grid-cols-2 gap-4">

                            <div className="p-5 rounded-3xl border border-white/10 bg-white/5">
                                <BrainCircuit size={24} className="text-cyan-300 mb-4" />
                                <h3 className="font-semibold mb-2">AI Planning</h3>
                                <p className="text-sm text-white/40">Smart execution systems.</p>
                            </div>

                            <div className="p-5 rounded-3xl border border-white/10 bg-white/5">
                                <Layers3 size={24} className="text-violet-300 mb-4" />
                                <h3 className="font-semibold mb-2">Analytics</h3>
                                <p className="text-sm text-white/40">Track consistency daily.</p>
                            </div>

                        </div>
                    </div>

                    <div className="text-sm text-white/25">
                        Built for creators and focused minds.
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center justify-center px-6 py-10">

                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="relative w-full max-w-md p-8 md:p-10 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl"
                    >

                        {/* HEADER */}
                        <div className="mb-8 space-y-3">

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/40 uppercase tracking-widest">
                                <Sparkles size={12} />
                                Welcome
                            </div>

                            <h2 className="text-4xl font-bold">
                                {isRegistering ? "Create Account" : "Welcome Back"}
                            </h2>

                            <p className="text-white/45">
                                {isRegistering
                                    ? "Start building your system."
                                    : "Continue your workflow."
                                }
                            </p>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="space-y-5">

                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="w-full h-14 px-5 rounded-2xl border border-white/10 bg-white/5"
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full h-14 px-5 pr-14 rounded-2xl border border-white/10 bg-white/5"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {error && (
                                <div className="p-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-2xl">
                                    {error?.message || error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 font-semibold flex items-center justify-center gap-3"
                            >
                                {isLoading
                                    ? "Loading..."
                                    : isRegistering
                                        ? "Create Account"
                                        : "Login"
                                }

                                <ArrowRight size={18} />
                            </button>
                        </form>

                        {/* SWITCH */}
                        <button
                            onClick={() => setIsRegistering(!isRegistering)}
                            className="mt-6 w-full text-sm text-white/40 hover:text-cyan-300"
                        >
                            {isRegistering
                                ? "Already have an account? Login"
                                : "Need an account? Register"
                            }
                        </button>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Auth;