export interface IColors {
  [key: string]: string;
}

export interface IStatusColors {
  [key: string]: string;
}

const colors: IColors = {
  DEFAULT: "#F4F4F4",

  BLUE: "#42A5F5",
  GREEN: "#66BB6A",
  YELLOW: "#FFEB3B",
  LIME: "#CDDC39",
  AMBER: "#FFC107",
  RED: "#FF7043",
  ORANGE: "#FFA726",
  DEEPORANGE: "#FF9800",
  PURPLE: "#9C27B0",
  PINK: "#E91E63",
  DEEPPURPLE: "#512DA8",
  INDIGO: "#3F51B5",
  TEAL: "#009688",
  CYAN: "#00BCD4",
  BROWN: "#795548",
  GRAY: "#9E9E9E",
};

export default colors;

export const statusColors: IStatusColors = {
  BLUE: "BLUE",
  GREEN: "GREEN",
  YELLOW: "YELLOW",
  LIME: "LIME",
  AMBER: "AMBER",
  RED: "RED",
  ORANGE: "ORANGE",
  DEEPORANGE: "DEEPORANGE",
  PURPLE: "PURPLE",
  PINK: "PINK",
  DEEPPURPLE: "DEEPPURPLE",
  INDIGO: "INDIGO",
  TEAL: "TEAL",
  CYAN: "CYAN",
  BROWN: "BROWN",
  GRAY: "GRAY",
};
