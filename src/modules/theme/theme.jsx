import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import lightTheme from './lightTheme'; // Adjust the path as necessary
import darkTheme from './darkTheme'; // Adjust the path as necessary

const ThemeContext = createContext({
  toggleTheme: () => {},
  currentTheme: 'light'
});

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('light');
  const theme = useMemo(() => {
    return themeName === 'dark' ? darkTheme : lightTheme;
  }, [themeName]);

  const toggleTheme = () => {
    setThemeName((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, currentTheme: themeName }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
