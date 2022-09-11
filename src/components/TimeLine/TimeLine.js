import styled from "styled-components";
import { hour12, hour24 } from "utils/hour";
import { Label } from "./Label";
import { useControls } from "store";

export const TimeLine = styled(({ className }) => {
  const use24HourTime = useControls((state) => state.use24HourTime);
  const startHour = useControls((state) => state.startHour);
  const numberOfHours = useControls((state) => state.numberOfHours);
  const blockSize = useControls((state) => state.blockSize);

  // Local constants
  const numberOfBlocksPerLine = 2;
  const gapBetweenBlocks = 8;
  const labelWidth = blockSize * numberOfBlocksPerLine + gapBetweenBlocks;

  return (
    <div className={className}>
      {[...Array(numberOfHours * 2)].map((item, index) => {
        const timeId = startHour + index * 0.5;
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
