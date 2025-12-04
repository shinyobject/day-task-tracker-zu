import { useRef, useState } from "react";
import { shallow } from "zustand/shallow";
import { css } from "styled-system/css";
import { useControls, useBlocks } from "store";
import { ClearAll } from "./ClearAll";

const hoursSource = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
const intervalBetweenHours = (startHour, endHour) => {
  let count = 0;
  let currentHour = parseInt(startHour);
  const endHourInt = parseInt(endHour);
  while (currentHour !== endHourInt) {
    currentHour = (currentHour + 1) % 24;
    count = count + 1;
  }
  return count;
};
const hourOptions = hoursSource.map((hour) => {
  let displayHour = "";

  switch (hour) {
    case 0:
      displayHour = "12 AM";
      break;
    case 12:
      displayHour = "12 PM";
      break;
    default:
      displayHour = `${hour % 12} ${hour < 12 ? "AM" : "PM"}`;
      break;
  }
  return { value: hour, label: displayHour };
});

const SelectHour = ({ name, value, onChange }) => (
  <select
    className={css({
      fontSize: "1rem",
      marginBottom: "-3px",
      color: "black",
      "@media (prefers-color-scheme: dark)": {
        color: "white"
      }
    })}
    name={name}
    value={value}
    onChange={onChange}
  >
    {" "}
    {hourOptions.map((hour, index) => (
      <option key={`startHour-${index}`} value={hour.value}>
        {hour.label}
      </option>
    ))}
  </select>
);

export const Settings = ({ setIsOpen }) => {
  const controls = useControls(
    (state) => ({
      use24HourTime: state.use24HourTime,
      blockSize: state.blockSize,
      startHour: state.startHour,
      endHour: state.endHour,
      numberOfHours: state.numberOfHours,
    }),
    shallow
  );
  const { use24HourTime, blockSize, startHour, endHour, numberOfHours } =
    controls;
  const setField = useControls((state) => state.setField);
  const clearPastBlocks = useBlocks((state) => state.clearPastBlocks);

  const [form, setForm] = useState({
    use24HourTime,
    blockSize,
    startHour,
    endHour,
    numberOfHours,
  });

  const refs = {
    blockSize: useRef(),
    numberOfHours: useRef(),
    startHour: useRef(),
    endHour: useRef(),
  };

  const handleForm = (field, value) => {
    const valueInt = parseInt(value);
    let interval = form.numberOfHours;
    if (field === "startHour") {
      interval = intervalBetweenHours(valueInt, form.endHour);
    }
    if (field === "endHour") {
      interval = intervalBetweenHours(form.startHour, valueInt);
    }

    setForm({ ...form, [field]: value, numberOfHours: interval });
  };
  const handleClose = () => {
    for (const field in form) {
      if (controls[field] !== form[field]) {
        setField(field, form[field]);
        clearPastBlocks();
      }
    }
    setIsOpen(false);
  };

  return (
    <div className={css({
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: "white",
      zIndex: 10,
      "& input[type='text']": {
        width: "3ch",
        fontSize: "1rem"
      },
      "& h2": {
        marginTop: 0,
        marginBottom: "10px"
      },
      "@media (prefers-color-scheme: dark)": {
        background: "black",
        color: "white"
      }
    })}>
      <h2>Settings</h2>
      <div className={css({
        display: "flex",
        alignItems: "center",
        gap: "4px"
      })}>
        Clear all task and block data <ClearAll />
      </div>
      <div className={css({
        display: "flex",
        alignItems: "center",
        gap: "4px"
      })}>
        <input
          type="checkbox"
          value={form.use24HourTime}
          checked={form.use24HourTime}
          onChange={() => handleForm("use24HourTime", !form.use24HourTime)}
        />
        <label>use 24 hour time for timeline</label>
      </div>
      <div className={css({
        display: "flex",
        gap: "8px",
        alignItems: "center",
        "& select + span": {
          marginLeft: "10px"
        }
      })}>
        <div>Start </div>
        <SelectHour
          name="startHour"
          value={form.startHour}
          onChange={(e) => handleForm("startHour", e.target.value)}
        />
        <div>End </div>
        <SelectHour
          name="endHour"
          value={form.endHour}
          onChange={(e) => handleForm("endHour", e.target.value)}
        />
      </div>
      <div className={css({
        display: "flex",
        alignItems: "center",
        gap: "4px"
      })}>
        <label>Number of hours</label>
        <input
          ref={refs.numberOfHours}
          onFocus={() => refs.numberOfHours.current.select()}
          pattern="[0-9]*"
          type="text"
          value={form.numberOfHours}
          onChange={(e) => handleForm("numberOfHours", e.target.value)}
        />
      </div>
      <div className={css({
        display: "flex",
        alignItems: "center",
        gap: "4px"
      })}>
        <label>Block size</label>
        <input
          ref={refs.blockSize}
          onFocus={() => refs.blockSize.current.select()}
          pattern="[0-9]*"
          type="text"
          value={form.blockSize}
          onChange={(e) => handleForm("blockSize", e.target.value)}
        />
      </div>
      <button
        className={css({
          padding: "4px 8px",
          background: "#109aed",
          color: "white",
          fontSize: "14px",
          fontWeight: 600,
          border: 0,
          borderRadius: "4px",
          width: "fit-content"
        })}
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  );
};
