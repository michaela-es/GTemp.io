import React, { createContext, useState, useEffect, useContext } from 'react';
import useLoadData from '../hooks/useLoadData';
const TemplatesContext = createContext();

  export const TemplatesProvider = ({ children }) => {
  const { data: templates, loading } = useLoadData();

  return (
    <TemplatesContext.Provider value={{ templates, loading }}>
      {children}
    </TemplatesContext.Provider>
  );
};

export const useTemplates = () => {
  return useContext(TemplatesContext);
};
