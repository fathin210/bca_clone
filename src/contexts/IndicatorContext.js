import { createContext, useState, useContext } from 'react';

const IndicatorContext = createContext();

export const IndicatorProvider = ({ children }) => {
  const getRandomColor = () => (Math.random() < 0.5 ? 'red' : '#1D64E1');
  const [color, setColor] = useState(getRandomColor);

  const changeToGreen = () => {
    if (color === 'red' || color === '#1D64E1') {
      setColor('#95D629');
    }
  };

  const value = { color, setColor, changeToGreen };

  return (
    <IndicatorContext.Provider value={value}>
      {children}
    </IndicatorContext.Provider>
  );
};

export const useIndicator = () => useContext(IndicatorContext);
