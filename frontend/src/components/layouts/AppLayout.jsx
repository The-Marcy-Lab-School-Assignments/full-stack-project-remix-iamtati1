import { useAuth } from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

import { Sparkles, LayoutGrid } from "lucide-react";

function AppLayout() {
    const { currentUser, logout } = useAuth();

    return (
        <div className="relative min-h-screen bg-[#050816] text-white overflow-hidden">

            {/* BACKGROUND LAYER */}
            <div className="fixed inset-0 z-0 pointer-events-none">

                <div className="app-grid" />
                <div className="app-noise" />

                <div className="absolute top-[-18rem] right-[-12rem] h-[42rem] w-[42rem] rounded-full bg-cyan-400/10 blur-[160px]" />
                <div className="absolute bottom-[-20rem] left-[-14rem] h-[44rem] w-[44rem] rounded-full bg-violet-500/10 blur-[180px]" />
                <div className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[140px]" />
            </div>

            {/* APP */}
            <div className="relative z-10 flex min-h-screen flex-col">

                {/* TOPBAR */}
                <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">

                    <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 md:px-8 xl:px-10">

                        {/* BRAND */}
                        <div className="flex items-center gap-4">

                            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-violet-500/20" />
                                <LayoutGrid size={18} className="relative z-10 text-cyan-300" />
                            </div>

                            <div>
                                <h1 className="text-[15px] font-semibold">TaskFlow</h1>
                                <p className="text-xs text-white/35">
                                    Focus-driven productivity workspace
                                </p>
                            </div>
                        </div>

                        {/* USER WRAPPER (FIXED) */}
                        <div className="flex items-center gap-3">

                            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                                <Sparkles size={12} className="text-cyan-300" />
                                Workflow Active
                            </div>

                            {/* USER CARD */}
                            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">

                                {/* Avatar */}
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-black font-semibold">
                                    {currentUser?.username?.[0]?.toUpperCase() || "G"}
                                </div>

                                {/* Info */}
                                <div className="hidden sm:block leading-tight">
                                    <p className="text-sm font-medium">
                                        {currentUser?.username || "Guest"}
                                    </p>
                                    <p className="text-xs text-white/35">
                                        Creative Workspace
                                    </p>
                                </div>

                                {/* LOGOUT */}
                                <button
                                    onClick={logout}
                                    className="
                                        text-xs font-medium
                                        px-3 py-1.5
                                        rounded-lg
                                        bg-red-500/10
                                        text-red-300
                                        border border-red-500/20
                                        hover:bg-red-500/20
                                        hover:text-red-200
                                        transition
                                    "
                                >
                                    Logout
                                </button>

                            </div>
                        </div>
                    </div>

                </header>

                {/* MAIN */}
                <main className="flex flex-1">

                    {/* SIDEBAR */}
                    <aside className="hidden lg:block w-[280px] shrink-0 border-r border-white/10 bg-black/20 backdrop-blur-xl">
                        <Sidebar />
                    </aside>

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                        <div className="mx-auto w-full max-w-[1600px] px-5 py-8 md:px-8 md:py-10 xl:px-10 xl:py-12">
                            <Outlet />
                        </div>
                    </div>

                </main>

            </div>
        </div>
    );
}

export default AppLayout;