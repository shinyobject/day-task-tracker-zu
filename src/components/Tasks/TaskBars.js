import styled from "styled-components";
import { TaskBar } from "./Taskbar";
import { useBlocks, useControls, useTasks } from "store";

export const TaskBars = styled(({ className }) => {
  let timeUsed = 0;
  const blockSize = useControls((state) => state.blockSize);
  const tasks = useTasks((state) => state.tasks);
  const taskArray = Object.values(tasks);
  const tasksToDo = taskArray.filter((task) => task.done !== true);

  const blocks = useBlocks((state) => state.blocks);
  const blocksArray = Object.values(blocks);
  const timeLeft = blocksArray.reduce((previous, current) =>
    current.status === "free" ? previous + 1 : previous
  );

  return (
    <div className={className}>
      {tasksToDo.map((task, index) => {
        const hasEnoughTimeLeft = task.length < timeLeft - timeUsed;
        timeUsed += task.length;
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
