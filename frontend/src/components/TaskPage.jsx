import { useState, useEffect } from 'react';
import { getTasks } from '../adapters/task-adapters';

import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import MotivationalCard from "./MotivationalCard";
import AnalyticsPanel from './AnalyticsPanel';
import AIPlanCard from './AIPlanCard';

function TaskPage({ currentUser, handleLogout }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks
  const loadTasks = async () => {
    setIsLoading(true);
    setError(null);

    const { data, error: fetchError } = await getTasks();

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setTasks(data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // analytics
  const completedTasks = tasks.filter(t => t.is_complete).length;
  const totalTasks = tasks.length;
  const completionRate =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  return (
    <section className="min-h-screen bg-zinc-950 text-white relative">

      {/* subtle background depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-900/40 via-zinc-950 to-zinc-950 pointer-events-none" />

      {/* centered layout */}
      <div className="relative max-w-5xl mx-auto p-6 space-y-6">

        {/* USER BAR */}
        <div className="flex items-center justify-between bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
          <span className="text-sm text-zinc-300">
            Welcome,{" "}
            <span className="text-white font-semibold">
              {currentUser.username}
            </span>
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500/80 hover:bg-red-500 transition px-3 py-1 rounded-lg text-sm"
          >
            Log Out
          </button>
        </div>

        {/* ADD TASK */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
          <AddTaskForm loadTasks={loadTasks} />
        </div>

        {/* LOADING / ERROR */}
        {isLoading && (
          <p className="text-zinc-400">Loading tasks...</p>
        )}

        {error && (
          <p className="text-red-400">
            Something went wrong: {error}
          </p>
        )}

        {/* MOTIVATION */}
        <MotivationalCard tasks={tasks} />

        {/* ANALYTICS */}
        <AnalyticsPanel
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          completionRate={completionRate}
        />

        {/* TASKS */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
          <TaskList
            tasks={tasks}
            loadTasks={loadTasks}
            setSelectedTask={setSelectedTask}
          />
        </div>

        {/* AI */}
        <AIPlanCard task={selectedTask} />

      </div>
    </section>
  );
}

export default TaskPage;