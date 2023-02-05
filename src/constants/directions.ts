export const directionalStepsDict = {
  n: [0, -1],
  ne: [1, -1],
  e: [1, 0],
  se: [1, 1],
  s: [0, 1],
  sw: [-1, 1],
  w: [-1, 0],
  nw: [-1, -1],
};

export type DirectionsKeys = keyof typeof directionalStepsDict;

export const summingDirectionsDict = {
  n: "s",
  ne: "sw",
  e: "w",
  se: "nw",
};
