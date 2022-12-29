import styled from "styled-components";

export const Label = styled.div`
  width: ${({ width }) => width}px;
  color: #333;
  text-align: center;
  border-bottom: 2px solid #999;
  padding-bottom: 2px;
  @media (prefers-color-scheme: dark) {
    color: #aaa;
  }
`;
