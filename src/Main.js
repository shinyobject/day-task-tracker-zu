import { useEffect, useState } from "react";
import styled from "styled-components";
import { Controls } from "components/Controls";
import { FreeBlocks } from "components/Blocks";
import { Tasks, TaskBars } from "components/Tasks";
import { useBlocks, useControls, useTasks, useDate } from "store";
import { Settings } from "components/Settings";
import { TimeAndBlocks } from "components/TimeAndBlocks";

export const Main = styled(({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const setBlock = useBlocks((state) => state.setBlock);
  const startHour = useControls((state) => state.startHour);
  const numberOfHours = useControls((state) => state.numberOfHours);
  const clearAllBlocks = useBlocks((state) => state.clearAllBlocks);
  const clearAllTasks = useTasks((state) => state.clearAllTasks);
  const date = useDate((state) => state.date);
  const setDate = useDate((state) => state.setDate);

  useEffect(() => {
    const now = new Date();
    if (now.getDate() !== date) {
      clearAllBlocks();
      clearAllTasks();
      setDate(now.getDate());
    }
  });

  const buildBlocks = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    for (let time = startHour * 1; time <= numberOfHours * 2; time += 0.5) {
      const blockId = `Block-${time}`;
      if (time < hours) {
        setBlock({ blockId, status: "past" });
      }
      if (time === hours) {
        const timeMinutes = time % 1 === 0 ? 0 : 30;
        if (timeMinutes === 0 && minutes >= 30) {
          setBlock({ blockId, status: "past" });
        }
      }
    }
  };
  buildBlocks();

  const interval = setInterval(() => {
    buildBlocks();
    return () => clearInterval(interval);
  }, 1000 * 60);

  return (
    <div className={className}>
      <Controls isOpen={isOpen} setIsOpen={setIsOpen} />
      <h2>30 minute blocks</h2>
      <TimeAndBlocks />
      <h2>Tasks</h2>
      <Tasks />
      <h2>Time left</h2>
      <FreeBlocks />
      <TaskBars />
      {isOpen && <Settings setIsOpen={setIsOpen} />}
    </div>
  );
})`
  padding: 8px;
  overflow-x: hidden;
  height: -webkit-fill-available;
  overflow-y: auto;
  h2 {
    margin: 0.5em 0 0.225em 0;
    font-size: 0.8rem;
    opacity: 0.7;
    font-weight: 700;
  }
`;
