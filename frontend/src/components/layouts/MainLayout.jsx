import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function MainLayout({ children }) {
    return (
        <div className="relative min-h-screen bg-[#060816] text-white overflow-hidden">

            {/* =====================================================
                BACKGROUND (NON-INTERACTIVE LAYER)
            ===================================================== */}
            <div className="absolute inset-0 pointer-events-none">

                <div className="
                    absolute top-[-20rem] left-1/2 -translate-x-1/2
                    w-[70rem] h-[40rem]
                    rounded-full
                    bg-cyan-500/[0.08]
                    blur-[180px]
                " />

                <div className="
                    absolute top-[20%] right-[-15rem]
                    w-[35rem] h-[35rem]
                    rounded-full
                    bg-violet-500/[0.10]
                    blur-[180px]
                " />

                <div className="
                    absolute bottom-[-12rem] left-[-10rem]
                    w-[40rem] h-[40rem]
                    rounded-full
                    bg-cyan-400/[0.06]
                    blur-[180px]
                " />

                {/* decorative overlays */}
                <div className="dashboard-grid" />
                <div className="dashboard-noise" />
            </div>

            {/* =====================================================
                APP LAYOUT
            ===================================================== */}
            <div className="relative z-10 flex min-h-screen">

                {/* SIDEBAR */}
                <aside className="
                    hidden lg:block
                    w-[290px]
                    shrink-0
                    border-r border-white/10
                    bg-black/20
                    backdrop-blur-2xl
                ">
                    <Sidebar />
                </aside>

                {/* MAIN */}
                <div className="flex-1 min-w-0 flex flex-col">

                    {/* TOPBAR */}
                    <header className="sticky top-0 z-40">
                        <Topbar />
                    </header>

                    {/* CONTENT */}
                    <main className="
                        flex-1
                        overflow-y-auto
                        px-6 md:px-8 xl:px-10
                        py-8 xl:py-10
                    ">
                        <div className="mx-auto w-full max-w-[1600px]">
                            {children}
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
}

export default MainLayout;