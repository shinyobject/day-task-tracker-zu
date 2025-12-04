import { css } from "styled-system/css";
import { useTasks } from "store";

export const AddTask = () => {
  const newTask = useTasks((state) => state.newTask);

  return (
    <button
      className={css({
        padding: "8px 0",
        background: "#109aed",
        color: "white",
        fontSize: "14px",
        fontWeight: 600,
        border: 0,
        borderRadius: "4px",
        flexGrow: 1
      })}
      onClick={newTask}
    >
      Add Task
    </button>
  );
};
