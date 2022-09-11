import { css } from "styled-components";

export const inputStyles = css`
  border: 1px solid transparent;
  padding: 2px 8px;
  background: transparent;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
  &:hover:focus {
    cursor: text;
  }
  .done &:focus,
  &:focus {
    background: #fff;
    outline: none;
    color: #000;
    border-color: #ccc;
  }
`;
