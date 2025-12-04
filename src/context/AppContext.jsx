import { createContext, useContext, useReducer, useEffect } from "react";
import { uuid } from "utils/uuid";

// Initial state
const getInitialState = () => {
  const stored = localStorage.getItem("app-state");
  if (stored) {
    try {
      const state = JSON.parse(stored);

      // Migration: Initialize taskOrder if it doesn't exist
      if (!state.taskOrder && state.tasks) {
        state.taskOrder = Object.keys(state.tasks);
      }

      return state;
    } catch (e) {
      console.error("Failed to parse stored state:", e);
    }
  }

  return {
    blocks: {},
    tasks: {},
    taskOrder: [], // Array of taskIds in display order
    settings: {
      use24HourTime: false,
      startHour: 7,
      endHour: 16,
      numberOfHours: 9,
      blockSize: 25,
    },
    date: new Date().getDate(),
  };
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    // Block actions
    case "SET_BLOCK":
      return {
        ...state,
        blocks: {
          ...state.blocks,
          [action.payload.blockId]: action.payload,
        },
      };

    case "CLEAR_ALL_BLOCKS":
      return { ...state, blocks: {} };

    case "CLEAR_PAST_BLOCKS":
      return {
        ...state,
        blocks: Object.fromEntries(
          Object.entries(state.blocks).filter(([_, block]) => block.status !== "past")
        ),
      };

    // Task actions
    case "SET_TASK":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.taskId]: action.payload,
        },
      };

    case "NEW_TASK": {
      const id = uuid();
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [id]: {
            taskId: id,
            name: "new task",
            done: false,
            enoughTime: true,
            length: 1,
          },
        },
        taskOrder: [...state.taskOrder, id], // Add new task to end of order
      };
    }

    case "REMOVE_TASK": {
      const { [action.payload]: removed, ...remainingTasks } = state.tasks;
      return {
        ...state,
        tasks: remainingTasks,
        taskOrder: state.taskOrder.filter((id) => id !== action.payload), // Remove from order
      };
    }

    case "REORDER_TASKS":
      return { ...state, taskOrder: action.payload };

    case "CLEAR_ALL_TASKS":
      return { ...state, tasks: {}, taskOrder: [] };

    // Settings actions
    case "UPDATE_SETTING":
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.field]: action.payload.value,
        },
      };

    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };

    // Date action
    case "SET_DATE":
      return { ...state, date: action.payload };

    // Clear all data
    case "CLEAR_ALL":
      return {
        ...state,
        blocks: {},
        tasks: {},
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext(null);

// Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, null, getInitialState);

  // Sync to localStorage on state changes
  useEffect(() => {
    localStorage.setItem("app-state", JSON.stringify(state));

    // TODO: When adding Supabase, add sync here:
    // syncToSupabase(state);
  }, [state]);

  // Check date on mount and clear old data if new day
  useEffect(() => {
    const today = new Date().getDate();
    if (state.date !== today) {
      dispatch({ type: "CLEAR_ALL" });
      dispatch({ type: "SET_DATE", payload: today });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
