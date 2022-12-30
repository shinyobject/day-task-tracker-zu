import styled from "styled-components";
import { controlButtonStyles } from "styles/controlButtonStyles";
import { useTasks } from "store";

export const AddTask = styled(({ className }) => {
  const newTask = useTasks((state) => state.newTask);

  return (
    <button className={className} onClick={newTask}>
      Add Task
    </button>
  );
})`
  ${controlButtonStyles}
  flex-grow: 1;
  padding: 8px 0;
`;
