import { useApp } from "../context/AppContext";
import { useCallback } from "react";

export const useTasks = () => {
  const { state, dispatch } = useApp();

  const setTask = useCallback(
    (task) => {
      dispatch({ type: "SET_TASK", payload: task });
    },
    [dispatch]
  );

  const newTask = useCallback(() => {
    dispatch({ type: "NEW_TASK" });
  }, [dispatch]);

  const removeTask = useCallback(
    (taskId) => {
      dispatch({ type: "REMOVE_TASK", payload: taskId });
    },
    [dispatch]
  );

  const reorderTasks = useCallback(
    (newOrder) => {
      dispatch({ type: "REORDER_TASKS", payload: newOrder });
    },
    [dispatch]
  );

  const clearAllTasks = useCallback(() => {
    dispatch({ type: "CLEAR_ALL_TASKS" });
  }, [dispatch]);

  return {
    tasks: state.tasks,
    taskOrder: state.taskOrder,
    setTask,
    newTask,
    removeTask,
    reorderTasks,
    clearAllTasks,
  };
};
