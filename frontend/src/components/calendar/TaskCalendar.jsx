import { useMemo, useState, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { CheckCircle2, CalendarDays } from "lucide-react";

function TaskCalendar({ tasks = [], onDateChange }) {
    const [date, setDate] = useState(new Date());

    // =====================================================
    // SAFE DATE FORMAT (fixes timezone bugs)
    // =====================================================
    const formatDate = useCallback((d) => {
        const dateObj = new Date(d);
        dateObj.setHours(0, 0, 0, 0);
        return dateObj.toISOString().split("T")[0];
    }, []);

    // =====================================================
    // HANDLE DATE CHANGE
    // =====================================================
    const handleDateChange = (newDate) => {
        setDate(newDate);
        onDateChange?.(newDate);
    };

    // =====================================================
    // SELECTED DAY TASKS
    // =====================================================
    const selectedTasks = useMemo(() => {
        const key = formatDate(date);
        return tasks.filter(
            (t) => t?.due_date && formatDate(t.due_date) === key
        );
    }, [tasks, date, formatDate]);

    // =====================================================
    // TASK MAP (for calendar dots)
    // =====================================================
    const taskMap = useMemo(() => {
        const map = {};

        tasks.forEach((task) => {
            if (!task?.due_date) return;

            const key = formatDate(task.due_date);

            if (!map[key]) {
                map[key] = { total: 0, completed: 0 };
            }

            map[key].total += 1;
            if (task.is_complete) map[key].completed += 1;
        });

        return map;
    }, [tasks, formatDate]);

    // =====================================================
    // ADD DOTS INSIDE CALENDAR TILES
    // =====================================================
    const tileContent = ({ date }) => {
        const key = formatDate(date);
        const data = taskMap[key];

        if (!data) return null;

        return (
            <div className="flex justify-center mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
        );
    };

    // =====================================================
    // TILE STYLING
    // =====================================================
    const tileClassName = ({ date: d }) => {
        const key = formatDate(d);

        if (key === formatDate(date)) return "selected-day";
        if (taskMap[key]) return "has-task";

        return "";
    };

    // =====================================================
    // UI
    // =====================================================
    return (
        <div className="flow-card p-5 space-y-5">

            {/* HEADER */}
            <div className="flex items-center gap-2 text-white/80">
                <CalendarDays size={16} className="text-cyan-300" />
                <span className="text-sm font-medium">Task Calendar</span>
            </div>

            {/* CALENDAR WRAPPER (THIS FIXES YOUR WHITE BLOCK ISSUE) */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30 p-3">
                <Calendar
                    value={date}
                    onChange={handleDateChange}
                    tileContent={tileContent}
                    tileClassName={tileClassName}
                />
            </div>

            {/* TASK LIST */}
            <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    {date.toDateString()}
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
                                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                            >
                                <span className="text-sm text-white/85">
                                    {task.title}
                                </span>

                                {task.is_complete && (
                                    <CheckCircle2 size={16} className="text-green-400" />
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