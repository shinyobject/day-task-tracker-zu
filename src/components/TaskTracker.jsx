import { useEffect, useState } from "react";
import { css } from "styled-system/css";
import { useBlocks } from "../hooks/useBlocks";
import { useSettings } from "../hooks/useSettings";
import { TaskList } from "./TaskList";
import { TimeBlocks } from "./TimeBlocks";
import { Settings } from "./Settings/Settings";

export const TaskTracker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { blocks, setBlock, clearPastBlocks } = useBlocks();
  const { settings } = useSettings();
  const { startHour, numberOfHours } = settings;

  // Build blocks based on current time
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

  // Update past blocks periodically
  useEffect(() => {
    clearPastBlocks();
    buildBlocks();
    const interval = setInterval(() => {
      buildBlocks();
    }, 1000 * 60);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startHour]);

  // Calculate time left
  const timeLeft =
    numberOfHours * 2 -
    Object.values(blocks).filter((item) => item.status !== "free").length;

  let displayTimeLeft;
  switch (timeLeft) {
    case 0:
      displayTimeLeft = "None";
      break;
    case 1:
      displayTimeLeft = "30 min";
      break;
    case 2:
      displayTimeLeft = "1 hour";
      break;
    default:
      displayTimeLeft = `${timeLeft / 2} hours`;
  }

  return (
    <div className={css({
      padding: "8px",
      overflowX: "hidden",
      height: "-webkit-fill-available",
      overflowY: "auto",
      "& h2": {
        margin: "1.5em 0 0.225em 0",
        fontSize: "0.8rem",
        opacity: 0.7,
        fontWeight: 700
      }
    })}>
      <div className={css({
        display: "flex",
        justifyContent: "space-between",
        gap: "8px",
        marginBottom: "16px"
      })}>
        <TaskList isAddButton={true} />
        <button
          className={css({
            border: 0,
            background: "transparent"
          })}
          onClick={() => setIsOpen(!isOpen)}
        >
          Settings
        </button>
      </div>

      <h2>30 minute blocks</h2>
      <TimeBlocks />

      <h2>Tasks</h2>
      <TaskList />

      <h2>Time left: {displayTimeLeft}</h2>
      <TimeBlocks showFreeBlocks={true} />
      <TimeBlocks showTaskBars={true} />

      {isOpen && <Settings setIsOpen={setIsOpen} />}
    </div>
  );
};
