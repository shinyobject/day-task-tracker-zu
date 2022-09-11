import styled from "styled-components";
import { useBlocks, useControls } from "store";
import { Block } from "components/Blocks";

export const Blocks = styled(({ className }) => {
  const numberOfHours = useControls((state) => state.numberOfHours);
  const startHour = useControls((state) => state.startHour);
  const blocks = useBlocks((state) => state.blocks);

  const blocksArray = [...Array(numberOfHours * 2)].map((item, index) => {
    const timeId = startHour + index * 0.5;
    const blockId = `Block-${timeId}`;
    const blockStatus =
      blocks[blockId] !== undefined ? blocks[blockId].status : "free";
    return (
      <Block
        key={blockId}
        time={timeId}
        blockId={blockId}
        status={blockStatus}
      ></Block>
    );
  });

  return <div className={className}>{blocksArray}</div>;
})`
  display: flex;
  gap: 8px;
`;
