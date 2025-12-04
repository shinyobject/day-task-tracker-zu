import { css } from "styled-system/css";

export const Label = ({ width, children }) => {
  return (
    <div
      className={css({
        color: "#333",
        textAlign: "center",
        borderBottom: "2px solid #999",
        paddingBottom: "2px",
        "@media (prefers-color-scheme: dark)": {
          color: "#aaa"
        }
      })}
      style={{ width: `${width}px` }}
    >
      {children}
    </div>
  );
};
