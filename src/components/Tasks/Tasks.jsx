import { css } from "styled-system/css";
import { Task } from "./Task";
import { useTasks } from "store";

export const Tasks = () => {
  const tasks = useTasks((state) => state.tasks);
  const taskArray = Object.entries(tasks).map((item) => ({
    ...item[1],
  }));

  return (
    <div className={css({ margin: 0 })}>
      {taskArray.map((task, index) => {
        const doneClassName = task.done === true ? "done" : "";

        return (
          <Task
            className={doneClassName}
            key={`Task-${task.taskId}`}
            task={task}
            lastTask={index === taskArray.length - 1}
          />
        );
      })}
    </div>
  );
};
