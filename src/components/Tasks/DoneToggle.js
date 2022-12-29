import styled from "styled-components";

export const DoneToggle = styled.input.attrs({ type: "checkbox" })`
  border: 1px solid black;
  @media (prefers-color-scheme: dark) {
    border-color: white;
  }
`;
