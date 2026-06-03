import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles, Flag, PencilLine, CheckCircle2 } from "lucide-react";

function AddTaskForm({ addTask }) {
    // =====================
    // STATE
    // =====================
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // =====================
    // SUBMIT
    // =====================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || isSubmitting) return;

        setIsSubmitting(true);
        setSuccess(false);

        try {
            const result = await addTask({
                title,
                description,
                priority,
            });

            if (result?.success) {
                setTitle("");
                setDescription("");
                setPriority("medium");
                setSuccess(true);

                setTimeout(() => setSuccess(false), 1500);
            }
        } catch (err) {
            console.error("CREATE TASK ERROR:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const priorityStyles = {
        low: "text-white/40",
        medium: "text-cyan-300",
        high: "text-violet-300",
    };

    return (
        <motion.section layout className="surface-base p-6 md:p-8 space-y-8">

            {/* HEADER */}
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-4">
                    <div className="eyebrow">
                        <Sparkles size={12} />
                        Task Builder
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-white">
                            Create Task
                        </h2>

                        <p className="text-sm text-white/45 max-w-lg">
                            Add meaningful work to your workflow and keep momentum moving forward.
                        </p>
                    </div>
                </div>

                <div className="icon-tile">
                    <PencilLine size={20} className="text-cyan-300" />
                </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-7">

                {/* TITLE */}
                <div className="space-y-3">
                    <label className="input-label">Task</label>

                    <div className="flex items-center gap-3 px-4 py-4 rounded-2xl border border-white/10 bg-black/20">
                        <Plus size={16} className="text-white/30" />

                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Design landing page..."
                            className="w-full bg-transparent text-white outline-none"
                        />
                    </div>
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-3">
                    <label className="input-label">Description</label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="Add context..."
                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none resize-none"
                    />
                </div>

                {/* PRIORITY */}
                <div className="space-y-3">
                    <label className="input-label">Priority</label>

                    <div className="grid grid-cols-3 gap-3">
                        {["low", "medium", "high"].map((level) => {
                            const active = priority === level;

                            return (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setPriority(level)}
                                    className={`priority-pill ${active ? "priority-pill-active" : "priority-pill-idle"}`}
                                >
                                    <Flag size={14} className={priorityStyles[level]} />
                                    {level}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-2">

                    {/* SUCCESS */}
                    <div className="min-h-[20px] text-sm">
                        <AnimatePresence mode="wait">
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="flex items-center gap-2 text-cyan-300"
                                >
                                    <CheckCircle2 size={15} />
                                    Task created
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm text-white disabled:opacity-50"
                    >
                        <Sparkles size={16} />
                        {isSubmitting ? "Creating..." : "Create Task"}
                    </button>
                </div>
            </form>
        </motion.section>
    );
}

export default AddTaskForm;