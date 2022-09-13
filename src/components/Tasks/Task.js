import { useRef, useState } from "react";
import styled from "styled-components";
import { DoneToggle } from "./DoneToggle";
import { TaskName } from "./TaskName";
import { TaskLength } from "./TaskLength";
import { RemoveTask } from "./RemoveTask";
import { useTasks } from "store";

export const Task = styled(({ className, task, lastTask }) => {
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
    if (e.key === "Tab" && lastTask === true) {
      newTask();
    }
  };
  const handleRemoveTask = () => {
    removeTask(task.taskId);
  };
  return (
    <div className={className}>
      <DoneToggle checked={task.done} onChange={handleDone} />
      <TaskName
        ref={nameRef}
        onFocus={() => nameRef.current.select()}
        value={internalName}
        onChange={(e) => setInternalName(e.target.value)}
        onBlur={handleNameChange}
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
})`
  display: flex;
  gap: 8px;
  align-items: center;
  &.done {
    background: #cdffa0;
  }
`;
