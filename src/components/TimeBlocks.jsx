import { useEffect } from "react";
import { css, cx } from "styled-system/css";
import { useBlocks } from "../hooks/useBlocks";
import { useTasks } from "../hooks/useTasks";
import { useSettings } from "../hooks/useSettings";
import { hour12, hour24 } from "../utils/hour";

// Label component
const Label = ({ width, children }) => {
  return (
    <div
      className={css({
        color: "#333",
        textAlign: "center",
        borderBottom: "2px solid #999",
        paddingBottom: "2px",
        "@media (prefers-color-scheme: dark)": {
          color: "#aaa"
        }
      })}
      style={{ width: `${width}px` }}
    >
      {children}
    </div>
  );
};

// Block component
const statusArray = ["free", "taken1", "taken2", "taken3"];

const Block = ({ blockId, status, size }) => {
  const { setBlock } = useBlocks();

  const handleStatus = () => {
    const currentIndex = statusArray.findIndex((value) => value === status);
    const nextIndex = (currentIndex + 1) % statusArray.length;
    setBlock({ blockId, status: statusArray[nextIndex] });
  };

  return (
    <button
      className={cx(
        css({
          border: "1px solid black",
          background: "transparent",
          "&.past": {
            background: "black"
          },
          "&.taken1": {
            background: "#f509dd"
          },
          "&.taken2": {
            background: "#f0d319"
          },
          "&.taken3": {
            background: "#6c95f0"
          },
          "@media (prefers-color-scheme: dark)": {
            borderColor: "white",
            "&.past": {
              background: "#444",
              borderColor: "#aaa"
            }
          }
        }),
        status
      )}
      style={{ width: `${size}px`, height: `${size}px` }}
      onClick={handleStatus}
    ></button>
  );
};

// FreeBlock component
const FreeBlock = ({ size }) => {
  return (
    <div
      className={css({
        border: "1px solid black",
        "@media (prefers-color-scheme: dark)": {
          borderColor: "white"
        }
      })}
      style={{ width: `${size}px`, height: `${size}px` }}
    ></div>
  );
};

// TaskBar component
const TaskBar = ({ blockSize, length, hasEnoughTimeLeft }) => {
  const width = blockSize * length + 8 * (length - 1);
  const background = hasEnoughTimeLeft === true ? "blue" : "red";

  return (
    <div style={{ width: `${width}px`, height: "16px", background }}></div>
  );
};

// Main TimeBlocks component
export const TimeBlocks = ({ showFreeBlocks = false, showTaskBars = false }) => {
  const { blocks } = useBlocks();
  const { tasks } = useTasks();
  const { settings } = useSettings();
  const { numberOfHours, startHour, blockSize, use24HourTime } = settings;

  const numberOfBlocksPerLine = 2;
  const gapBetweenBlocks = 8;
  const labelWidth = blockSize * numberOfBlocksPerLine + gapBetweenBlocks;

  // Render free blocks
  if (showFreeBlocks) {
    const blockArray = Object.values(blocks).filter((block) => {
      const blockTime = block.blockId.match(/.*-(\d*[.]*\d*)/)[1] * 1;
      if (blockTime >= startHour) return true;
      return false;
    });
    const usedTime = blockArray.reduce(
      (previousValue, currentValue) =>
        currentValue.status !== "free" ? previousValue + 1 : previousValue,
      0
    );

    if (usedTime >= numberOfHours * 2) return null;

    return (
      <div className={css({
        display: "flex",
        flexWrap: "wrap",
        gap: "8px"
      })}>
        {[...Array(numberOfHours * 2 - usedTime)].map((item, index) => (
          <FreeBlock key={`FreeBlock-${index}`} size={blockSize - 2} />
        ))}
      </div>
    );
  }

  // Render task bars
  if (showTaskBars) {
    let timeUsed = 0;
    const taskArray = Object.values(tasks);
    const tasksToDo = taskArray.filter((task) => task.done !== true);

    const blocksArray = Object.values(blocks);
    const timeLeft = blocksArray.reduce(
      (previous, current) =>
        current.status !== "free" ? previous - 1 : previous,
      numberOfHours * 2
    );

    // Auto-focus new task input
    useEffect(() => {
      const newTask = document.querySelector('input[value="new task"]');
      if (newTask) {
        newTask.focus();
      }
    }, [tasks]);

    return (
      <div className={css({
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginTop: "8px"
      })}>
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
  }

  // Default: Render time and blocks view
  const displayBlocks = [];
  for (let index = startHour; index < startHour + numberOfHours; index++) {
    const blockId1 = `Block-${index}`;
    const blockId2 = `Block-${index + 0.5}`;
    const status1 = blocks[blockId1]?.status ?? "free";
    const status2 = blocks[blockId2]?.status ?? "free";
    displayBlocks.push(
      <div key={`Combined-${index}`}>
        <Label key={`TimeLine-${index}`} width={labelWidth}>
          {use24HourTime === true ? hour24(index) : hour12(index)}
        </Label>
        <div className={css({
          display: "flex",
          gap: "8px",
          marginTop: "4px"
        })}>
          <Block
            key={blockId1}
            blockId={blockId1}
            status={status1}
            size={blockSize}
          ></Block>
          <Block
            key={blockId2}
            blockId={blockId2}
            status={status2}
            size={blockSize}
          ></Block>
        </div>
      </div>
    );
  }

  return (
    <div className={css({
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "16px"
    })}>
      {displayBlocks}
    </div>
  );
};
