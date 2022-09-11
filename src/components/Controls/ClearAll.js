import styled from "styled-components";
import { controlButtonStyles } from "styles/controlButtonStyles";
import { useTasks, useBlocks } from "store";

export const ClearAll = styled(({ className }) => {
  const clearAllTasks = useTasks((state) => state.clearAllTasks);
  const clearAllBlocks = useBlocks((state) => state.clearAllBlocks);
  const handleClearAll = () => {
    clearAllTasks();
    clearAllBlocks();
  };

  return (
    <button className={className} onClick={handleClearAll}>
      Clear All
    </button>
  );
})`
  border: 0;
  background: transparent;
`;
