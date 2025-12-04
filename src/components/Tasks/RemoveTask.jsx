import { css } from "styled-system/css";

export const RemoveTask = (props) => {
  return (
    <button
      className={css({
        border: 0,
        background: "transparent",
        fontSize: "18px",
        flexBasis: "2ch",
        textAlign: "right"
      })}
      {...props}
    />
  );
};
