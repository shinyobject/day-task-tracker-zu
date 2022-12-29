import styled from "styled-components";
import { inputStyles } from "../../styles/inputStyles";

export const TaskLength = styled.input.attrs({ pattern: "[0-9]*" })`
  ${inputStyles}
  flex-shrink:1;
  flex-grow: 1;
  width: 2ch;
`;
