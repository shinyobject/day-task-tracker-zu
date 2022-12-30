import styled from "styled-components";
import { AddTask } from "./AddTask";
import { SettingsButton } from "./SettingsButton";

export const Controls = styled(({ className, isOpen, setIsOpen }) => {
  return (
    <div className={className}>
      <AddTask />
      <SettingsButton onClick={() => setIsOpen(!isOpen)}>
        Settings
      </SettingsButton>
    </div>
  );
})`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
`;
