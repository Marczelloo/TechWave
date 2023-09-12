import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PopupContextType {
  content: string;
  isVisible: boolean;
  showPopup: (content: string) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

interface PopupProviderProps {
  children: ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState('');

  const showPopup = (popupContent: string) => {
    setContent(popupContent);
    setIsVisible(true);

    setTimeout(() => {
        setIsVisible(false);
      }, 4000)
  };

  return (
    <PopupContext.Provider value={{ content, isVisible, showPopup}}>
      {children}
    </PopupContext.Provider>
  );
};