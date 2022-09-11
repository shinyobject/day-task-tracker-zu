import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";
import clone from "just-clone";

export const useBlocks = create(
  persist((set) => ({
    blocks: {},
    setBlock: (value) =>
      set((state) => {
        const newBlocks = clone(state.blocks);
        newBlocks[value.blockId] = value;
        return { ...state, blocks: newBlocks };
      }),
  }))
);

export const useTasks = create(
  persist((set) => ({
    tasks: {
      "initial task": {
        taskId: "initial task",
        name: "new task",
        done: false,
        enoughTime: true,
        length: 1,
      },
    },
    setTask: (value) =>
      set((state) => {
        const newTasks = clone(state.tasks);
        newTasks[value.taskId] = value;
        return { ...state, tasks: newTasks };
      }),
    removeTask: (taskId) =>
      set((state) => {
        const newTasks = clone(state.tasks);
        delete newTasks[taskId];
        return { ...state, tasks: newTasks };
      }),
  }))
);

export const useControls = create(
  persist((set) => ({
    use24HourTime: false,
    startHour: 7,
    numberOfHours: 9,
    blockSize: 25,
    setField: (field, value) =>
      set((state) => ({
        ...state,
        [field]: value,
      })),
  }))
);
