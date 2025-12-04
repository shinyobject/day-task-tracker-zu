import { useApp } from "../context/AppContext";
import { useCallback } from "react";

export const useBlocks = () => {
  const { state, dispatch } = useApp();

  const setBlock = useCallback(
    (block) => {
      dispatch({ type: "SET_BLOCK", payload: block });
    },
    [dispatch]
  );

  const clearAllBlocks = useCallback(() => {
    dispatch({ type: "CLEAR_ALL_BLOCKS" });
  }, [dispatch]);

  const clearPastBlocks = useCallback(() => {
    dispatch({ type: "CLEAR_PAST_BLOCKS" });
  }, [dispatch]);

  return {
    blocks: state.blocks,
    setBlock,
    clearAllBlocks,
    clearPastBlocks,
  };
};
