import { css } from "styled-system/css";
import { useTasks, useBlocks } from "store";

export const ClearAll = () => {
  const clearAllTasks = useTasks((state) => state.clearAllTasks);
  const clearAllBlocks = useBlocks((state) => state.clearAllBlocks);
  const handleClearAll = () => {
    clearAllTasks();
    clearAllBlocks();
  };

  return (
    <button
      className={css({
        padding: "4px 8px",
        background: "#109aed",
        color: "white",
        fontSize: "14px",
        fontWeight: 600,
        border: 0,
        borderRadius: "4px"
      })}
      onClick={handleClearAll}
    >
      Clear All
    </button>
  );
};
