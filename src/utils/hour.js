export const hour12 = (hour24) => {
  return hour24 % 12 === 0 ? 12 : hour24 % 12;
};

export const hour24 = (hour24) => {
  return hour24 % 24;
};
