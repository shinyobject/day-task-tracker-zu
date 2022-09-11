import styled from "styled-components";
import { FreeBlock } from "./FreeBlock";
import { useControls, useBlocks } from "store";

export const FreeBlocks = styled(({ className }) => {
  const blockSize = useControls((state) => state.blockSize);
  const numberOfHours = useControls((state) => state.numberOfHours);
  const blocks = useBlocks((state) => state.blocks);
  const blockArray = Object.values(blocks);
  const usedTime = blockArray.reduce(
    (previousValue, currentValue) =>
      currentValue.status !== "free" ? previousValue + 1 : previousValue,
    0
  );

  if (usedTime >= numberOfHours * 2) return;

  return (
    <div className={className}>
      {[...Array(numberOfHours * 2 - usedTime)].map((item, index) => (
        <FreeBlock key={`FreeBlock-${index}`} size={blockSize - 2} />
      ))}
    </div>
  );
})`
  display: flex;
  gap: 8px;
`;
