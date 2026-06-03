import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { CheckCircle2, CalendarDays } from "lucide-react";

function TaskCalendar({ tasks = [], onDateChange }) {
    const [date, setDate] = useState(new Date());

    // =====================================================
    // NORMALIZE DATE
    // =====================================================

    const formatDate = (d) => new Date(d).toDateString();

    // =====================================================
    // HANDLE DATE CHANGE (CONNECT TO PARENT)
    // =====================================================

    const handleDateChange = (newDate) => {
        setDate(newDate);

        // 🔥 send selection to parent (Tasks.jsx)
        if (onDateChange) {
            onDateChange(newDate);
        }
    };

    // =====================================================
    // TASKS FOR SELECTED DAY
    // =====================================================

    const selectedTasks = useMemo(() => {
        return tasks.filter(
            (t) => t?.due_date && formatDate(t.due_date) === formatDate(date)
        );
    }, [tasks, date]);

    // =====================================================
    // DATE → TASK COUNT MAP
    // =====================================================

    const taskMap = useMemo(() => {
        const map = {};

        tasks.forEach((task) => {
            if (!task?.due_date) return;

            const key = formatDate(task.due_date);
            map[key] = (map[key] || 0) + 1;
        });

        return map;
    }, [tasks]);

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="flow-card p-5 space-y-5">

            {/* HEADER */}
            <div className="flex items-center gap-2 text-white/70">
                <CalendarDays size={16} className="text-cyan-300" />
                <span className="text-sm font-medium">Task Calendar</span>
            </div>

            {/* CALENDAR */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] p-3">

                <Calendar
                    value={date}
                    onChange={handleDateChange}
                    tileClassName={({ date }) => {
                        const key = formatDate(date);
                        return taskMap[key] ? "has-task" : null;
                    }}
                />
            </div>

            {/* SELECTED DAY TASKS */}
            <div className="space-y-3">

                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Tasks for {date.toDateString()}
                </p>

                {selectedTasks.length === 0 ? (
                    <div className="text-sm text-white/40">
                        No tasks scheduled for this day.
                    </div>
                ) : (
                    <div className="space-y-2">
                        {selectedTasks.map((task) => (
                            <div
                                key={task.task_id}
                                className="
                                    flex items-center justify-between
                                    rounded-xl
                                    border border-white/10
                                    bg-white/[0.03]
                                    px-4 py-3
                                "
                            >
                                <span className="text-sm text-white/80">
                                    {task.title}
                                </span>

                                {task.is_complete && (
                                    <CheckCircle2 size={16} className="text-cyan-300" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskCalendar;