import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Search, Command } from "lucide-react";

function Topbar() {
    const { currentUser } = useAuth();

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [search, setSearch] = useState("");

    const menuRef = useRef(null);

    // close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070B14]/80 backdrop-blur-2xl">

            <div className="px-6 lg:px-8 py-5 flex flex-col gap-6">

                {/* =====================================================
                    TOP ROW
                ===================================================== */}
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                    {/* LEFT */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold text-white">
                            Welcome back {currentUser?.username || "Guest"}
                        </h1>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3 flex-wrap">

                        {/* SEARCH */}
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">

                            <Search size={14} className="text-white/40" />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search tasks..."
                                className="bg-transparent outline-none text-sm text-white placeholder:text-white/30 w-[180px]"
                            />

                            <div className="text-xs text-white/30 flex items-center gap-1">
                                <Command size={10} /> K
                            </div>
                        </div>

                        {/* USER MENU */}
                        <div className="relative" ref={menuRef}>

                            <button
                                onClick={() => setShowUserMenu(v => !v)}
                                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-semibold"
                            >
                                {currentUser?.username?.[0]?.toUpperCase() || "U"}
                            </button>

                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#111827] border border-white/10 rounded-xl overflow-hidden z-50">

                                    <button className="w-full px-4 py-3 text-left hover:bg-white/5">
                                        Profile
                                    </button>

                                    <button className="w-full px-4 py-3 text-left hover:bg-white/5">
                                        Settings
                                    </button>

                                    <button className="w-full px-4 py-3 text-left text-red-300 hover:bg-white/5">
                                        Logout
                                    </button>

                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
}

export default Topbar;