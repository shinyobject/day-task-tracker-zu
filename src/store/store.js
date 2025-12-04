import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { uuid } from "utils/uuid";

const initialTask = () => {
  const id = uuid();
  return {
    [id]: {
      taskId: id,
      name: "new task",
      done: false,
      enoughTime: true,
      length: 1,
    },
  };
};

const today = new Date();

// Combined store using Immer for immutable updates
export const useStore = create(
  persist(
    immer((set) => ({
      // Blocks state
      blocks: {},
      setBlock: (value) =>
        set((state) => {
          state.blocks[value.blockId] = value;
        }),
      clearAllBlocks: () =>
        set((state) => {
          state.blocks = {};
        }),
      clearPastBlocks: () =>
        set((state) => {
          Object.keys(state.blocks).forEach((blockId) => {
            if (state.blocks[blockId].status === "past") {
              delete state.blocks[blockId];
            }
          });
        }),

      // Tasks state
      tasks: {},
      setTask: (value) =>
        set((state) => {
          state.tasks[value.taskId] = value;
        }),
      newTask: () =>
        set((state) => {
          const newTask = initialTask();
          Object.assign(state.tasks, newTask);
        }),
      removeTask: (taskId) =>
        set((state) => {
          delete state.tasks[taskId];
        }),
      clearAllTasks: () =>
        set((state) => {
          state.tasks = {};
        }),

      // Controls state
      use24HourTime: false,
      startHour: 7,
      endHour: 16,
      numberOfHours: 9,
      blockSize: 25,
      setField: (field, value) =>
        set((state) => {
          state[field] = value;
        }),

      // Date state
      date: today.getDate(),
      setDate: (day) =>
        set((state) => {
          state.date = day;
        }),
    })),
    { name: "app-store" }
  )
);

// Backward compatibility exports - selector functions
export const useBlocks = (selector) => useStore((state) => selector ? selector({
  blocks: state.blocks,
  setBlock: state.setBlock,
  clearAllBlocks: state.clearAllBlocks,
  clearPastBlocks: state.clearPastBlocks,
}) : {
  blocks: state.blocks,
  setBlock: state.setBlock,
  clearAllBlocks: state.clearAllBlocks,
  clearPastBlocks: state.clearPastBlocks,
});

export const useTasks = (selector) => useStore((state) => selector ? selector({
  tasks: state.tasks,
  setTask: state.setTask,
  newTask: state.newTask,
  removeTask: state.removeTask,
  clearAllTasks: state.clearAllTasks,
}) : {
  tasks: state.tasks,
  setTask: state.setTask,
  newTask: state.newTask,
  removeTask: state.removeTask,
  clearAllTasks: state.clearAllTasks,
});

export const useControls = (selector) => useStore((state) => selector ? selector({
  use24HourTime: state.use24HourTime,
  startHour: state.startHour,
  endHour: state.endHour,
  numberOfHours: state.numberOfHours,
  blockSize: state.blockSize,
  setField: state.setField,
}) : {
  use24HourTime: state.use24HourTime,
  startHour: state.startHour,
  endHour: state.endHour,
  numberOfHours: state.numberOfHours,
  blockSize: state.blockSize,
  setField: state.setField,
});

export const useDate = (selector) => useStore((state) => selector ? selector({
  date: state.date,
  setDate: state.setDate,
}) : {
  date: state.date,
  setDate: state.setDate,
});
