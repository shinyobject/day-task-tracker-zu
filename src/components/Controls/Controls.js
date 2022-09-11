import styled from "styled-components";
import { AddTask } from "./AddTask";
import { ClearAll } from "./ClearAll";
import { SettingsButton } from "./SettingsButton";

const Left = styled.div`
  display: flex;
  gap: 8px;
`;

export const Controls = styled(({ className, setIsOpen }) => {
  return (
    <div className={className}>
      <Left>
        <AddTask />
        <ClearAll />
      </Left>
      <SettingsButton onClick={() => setIsOpen(true)}>Settings</SettingsButton>
    </div>
  );
})`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
`;
