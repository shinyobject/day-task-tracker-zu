import styled from "styled-components";
import shallow from "zustand/shallow";
import { hour12, hour24 } from "utils/hour";
import { Label } from "./Label";
import { useControls } from "store";

export const TimeLine = styled(({ className }) => {
  const { use24HourTime, blockSize, startHour, numberOfHours } = useControls(
    (state) => ({
      use24HourTime: state.use24HourTime,
      blockSize: state.blockSize,
      startHour: state.startHour,
      numberOfHours: state.numberOfHours,
    }),
    shallow
  );
  // Local constants
  const numberOfBlocksPerLine = 2;
  const gapBetweenBlocks = 8;
  const labelWidth = blockSize * numberOfBlocksPerLine + gapBetweenBlocks;

  return (
    <div className={className}>
      {[...Array(numberOfHours * 2)].map((item, index) => {
        const timeId = startHour * 1 + index * 0.5;
        return (
          timeId % 1 === 0 && (
            <Label key={`TimeLine-${timeId}`} width={labelWidth}>
              {use24HourTime === true ? hour24(timeId) : hour12(timeId)}
            </Label>
          )
        );
      })}
    </div>
  );
})`
  display: flex;
  flex-shrink: 0;
  gap: 8px;
  padding-bottom: 4px;
`;
