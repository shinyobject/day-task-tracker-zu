import styled from "styled-components";

export const TaskBar = styled.div`
  width: ${({ blockSize, length }) => blockSize * length + 8 * (length - 1)}px;
  height: 16px;
  background: ${({ hasEnoughTimeLeft }) =>
    hasEnoughTimeLeft === true ? "blue" : "red"};
`;
