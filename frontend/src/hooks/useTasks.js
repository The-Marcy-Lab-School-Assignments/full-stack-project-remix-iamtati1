import { useState, useEffect, useCallback, useMemo } from "react";
import { taskApi } from "../api/tasks";

// =====================================================
// HELPERS
// =====================================================
const normalizeTasks = (data) => {
    const raw = data?.tasks || data || [];
    if (!Array.isArray(raw)) return [];
    return raw.filter((t) => t && t.task_id);
};

// =====================================================
// HOOK
// =====================================================
function useTasks() {

    // =====================================================
    // CORE STATE
    // =====================================================
    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    // =====================================================
    // SELECTION STATE
    // =====================================================
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const onSelect = useCallback((id) => {
        setSelectedTaskId((prev) => (prev === id ? null : id));
    }, []);

    // =====================================================
    // UI ACTION STATE
    // =====================================================
    const [activeActions, setActiveActions] = useState({});

    const setAction = (id, action) => {
        setActiveActions((prev) => ({ ...prev, [id]: action }));
    };

    const clearAction = (id) => {
        setActiveActions((prev) => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });
    };

    // =====================================================
    // LOAD TASKS
    // =====================================================
    const loadTasks = useCallback(async ({ silent = false } = {}) => {
        try {
            setError(null);
            setStatus(silent ? "refreshing" : "loading");

            const res = await taskApi.getTasks();
            if (!res.success) throw new Error(res.error?.message);

            setTasks(normalizeTasks(res.data));
            setLastUpdated(new Date());

        } catch (err) {
            setError(err.message);
        } finally {
            setStatus("idle");
        }
    }, []);

    // =====================================================
    // ADD TASK (OPTIMISTIC)
    // =====================================================
    const addTask = useCallback(async (taskData) => {
        setStatus("mutating");

        const tempId = `temp-${Date.now()}`;

        const optimisticTask = {
            task_id: tempId,
            ...taskData,
            is_complete: false,
            _optimistic: true,
        };

        setTasks((prev) => [optimisticTask, ...prev]);

        try {
            const res = await taskApi.createTask(taskData);
            if (!res.success) throw new Error(res.error?.message);

            setTasks((prev) =>
                prev.map((t) =>
                    t.task_id === tempId ? res.data : t
                )
            );

            return { success: true };

        } catch (err) {
            setError(err.message);
            setTasks((prev) => prev.filter((t) => !t._optimistic));
            return { success: false };

        } finally {
            setStatus("idle");
        }
    }, []);

    // =====================================================
    // TOGGLE TASK
    // =====================================================
    const toggleTask = useCallback(async (taskId) => {

        setAction(taskId, "toggle");

        let snapshot;

        setTasks((prev) => {
            snapshot = prev;
            return prev.map((t) =>
                t.task_id === taskId
                    ? { ...t, is_complete: !t.is_complete }
                    : t
            );
        });

        const task = snapshot.find(t => t.task_id === taskId);

        try {
            const res = await taskApi.updateTask(taskId, {
                is_complete: !task.is_complete,
            });

            if (!res.success) throw new Error();

        } catch (err) {
            setError(err.message);
            setTasks(snapshot);
        } finally {
            clearAction(taskId);
        }
    }, []);

    // =====================================================
    // EDIT TASK
    // =====================================================
    const editTask = useCallback(async (taskId, updates) => {

        setAction(taskId, "update");

        let snapshot;

        setTasks((prev) => {
            snapshot = prev;
            return prev.map((t) =>
                t.task_id === taskId ? { ...t, ...updates } : t
            );
        });

        try {
            const res = await taskApi.updateTask(taskId, updates);
            if (!res.success) throw new Error();

        } catch (err) {
            setError(err.message);
            setTasks(snapshot);
        } finally {
            clearAction(taskId);
        }
    }, []);

    // =====================================================
    // DELETE TASK
    // =====================================================
    const removeTask = useCallback(async (taskId) => {

        setAction(taskId, "delete");

        let snapshot;

        setTasks((prev) => {
            snapshot = prev;
            return prev.filter((t) => t.task_id !== taskId);
        });

        try {
            const res = await taskApi.deleteTask(taskId);
            if (!res.success) throw new Error();

        } catch (err) {
            setError(err.message);
            setTasks(snapshot);
        } finally {
            clearAction(taskId);
        }
    }, []);

    // =====================================================
    // REORDER (DRAG & DROP READY)
    // =====================================================
    const reorderTasks = useCallback((fromIndex, toIndex) => {
        setTasks((prev) => {
            const copy = [...prev];
            const [moved] = copy.splice(fromIndex, 1);
            copy.splice(toIndex, 0, moved);
            return copy;
        });
    }, []);

    // =====================================================
    // DERIVED STATE
    // =====================================================
    const completedTasks = useMemo(
        () => tasks.filter(t => t.is_complete),
        [tasks]
    );

    const activeTasks = useMemo(
        () => tasks.filter(t => !t.is_complete),
        [tasks]
    );

    const stats = useMemo(() => ({
        total: tasks.length,
        completed: completedTasks.length,
        active: activeTasks.length,
    }), [tasks, completedTasks, activeTasks]);

    // =====================================================
    // INIT
    // =====================================================
    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    // =====================================================
    // RETURN API
    // =====================================================
    return {
        tasks,

        status,
        error,
        lastUpdated,

        selectedTaskId,
        onSelect,

        addTask,
        editTask,
        toggleTask,
        removeTask,

        reorderTasks,

        completedTasks,
        activeTasks,
        stats,

        activeActions,
    };
}

export default useTasks;