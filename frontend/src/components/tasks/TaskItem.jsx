import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import {
  GripVertical,
  Sparkles,
  Trash2,
  CheckCircle2,
} from "lucide-react";

function TaskItem(props) {
  console.log("TASK ITEM PROPS:", props);

  const {
    task,
    onDelete = () => { },
    onToggle = () => { },
    onSelect = () => { },
    onEdit = async () => { },
    isSelected = false,
  } = props;

  if (!task) {
    console.error("TaskItem received undefined task");
    return null;
  }

  // =====================================================
  // EDIT STATE
  // =====================================================

  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState(
    task?.title || ""
  );

  const [editedPriority, setEditedPriority] = useState(
    task?.priority || "medium"
  );

  const [editedDueDate, setEditedDueDate] = useState(
    task?.due_date
      ? task.due_date.slice(0, 10)
      : ""
  );

  // =====================================================
  // KEEP FORM IN SYNC
  // =====================================================

  useEffect(() => {
    setEditedTitle(task?.title || "");

    setEditedPriority(
      task?.priority || "medium"
    );

    setEditedDueDate(
      task?.due_date
        ? task.due_date.slice(0, 10)
        : ""
    );
  }, [task]);

  // =====================================================
  // HELPERS
  // =====================================================

  const resetForm = () => {
    setEditedTitle(task?.title || "");

    setEditedPriority(
      task?.priority || "medium"
    );

    setEditedDueDate(
      task?.due_date
        ? task.due_date.slice(0, 10)
        : ""
    );
  };

  const handleSave = async () => {
    await onEdit(task.task_id, {
      title: editedTitle,
      priority: editedPriority,
      due_date: editedDueDate || null,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    resetForm();
    setIsEditing(false);
  };

  // =====================================================
  // DRAG + DROP
  // =====================================================

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.task_id || `task-${Math.random()}`,
    disabled: isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // =====================================================
  // PRIORITY STYLES
  // =====================================================

  const priority =
    editedPriority ||
    task?.priority ||
    "medium";

  const priorityMap = {
    high:
      "text-violet-200 bg-violet-400/10 border-violet-400/20",

    medium:
      "text-cyan-200 bg-cyan-400/10 border-cyan-400/20",

    low:
      "text-white/50 bg-white/5 border-white/10",
  };

  const dotMap = {
    high: "bg-violet-400",
    medium: "bg-cyan-400",
    low: "bg-white/30",
  };

  // =====================================================
  // SELECT HANDLER
  // =====================================================

  const handleSelect = (e) => {
    if (
      e.target.closest(
        "button, input, select"
      )
    ) {
      return;
    }

    onSelect();
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.995 }}
      className={`
                relative overflow-hidden group
                rounded-[22px]
                border
                bg-white/[0.025]
                backdrop-blur-2xl
                px-5 py-4
                transition-all duration-300

                ${task?.is_complete
          ? "opacity-60 border-white/5"
          : "border-white/10 hover:border-white/20"
        }

                ${isSelected
          ? "border-cyan-300/20 bg-cyan-400/[0.03]"
          : ""
        }

                ${isDragging
          ? "z-50 border-cyan-400/30 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
          : ""
        }
            `}
    >
      <div
        className="relative z-10 flex items-start justify-between gap-4"
        onClick={handleSelect}
      >
        {/* LEFT */}
        <div className="flex items-start gap-4 flex-1 min-w-0">

          {/* DRAG HANDLE */}
          <div
            {...attributes}
            {...listeners}
            className="mt-1 text-white/20 hover:text-white/60 cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={18} />
          </div>

          {/* COMPLETE */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={`
                            w-6 h-6 mt-0.5 rounded-full border
                            flex items-center justify-center

                            ${task?.is_complete
                ? "border-cyan-400 bg-cyan-400/15"
                : "border-white/15 hover:border-cyan-400/40"
              }
                        `}
          >
            {task?.is_complete && (
              <CheckCircle2
                size={14}
                className="text-cyan-300"
              />
            )}
          </button>

          {/* CONTENT */}
          <div className="flex-1 min-w-0 space-y-3">

            {isEditing ? (
              <input
                value={editedTitle}
                onChange={(e) =>
                  setEditedTitle(
                    e.target.value
                  )
                }
                className="w-full bg-white/5 px-3 py-2 rounded-lg text-white outline-none"
              />
            ) : (
              <h3
                className={`
                                    text-[15px]
                                    font-semibold
                                    tracking-tight
                                    truncate

                                    ${task?.is_complete
                    ? "line-through text-white/45"
                    : "text-white"
                  }
                                `}
              >
                {task?.title || "Untitled Task"}
              </h3>
            )}

            <div className="flex items-center gap-3 flex-wrap">

              {isEditing ? (
                <select
                  value={editedPriority}
                  onChange={(e) =>
                    setEditedPriority(
                      e.target.value
                    )
                  }
                  className="bg-white/5 px-2 py-1 rounded text-xs"
                >
                  <option value="high">
                    high
                  </option>

                  <option value="medium">
                    medium
                  </option>

                  <option value="low">
                    low
                  </option>
                </select>
              ) : (
                <div
                  className={`
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-2.5
                                        py-1
                                        rounded-full
                                        border
                                        text-[10px]
                                        uppercase
                                        tracking-[0.18em]
                                        ${priorityMap[priority]}
                                    `}
                >
                  <span
                    className={`
                                            w-2
                                            h-2
                                            rounded-full
                                            ${dotMap[priority]}
                                        `}
                  />

                  {priority}
                </div>
              )}

              {isEditing ? (
                <input
                  type="date"
                  value={editedDueDate}
                  onChange={(e) =>
                    setEditedDueDate(
                      e.target.value
                    )
                  }
                  className="bg-white/5 px-2 py-1 rounded text-xs"
                />
              ) : (
                task?.due_date && (
                  <span className="text-xs text-white/25">
                    due{" "}
                    {task.due_date.slice(
                      0,
                      10
                    )}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">

          <button
            onClick={(e) => {
              e.stopPropagation();

              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className="p-2.5 rounded-xl hover:bg-white/[0.05] text-white/50 hover:text-white"
          >
            <Sparkles size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2.5 rounded-xl hover:bg-red-500/10 text-white/30 hover:text-red-300"
          >
            <Trash2 size={16} />
          </button>

        </div>
      </div>
    </motion.li>
  );
}

export default TaskItem;