export interface IAppTheme {
  palette: {
    dark: `#${string}`;
    primary: `#${string}`;
    gray: `#${string}`;
    disabled: `#${string}`;
    secondary: `#${string}`;
    white: `#${string}`;
    primaryGray: `#${string}`;
    secondaryDisabled: `#${string}`;
    accent: `#${string}`;
    accentHover: `#${string}`;
    accentPressed: `#${string}`;
    accentDisabled: `#${string}`;
    danger: `#${string}`;
    dangerLight: `#${string}`;
    dangerHover: `#${string}`;
    dangerDisabled: `#${string}`;
    orange: `#${string}`;
    accentDisabled1: `#${string}`;
    secondaryWhite: `#${string}`;
    grayPrimary: `#${string}`;
    grayLight: `#${string}`;
    success: `#${string}`;
    successLight: `#${string}`;
  };
}

export const defaultTheme: IAppTheme = {
  palette: {
    primary: '#000000',
    dark: '#2B2924',
    primaryGray: '#66727F',
    grayPrimary: '#6A6A6A',
    gray: '#8C8A8A',
    disabled: '#AAA8A8',
    grayLight: '#B8B8B8',
    secondaryDisabled: '#DCD6D6',
    secondaryWhite: '#EBEBEB',
    secondary: '#EEEEEE',
    white: '#FFFFFF',
    accentDisabled: '#FFEAE1',
    dangerDisabled: '#FAD6D6',
    accentDisabled1: '#FFDBCB',
    accentHover: '#FFB190',
    accent: '#E9713E',
    orange: '#F28354',
    accentPressed: '#FF6A2A',
    danger: '#E83131',
    dangerLight: '#F1DADA',
    dangerHover: '#D22626',
    success: '#009F77',
    successLight: '#DBF1D9',
  },
};
