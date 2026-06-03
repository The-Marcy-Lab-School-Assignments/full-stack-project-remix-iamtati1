import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, BrainCircuit } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

function LoadingScreen() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-black text-white">

            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-black to-[#0a0f1f]" />

            <div className="relative z-10 flex items-center justify-center min-h-screen px-6">

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-12 text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 mx-auto rounded-[2rem] border border-white/10 flex items-center justify-center mb-8"
                    >
                        <BrainCircuit size={38} className="text-cyan-300" />
                    </motion.div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/40 text-xs uppercase tracking-widest mb-5">
                        <Sparkles size={12} />
                        Initializing Session
                    </div>

                    <h2 className="text-3xl font-bold mb-3">
                        Preparing your workspace
                    </h2>

                    <p className="text-white/45 max-w-md">
                        Syncing tasks, analytics, and productivity systems...
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default function ProtectedRoute({ children }) {
    const { currentUser, isLoading } = useAuth();

    const isAuthenticated = Boolean(
        currentUser?.user_id || currentUser?.id
    );

    // 1. LOADING
    if (isLoading) return <LoadingScreen />;

    // 2. NOT AUTH
    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    // 3. AUTH OK
    return children;
}