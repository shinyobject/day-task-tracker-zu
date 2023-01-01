import { useRef, useState } from "react";
import shallow from "zustand/shallow";
import styled from "styled-components";
import { useControls, useBlocks } from "store";
import { ClearAll } from "./ClearAll";
import { controlButtonStyles } from "styles/controlButtonStyles";

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CloseButton = styled.button`
  ${controlButtonStyles}
  width: fit-content;
`;

export const Settings = styled(({ className, setIsOpen }) => {
  const controls = useControls(
    (state) => ({
      use24HourTime: state.use24HourTime,
      blockSize: state.blockSize,
      startHour: state.startHour,
      numberOfHours: state.numberOfHours,
    }),
    shallow
  );
  const { use24HourTime, blockSize, startHour, numberOfHours } = controls;
  const setField = useControls((state) => state.setField);
  const clearPastBlocks = useBlocks((state) => state.clearPastBlocks);

  const [form, setForm] = useState({
    use24HourTime,
    blockSize,
    startHour,
    numberOfHours,
  });

  const refs = {
    blockSize: useRef(),
    numberOfHours: useRef(),
    startHour: useRef(),
  };

  const handleForm = (field, value) => {
    setForm({ ...form, [field]: value });
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
    <div className={className}>
      <h2>Settings</h2>
      <Row>
        Clear all task and block data <ClearAll />
      </Row>
      <Row>
        <input
          type="checkbox"
          value={form.use24HourTime}
          checked={form.use24HourTime}
          onChange={() => handleForm("use24HourTime", !form.use24HourTime)}
        />
        <label>use 24 hour time</label>
      </Row>
      <Row>
        <span>Start hour</span>
        <input
          ref={refs.startHour}
          onFocus={() => refs.startHour.current.select()}
          type="text"
          value={form.startHour}
          onChange={(e) => handleForm("startHour", e.target.value)}
        />
      </Row>
      <Row>
        <label>Number of hours</label>
        <input
          ref={refs.numberOfHours}
          onFocus={() => refs.numberOfHours.current.select()}
          type="text"
          value={form.numberOfHours}
          onChange={(e) => handleForm("numberOfHours", e.target.value)}
        />
      </Row>
      <Row>
        <label>Block size</label>
        <input
          ref={refs.blockSize}
          onFocus={() => refs.blockSize.current.select()}
          type="text"
          value={form.blockSize}
          onChange={(e) => handleForm("blockSize", e.target.value)}
        />
      </Row>
      <CloseButton onClick={handleClose}>Close</CloseButton>
    </div>
  );
})`
  input[type="text"] {
    width: 3ch;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  @media (prefers-color-scheme: dark) {
    background: black;
    color: white;
  }
  z-index: 10;
`;
