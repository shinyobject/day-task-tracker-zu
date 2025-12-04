import { useRef, useState } from "react";
import { css } from "styled-system/css";
import { DoneToggle } from "./DoneToggle";
import { TaskName } from "./TaskName";
import { TaskLength } from "./TaskLength";
import { RemoveTask } from "./RemoveTask";
import { useTasks } from "store";

export const Task = ({ task, lastTask }) => {
  const [internalName, setInternalName] = useState(task.name);
  const [internalLength, setInternalLength] = useState(task.length);
  const nameRef = useRef();
  const lengthRef = useRef();

  const newTask = useTasks((state) => state.newTask);
  const setTask = useTasks((state) => state.setTask);
  const removeTask = useTasks((state) => state.removeTask);
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
    <div className={css({
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
    })}>
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
