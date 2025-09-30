/**
 * 네비게이션 컨텍스트
 * 페이지 간 네비게이션을 위한 전역 상태 관리
 */
import React, { createContext, useContext, useState, useCallback } from 'react';

interface NavigationContextType {
  currentPath: string;
  navigate: (path: string) => void;
  goBack: () => void;
  history: string[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: React.ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('/splash');
  const [history, setHistory] = useState<string[]>(['/splash']);

  const navigate = useCallback((path: string) => {
    setCurrentPath(path);
    setHistory(prev => [...prev, path]);
  }, []);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousPath = newHistory[newHistory.length - 1];
      setCurrentPath(previousPath);
      setHistory(newHistory);
    }
  }, [history]);

  const value: NavigationContextType = {
    currentPath,
    navigate,
    goBack,
    history,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export default NavigationContext;
