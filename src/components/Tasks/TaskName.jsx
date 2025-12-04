import { forwardRef } from "react";
import { css } from "styled-system/css";

export const TaskName = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      className={css({
        border: "1px solid transparent",
        padding: "2px 8px",
        background: "transparent",
        fontSize: "16px",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "100%",
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
