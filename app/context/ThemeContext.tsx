"use client"

import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from 'react';
import {setThemeCookie, clearThemeCookie} from "@/app/actions/cookies";

export const ThemeContext = createContext({
  theme: '',
  setTheme: (theme: 'dark' | 'light', rememberSelection: boolean = true) => {},
});

export function ThemeContextProvider({theme, children}: PropsWithChildren<{theme: string | undefined}>) {
  const [isDarkTheme, setIsDarkTheme] = useState(theme === 'dark');
  const darkTheme = 'dark-theme';

  const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";

  const setTheme = useCallback((theme: 'dark' | 'light', rememberSelection: boolean = true) => {
    setIsDarkTheme(theme === 'dark');
    document.body.classList[theme === "dark" ? "add" : "remove"](darkTheme);
    if (rememberSelection) {
      localStorage.setItem("selected-theme", theme);
      setThemeCookie(theme);
    } else {
      localStorage.removeItem("selected-theme");
      clearThemeCookie();
    }
    console.log(`Toggle theme from ${getCurrentTheme()} to ${theme} and remember`);
  }, [])

  useEffect(() => {
    const selectedTheme = localStorage.getItem("selected-theme");

    // Use prefers-color-scheme if stored theme is not available
    if (!selectedTheme) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        console.log(`Switch to ${newColorScheme} theme`);
        setTheme(newColorScheme);
      });

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Prefer to dark theme');
        setTheme('dark');
      }

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        console.log('Prefer to light theme');
        setTheme('light');
      }
    } else {
      if (isDarkTheme && selectedTheme == 'light') {
        console.log('Switch to light from dark')
        setTheme(selectedTheme as 'dark' | 'light');
      }
    }
  }, [isDarkTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme: isDarkTheme ? 'dark' : 'light', setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme was used outside of its Provider');
  }

  return context;
};
