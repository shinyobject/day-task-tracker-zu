import { css } from "styled-system/css";

export const DoneToggle = (props) => {
  return (
    <input
      type="checkbox"
      className={css({
        border: "1px solid black",
        "@media (prefers-color-scheme: dark)": {
          borderColor: "white"
        }
      })}
      {...props}
    />
  );
};
