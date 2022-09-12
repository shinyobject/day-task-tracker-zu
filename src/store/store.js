import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";
import clone from "just-clone";
import { nanoid } from "nanoid";

export const useBlocks = create(
  persist(
    (set) => ({
      blocks: {},
      setBlock: (value) =>
        set((state) => {
          const newBlocks = clone(state.blocks);
          newBlocks[value.blockId] = value;
          return { blocks: newBlocks };
        }),
      clearAllBlocks: () =>
        set(() => {
          return { blocks: {} };
        }),
    }),
    { name: "blocks" }
  )
);

const initialTask = () => {
  const id = nanoid();
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

export const useTasks = create(
  persist(
    (set) => ({
      tasks: {},
      setTask: (value) =>
        set((state) => {
          const newTasks = clone(state.tasks);
          newTasks[value.taskId] = value;
          return { ...state, tasks: newTasks };
        }),
      newTask: () =>
        set((state) => {
          const currentTasks = clone(state.tasks);
          const newTask = initialTask();
          return { ...state, tasks: { ...currentTasks, ...newTask } };
        }),
      removeTask: (taskId) =>
        set((state) => {
          const newTasks = clone(state.tasks);
          delete newTasks[taskId];
          return { ...state, tasks: newTasks };
        }),
      clearAllTasks: () => set((state) => ({ ...state, tasks: {} })),
    }),
    { name: "tasks" }
  )
);

export const useControls = create(
  persist(
    (set) => ({
      use24HourTime: false,
      startHour: 7,
      numberOfHours: 9,
      blockSize: 25,
      setField: (field, value) =>
        set((state) => ({
          [field]: value,
        })),
    }),
    { name: "controls" }
  )
);

const today = new Date();
console.log("today", today.getTime());
export const useDate = create(
  persist(
    (set) => ({
      date: today.getDate(),
      setDate: (day) => set((state) => ({ date: day })),
    }),
    { name: "date" }
  )
);
