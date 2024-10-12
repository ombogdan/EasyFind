import React, { createContext, useContext, useMemo, useState } from "react";
import { defaultTheme } from "./theme";

export const ThemeContext = createContext({
  theme: defaultTheme,
});

export const useTheme = () => useContext(ThemeContext);

export type TThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: TThemeProviderProps) => {
  const [theme] = useState(defaultTheme);
  const memoizedValue = useMemo(() => ({
      theme,
      //   isLoadingTheme,
      //   updateTheme,
    }), [
    theme,

    // updateTheme
  ]);

  return (
    <ThemeContext.Provider value={memoizedValue}>
      {children}
    </ThemeContext.Provider>
  );
};
