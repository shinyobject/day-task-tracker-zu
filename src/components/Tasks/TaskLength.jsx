import { forwardRef } from "react";
import { css } from "styled-system/css";

export const TaskLength = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      pattern="[0-9]*"
      className={css({
        border: "1px solid transparent",
        padding: "2px 8px",
        background: "transparent",
        fontSize: "16px",
        flexShrink: 1,
        flexGrow: 1,
        flexBasis: "2ch",
        width: "2ch",
        "&:hover": {
          cursor: "pointer"
        },
        "&:hover:focus": {
          cursor: "text"
        },
        ".done &:focus, &:focus": {
          background: "#fff",
          outline: "none",
          color: "#000",
          borderColor: "#ccc"
        }
      })}
      {...props}
    />
  );
});
