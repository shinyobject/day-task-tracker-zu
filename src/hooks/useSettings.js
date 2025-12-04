import { useApp } from "../context/AppContext";
import { useCallback } from "react";

export const useSettings = () => {
  const { state, dispatch } = useApp();

  const updateSetting = useCallback(
    (field, value) => {
      dispatch({ type: "UPDATE_SETTING", payload: { field, value } });
    },
    [dispatch]
  );

  const updateSettings = useCallback(
    (settings) => {
      dispatch({ type: "UPDATE_SETTINGS", payload: settings });
    },
    [dispatch]
  );

  return {
    settings: state.settings,
    updateSetting,
    updateSettings,
  };
};
