import { NavLink } from "react-router-dom";
import {
    Sparkles,
    Home,
    CheckSquare,
    BarChart3,
    Settings,
} from "lucide-react";

const links = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/tasks", label: "Tasks", icon: CheckSquare },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
    return (
        <div className="flex flex-col h-full px-5 py-6">

            {/* =====================================================
                BRAND
            ===================================================== */}
            <div className="flex items-center gap-4 pb-8 border-b border-white/10">
                <Sparkles size={18} className="text-cyan-300" />
                <div>
                    <h1 className="text-lg font-semibold">FlowState</h1>
                    <p className="text-sm text-white/40">
                        Productivity platform
                    </p>
                </div>
            </div>

            {/* =====================================================
                NAVIGATION
            ===================================================== */}
            <nav className="mt-8 flex flex-col gap-2">

                {links.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => `
                            flex items-center gap-3
                            h-14 px-4 rounded-2xl

                            transition-all duration-300

                            ${isActive
                                ? "bg-white/10 text-white border border-white/10"
                                : "text-white/45 hover:bg-white/5 hover:text-white border border-transparent"
                            }
                        `}
                    >
                        <Icon size={18} />
                        <span className="text-sm font-medium">
                            {label}
                        </span>
                    </NavLink>
                ))}

            </nav>

        </div>
    );
}

export default Sidebar;