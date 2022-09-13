import { useEffect } from "react";
import styled from "styled-components";
import { TaskBar } from "./Taskbar";
import { useBlocks, useControls, useTasks } from "store";

export const TaskBars = styled(({ className }) => {
  let timeUsed = 0;
  const blockSize = useControls((state) => state.blockSize);
  const numberOfHours = useControls((state) => state.numberOfHours);
  const tasks = useTasks((state) => state.tasks);
  const taskArray = Object.values(tasks);
  const tasksToDo = taskArray.filter((task) => task.done !== true);

  const blocks = useBlocks((state) => state.blocks);
  const blocksArray = Object.values(blocks);
  const timeLeft = blocksArray.reduce(
    (previous, current) =>
      current.status !== "free" ? previous - 1 : previous,
    numberOfHours * 2
  );

  useEffect(() => {
    const newTask = document.querySelector('input[value="new task"]');
    if (newTask) {
      newTask.focus();
    }
  }, [tasks]);

  return (
    <div className={className}>
      {tasksToDo.map((task, index) => {
        const hasEnoughTimeLeft = task.length * 1 <= timeLeft - timeUsed;
        timeUsed += task.length * 1;
        return (
          <TaskBar
            key={`TaskBar-${index}`}
            length={task.length}
            blockSize={blockSize}
            hasEnoughTimeLeft={hasEnoughTimeLeft}
          />
        );
      })}
    </div>
  );
})`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;
