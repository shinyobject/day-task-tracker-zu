import styled from "styled-components";
import { Blocks } from "components/Blocks";
import { Controls } from "components/Controls";
import { FreeBlocks } from "components/Blocks";
import { Tasks, TaskBars } from "components/Tasks";
import { TimeLine } from "components/TimeLine";
import { useBlocks, useControls, useTasks } from "store";
import { uuid } from "utils/uuid";

const DisplayTask = styled.div`
  display: grid;
  grid-template-columns: 250px repeat(5, 80px);
`;

export const Main = styled(({ className }) => {
  const blocks = useBlocks((state) => state.blocks);
  const setBlock = useBlocks((state) => state.setBlock);
  const blocksArray = Object.entries(blocks).map((item) => ({
    ...item[1],
  }));

  const tasks = useTasks((state) => state.tasks);
  const setTask = useTasks((state) => state.setTask);
  const tasksArray = Object.entries(tasks).map((item) => ({ ...item[1] }));

  const use24HourTime = useControls((state) => state.use24HourTime);
  const blockSize = useControls((state) => state.blockSize);
  const startHour = useControls((state) => state.startHour);
  const numberOfHours = useControls((state) => state.numberOfHours);
  const setField = useControls((state) => state.setField);
  return (
    <div className={className}>
      <button onClick={() => setBlock({ blockId: uuid(), status: "free" })}>
        Add Block
      </button>
      <button
        onClick={() =>
          setTask({
            taskId: uuid(),
            name: "new task",
            done: false,
            enoughtTime: true,
            length: 1,
          })
        }
      >
        Add Task
      </button>
      {blocksArray.map((item) => {
        return (
          <div key={item.blockId}>
            {item.blockId} = {item.status}{" "}
            <button
              onClick={() =>
                setBlock({ blockId: item.blockId, status: "done" })
              }
            >
              Done
            </button>
          </div>
        );
      })}
      <ul>
        <li>
          blockSize: {blockSize}{" "}
          <button onClick={() => setField("blockSize", blockSize * 1 + 5)}>
            Inc
          </button>
        </li>
        <li>
          use24HourTime: {use24HourTime === true ? "yes" : "no"}{" "}
          <button onClick={() => setField("use24HourTime", !use24HourTime)}>
            Toggle
          </button>
        </li>
        <li>
          startHour: {startHour}
          <button onClick={() => setField("startHour", startHour * 1 + 1)}>
            Inc
          </button>
        </li>
        <li>
          numberOfHours: {numberOfHours}{" "}
          <button
            onClick={() => setField("numberOfHours", numberOfHours * 1 + 1)}
          >
            Inc
          </button>
        </li>
      </ul>
      {tasksArray.map((item) => {
        return (
          <DisplayTask key={item.taskId}>
            <span>{item.taskId} = </span>
            <span>{item.name}</span>
            <span>{item.done ? "done" : "not done"}</span>
            <span>{item.enoughTime ? "got time" : "outta time"}</span>
            <span>{item.length}</span>
            <button
              onClick={() =>
                setTask({
                  taskId: item.taskId,
                  name: "Changed Name",
                  done: true,
                  engouthTime: false,
                  length: 10,
                })
              }
            >
              Update
            </button>
          </DisplayTask>
        );
      })}
      <Controls />
      <TimeLine />
      <Blocks />
      <Tasks />
      <FreeBlocks />
      <TaskBars />
    </div>
  );
})``;
