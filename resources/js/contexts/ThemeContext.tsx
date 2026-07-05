import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  isNightMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isNightMode, setIsNightMode] = useState(false);

  // Apply a class to the body for global overrides if needed,
  // but we can also just use the context down the tree.
  useEffect(() => {
    if (isNightMode) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }
  }, [isNightMode]);

  const toggleTheme = () => {
    // Add CRT switch effect
    document.body.classList.add('crt-switch');
    setTimeout(() => {
      document.body.classList.remove('crt-switch');
    }, 600); // Animation duration
    
    setIsNightMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isNightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
