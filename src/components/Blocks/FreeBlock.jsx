import { css } from "styled-system/css";

export const FreeBlock = ({ size }) => {
  return (
    <div
      className={css({
        border: "1px solid black",
        "@media (prefers-color-scheme: dark)": {
          borderColor: "white"
        }
      })}
      style={{ width: `${size}px`, height: `${size}px` }}
    ></div>
  );
};
