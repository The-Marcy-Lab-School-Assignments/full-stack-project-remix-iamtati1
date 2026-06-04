import { useState } from "react";

import TaskCalendar from "../components/TaskCalendar";
import TaskList from "../components/tasks/TaskList";
import useTasks from "../hooks/useTasks";

function Tasks() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // ✅ MATCHES YOUR HOOK
    const {
        tasks,
        isLoading,
        addTask,
        editTask,
        toggleTask,
        removeTask,
    } = useTasks();

    const filteredTasks = tasks;

    if (isLoading) {
        return <div className="p-6">Loading tasks...</div>;
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6">

            {/* CALENDAR */}
            <div className="xl:col-span-1">
                <TaskCalendar onDateChange={setSelectedDate} />
            </div>

            {/* TASKS */}
            <div className="xl:col-span-2">
                <TaskList
                    tasks={filteredTasks}
                    selectedTaskId={null}
                    onDelete={removeTask}
                    onToggle={toggleTask}
                    onSelect={(id) => console.log("selected:", id)}
                    onEdit={editTask}
                />
            </div>

        </div>
    );
}

export default Tasks;