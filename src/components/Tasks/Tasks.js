import styled from "styled-components";
import { Task } from "./Task";
import { useTasks } from "store";

export const Tasks = styled(({ className }) => {
  const tasks = useTasks((state) => state.tasks);
  const taskArray = Object.entries(tasks).map((item) => ({
    ...item[1],
  }));

  return (
    <div className={className}>
      {taskArray.map((task, index) => {
        const doneClassName = task.done === true ? "done" : "";

        return (
          <Task
            className={`${className} ${doneClassName}`}
            key={`Task-${task.taskId}`}
            task={task}
          />
        );
      })}
    </div>
  );
})``;
