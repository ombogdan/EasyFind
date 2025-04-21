export interface IAppTheme {
  palette: {
    dark: `#${string}`;
    darkLight: `#${string}`;
    mediumDark: `#${string}`;
    medium: `#${string}`;
    lightMedium: `#${string}`;
    light: `#${string}`;
    white: `#${string}`;
    accentPurple: `#${string}`;
    accentRed: `#${string}`;
    accentBlue: `#${string}`;
    backgroundLight: `#${string}`;
    backgroundLighter: `#${string}`;
    highlightPurple: `#${string}`;
    highlightPink: `#${string}`;
    yellow: `#${string}`;
  };
}

export const defaultTheme: IAppTheme = {
  palette: {
    dark: "#18191F",
    darkLight: "#31333F",
    mediumDark: "#424454",
    medium: "#565869",
    lightMedium: "#7A7C8B",
    light: "#C1C2CE",
    white: "#FFFFFF",
    backgroundLight: "#F3F5F9",
    backgroundLighter: "#ECEEF2",
    accentPurple: "#8074FF",
    highlightPurple: "#8074FF",
    accentBlue: "#04ADDC",
    yellow: "#FFA726",
    highlightPink: "#F183D2",
    accentRed: "#FA5555"
  }
};
