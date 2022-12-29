import styled from "styled-components";
import { useBlocks, useControls } from "store";
import { Label } from "components/TimeLine";
import { Block } from "components/Blocks";
import { hour12, hour24 } from "utils/hour";

const CombinedBlock = styled.div``;
const TheBlocks = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

export const TimeAndBlocks = styled(({ className }) => {
  const blocks = useBlocks((state) => state.blocks);
  const numberOfHours = useControls((state) => state.numberOfHours) * 1;
  const startHour = useControls((state) => state.startHour) * 1;
  const blockSize = useControls((state) => state.blockSize) * 1;
  const use24HourTime = useControls((state) => state.use24HourTime);
  const numberOfBlocksPerLine = 2;
  const gapBetweenBlocks = 8;
  const labelWidth = blockSize * numberOfBlocksPerLine + gapBetweenBlocks;

  const displayBlocks = [];
  for (let index = startHour; index < startHour + numberOfHours; index++) {
    const blockId1 = `Block-${index}`;
    const blockId2 = `Block-${index + 0.5}`;
    const status1 = blocks[blockId1]?.status ?? "free";
    const status2 = blocks[blockId2]?.status ?? "free";
    displayBlocks.push(
      <CombinedBlock key={`Combined-${index}`}>
        <Label key={`TimeLine-${index}`} width={labelWidth}>
          {use24HourTime === true ? hour24(index) : hour12(index)}
        </Label>
        <TheBlocks>
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
        </TheBlocks>
      </CombinedBlock>
    );
  }
  return <div className={className}>{displayBlocks}</div>;
})`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
