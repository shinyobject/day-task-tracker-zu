import { css } from "styled-system/css";
import { AddTask } from "./AddTask";
import { SettingsButton } from "./SettingsButton";

export const Controls = ({ isOpen, setIsOpen }) => {
  return (
    <div className={css({
      display: "flex",
      justifyContent: "space-between",
      gap: "8px",
      marginBottom: "16px"
    })}>
      <AddTask />
      <SettingsButton onClick={() => setIsOpen(!isOpen)}>
        Settings
      </SettingsButton>
    </div>
  );
};
