import { css, cx } from "styled-system/css";
import { useBlocks } from "store";

const statusArray = ["free", "taken1", "taken2", "taken3"];

export const Block = ({ blockId, status, size }) => {
  const setBlock = useBlocks((state) => state.setBlock);
  const handleStatus = () => {
    const currentIndex = statusArray.findIndex((value) => value === status);
    const nextIndex = (currentIndex + 1) % statusArray.length;
    setBlock({ blockId, status: statusArray[nextIndex] });
  };

  return (
    <button
      className={cx(
        css({
          border: "1px solid black",
          background: "transparent",
          "&.past": {
            background: "black"
          },
          "&.taken1": {
            background: "#f509dd"
          },
          "&.taken2": {
            background: "#f0d319"
          },
          "&.taken3": {
            background: "#6c95f0"
          },
          "@media (prefers-color-scheme: dark)": {
            borderColor: "white",
            "&.past": {
              background: "#444",
              borderColor: "#aaa"
            }
          }
        }),
        status
      )}
      style={{ width: `${size}px`, height: `${size}px` }}
      onClick={handleStatus}
    ></button>
  );
};
