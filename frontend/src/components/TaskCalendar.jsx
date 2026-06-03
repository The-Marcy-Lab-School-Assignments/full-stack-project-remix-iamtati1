import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function TaskCalendar({ onDateChange }) {
    const [date, setDate] = useState(new Date());

    const handleChange = (newDate) => {
        setDate(newDate);
        onDateChange?.(newDate);
    };

    return (
        <div className="flow-card p-6 space-y-4">

            <h2 className="text-white text-lg font-semibold">
                Task Calendar
            </h2>

            <div className="rounded-xl overflow-hidden bg-white/5 p-3">
                <Calendar
                    onChange={handleChange}
                    value={date}
                />
            </div>

            <p className="text-white/50 text-sm">
                Selected date:{" "}
                <span className="text-white">
                    {date.toDateString()}
                </span>
            </p>

        </div>
    );
}