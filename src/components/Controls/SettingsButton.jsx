import { css } from "styled-system/css";

export const SettingsButton = (props) => {
  return (
    <button
      className={css({
        border: 0,
        background: "transparent"
      })}
      {...props}
    />
  );
};
