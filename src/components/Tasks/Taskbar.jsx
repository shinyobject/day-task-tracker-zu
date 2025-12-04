export const TaskBar = ({ blockSize, length, hasEnoughTimeLeft }) => {
  const width = blockSize * length + 8 * (length - 1);
  const background = hasEnoughTimeLeft === true ? "blue" : "red";

  return (
    <div style={{ width: `${width}px`, height: "16px", background }}></div>
  );
};
