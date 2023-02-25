import create from "zustand";
import { persist } from "zustand/middleware";
import { clone } from "utils/clone";
import { uuid } from "utils/uuid";

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
      clearPastBlocks: () =>
        set((state) => {
          const noPastBlocks = clone(state.blocks);
          for (const block in state.blocks) {
            if (noPastBlocks[block].status === "past") {
              delete noPastBlocks[block];
            }
          }

          return { blocks: noPastBlocks };
        }),
    }),
    { name: "blocks" }
  )
);

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

export const useTasks = create(
  persist(
    (set) => ({
      tasks: {},
      setTask: (value) =>
        set((state) => {
          const newTasks = clone(state.tasks);
          newTasks[value.taskId] = value;
          return { tasks: newTasks };
        }),
      newTask: () =>
        set((state) => {
          const currentTasks = clone(state.tasks);
          const newTask = initialTask();
          return { tasks: { ...currentTasks, ...newTask } };
        }),
      removeTask: (taskId) =>
        set((state) => {
          const newTasks = clone(state.tasks);
          delete newTasks[taskId];
          return { tasks: newTasks };
        }),
      clearAllTasks: () => set((state) => ({ tasks: {} })),
    }),
    { name: "tasks" }
  )
);

export const useControls = create(
  persist(
    (set) => ({
      use24HourTime: false,
      startHour: 7,
      endHour: 16,
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
export const useDate = create(
  persist(
    (set) => ({
      date: today.getDate(),
      setDate: (day) => set((state) => ({ date: day })),
    }),
    { name: "date" }
  )
);
