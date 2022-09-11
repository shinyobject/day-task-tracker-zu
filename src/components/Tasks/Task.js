import { useState } from "react";
import styled from "styled-components";
import { DoneToggle } from "./DoneToggle";
import { TaskName } from "./TaskName";
import { TaskLength } from "./TaskLength";
import { RemoveTask } from "./RemoveTask";
import { useTasks } from "store";

export const Task = styled(({ className, task }) => {
  const [internalName, setInternalName] = useState(task.name);
  const [internalLength, setInternalLength] = useState(task.length);

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
  const handleRemoveTask = () => {
    removeTask(task.taskId);
  };
  return (
    <div className={className}>
      <DoneToggle checked={task.done} onChange={handleDone} />
      <TaskName
        value={internalName}
        onChange={(e) => setInternalName(e.target.value)}
        onBlur={handleNameChange}
      />
      <TaskLength
        value={internalLength}
        onChange={(e) => setInternalLength(e.target.value)}
        onBlur={handleLengthChange}
      />
      <RemoveTask onClick={handleRemoveTask}>&#xd7;</RemoveTask>
    </div>
  );
})``;
