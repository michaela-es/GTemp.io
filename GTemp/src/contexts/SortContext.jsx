import { createContext, useState, useContext } from 'react';

const SortContext = createContext();

export const SortProvider = ({ children }) => {
  const [activeSorts, setActiveSorts] = useState([]);

  return (
    <SortContext.Provider value={{ activeSorts, setActiveSorts }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSort = () => useContext(SortContext);
