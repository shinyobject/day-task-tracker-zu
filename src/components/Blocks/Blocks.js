import styled from "styled-components";
import shallow from "zustand/shallow";
import { useBlocks, useControls } from "store";
import { Block } from "components/Blocks";

export const Blocks = styled(({ className }) => {
  const { numberOfHours, startHour, blockSize } = useControls(
    (state) => ({
      numberOfHours: state.numberOfHours,
      startHour: state.startHour,
      blockSize: state.blockSize,
    }),
    shallow
  );
  const blocks = useBlocks((state) => state.blocks);

  const blocksArray = [...Array(numberOfHours * 2)].map((item, index) => {
    const timeId = startHour * 1 + index * 0.5;
    const blockId = `Block-${timeId}`;
    const blockStatus =
      blocks[blockId] !== undefined ? blocks[blockId].status : "free";
    return (
      <Block
        key={blockId}
        time={timeId}
        blockId={blockId}
        status={blockStatus}
        size={blockSize}
      ></Block>
    );
  });

  return <div className={className}>{blocksArray}</div>;
})`
  display: flex;
  gap: 8px;
`;
