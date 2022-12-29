import styled from "styled-components";

export const FreeBlock = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 1px solid black;
  @media (prefers-color-scheme: dark) {
    border-color: white;
  }
`;
