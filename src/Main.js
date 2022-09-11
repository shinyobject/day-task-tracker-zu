import { useEffect, useState } from "react";
import styled from "styled-components";
import { Blocks } from "components/Blocks";
import { Controls } from "components/Controls";
import { FreeBlocks } from "components/Blocks";
import { Tasks, TaskBars } from "components/Tasks";
import { TimeLine } from "components/TimeLine";
import { useBlocks, useControls, useTasks } from "store";
import { Settings } from "components/Settings";

export const Main = styled(({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const setBlock = useBlocks((state) => state.setBlock);
  const startHour = useControls((state) => state.startHour);
  const numberOfHours = useControls((state) => state.numberOfHours);

  // Rewrite this with setTimeout so it will run immediately and then run again.

  useEffect(() => {
    const interval = setInterval(() => {
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
      return () => clearInterval(interval);
    }, 1000 * 60);
  }, []);

  return (
    <div className={className}>
      <Controls isOpen={isOpen} setIsOpen={setIsOpen} />
      <TimeLine />
      <Blocks />
      <Tasks />
      <FreeBlocks />
      <TaskBars />
      {isOpen && <Settings setIsOpen={setIsOpen} />}
    </div>
  );
})`
  margin: 8px;
  width: fit-content;
`;
