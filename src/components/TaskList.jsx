import { useRef, useState, forwardRef } from "react";
import { css, cx } from "styled-system/css";
import { useTasks } from "../hooks/useTasks";

// DoneToggle component
const DoneToggle = (props) => {
  return (
    <input
      type="checkbox"
      className={css({
        border: "1px solid black",
        "@media (prefers-color-scheme: dark)": {
          borderColor: "white"
        }
      })}
      {...props}
    />
  );
};

// TaskName component
const TaskName = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      className={css({
        border: "1px solid transparent",
        padding: "2px 8px",
        background: "transparent",
        fontSize: "16px",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "100%",
        "&:hover": {
          cursor: "pointer"
        },
        "&:hover:focus": {
          cursor: "text"
        },
        ".done &:focus, &:focus": {
          background: "#fff",
          outline: "none",
          color: "#000",
          borderColor: "#ccc"
        }
      })}
      {...props}
    />
  );
});

// TaskLength component
const TaskLength = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      pattern="[0-9]*"
      className={css({
        border: "1px solid transparent",
        padding: "2px 8px",
        background: "transparent",
        fontSize: "16px",
        flexShrink: 1,
        flexGrow: 1,
        flexBasis: "5ch",
        textAlign: "right",
        width: "5ch",
        "&:hover": {
          cursor: "pointer"
        },
        "&:hover:focus": {
          cursor: "text"
        },
        ".done &:focus, &:focus": {
          background: "#fff",
          outline: "none",
          color: "#000",
          borderColor: "#ccc"
        }
      })}
      {...props}
    />
  );
});

// RemoveTask component
const RemoveTask = (props) => {
  return (
    <button
      className={css({
        border: 0,
        background: "transparent",
        fontSize: "18px",
        flexBasis: "2ch",
        textAlign: "right"
      })}
      {...props}
    />
  );
};

// Task component
const Task = ({ task, lastTask, className }) => {
  const [internalName, setInternalName] = useState(task.name);
  const [internalLength, setInternalLength] = useState(task.length);
  const nameRef = useRef();
  const lengthRef = useRef();

  const { newTask, setTask, removeTask } = useTasks();

  const handleDone = () => {
    setTask({ ...task, done: !task.done });
  };

  const handleNameChange = () => {
    setTask({ ...task, name: internalName });
  };

  const handleLengthChange = () => {
    setTask({ ...task, length: internalLength });
  };

  const handleLastTaskTab = (e) => {
    if (e.key.toLowerCase() === "tab" && lastTask === true) {
      newTask();
    }
    if (e.key.toLowerCase() === "enter") {
      handleLengthChange();
      lengthRef.current.blur();
    }
  };

  const handleRemoveTask = () => {
    removeTask(task.taskId);
  };

  const handleKeyDownName = (e) => {
    if (e.key.toLowerCase() === "enter") {
      lengthRef.current.focus();
    }
  };

  return (
    <div className={cx(
      className,
      css({
        display: "flex",
        gap: "8px",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        "& label": {
          flexGrow: 0,
          flexShrink: 0,
          width: "10px"
        }
      })
    )}>
      <label>
        <DoneToggle checked={task.done} onChange={handleDone} />
      </label>
      <TaskName
        ref={nameRef}
        onFocus={() => nameRef.current.select()}
        value={internalName}
        onChange={(e) => setInternalName(e.target.value)}
        onBlur={handleNameChange}
        onKeyDown={handleKeyDownName}
      />
      <TaskLength
        ref={lengthRef}
        onFocus={() => lengthRef.current.select()}
        value={internalLength}
        onChange={(e) => setInternalLength(e.target.value)}
        onBlur={handleLengthChange}
        onKeyDown={handleLastTaskTab}
      />
      <RemoveTask onClick={handleRemoveTask}>&#xd7;</RemoveTask>
    </div>
  );
};

// Main TaskList component
export const TaskList = ({ isAddButton = false }) => {
  const { tasks, taskOrder, newTask, reorderTasks } = useTasks();
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Create ordered task array based on taskOrder
  // If taskOrder is empty/undefined, use existing task IDs as order
  const currentTaskIds = Object.keys(tasks);
  const orderedTaskIds = (taskOrder && taskOrder.length > 0)
    ? taskOrder.filter((id) => tasks[id]) // Filter out deleted tasks
    : currentTaskIds; // Fallback for legacy data
  const taskArray = orderedTaskIds.map((id) => tasks[id]);

  // Handle drag start
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget);
  };

  // Handle drag over
  const handleDragOver = (e, index) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === index) return;

    // Reorder the array
    const newOrder = [...orderedTaskIds];
    const draggedItem = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, draggedItem);

    reorderTasks(newOrder);
    setDraggedIndex(index);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // If this is the add button mode, just render the add button
  if (isAddButton) {
    return (
      <button
        className={css({
          padding: "8px 0",
          background: "#109aed",
          color: "white",
          fontSize: "14px",
          fontWeight: 600,
          border: 0,
          borderRadius: "4px",
          flexGrow: 1
        })}
        onClick={newTask}
      >
        Add Task
      </button>
    );
  }

  // Otherwise render the task list
  return (
    <div className={css({ margin: 0 })}>
      {taskArray.map((task, index) => {
        const doneClassName = task.done === true ? "done" : "";

        return (
          <div
            key={`Task-${task.taskId}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={css({
              cursor: "grab",
              "&:active": {
                cursor: "grabbing"
              }
            })}
          >
            <Task
              className={doneClassName}
              task={task}
              lastTask={index === taskArray.length - 1}
            />
          </div>
        );
      })}
    </div>
  );
};
