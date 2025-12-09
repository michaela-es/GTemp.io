import React, { createContext, useContext, useState, useEffect } from "react";

const TemplatesContext = createContext();
export const useTemplates = () => useContext(TemplatesContext);

export const TemplatesProvider = ({ children }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/templates/homepage");
      if (!res.ok) throw new Error("Failed to fetch templates");
      const data = await res.json();
      setTemplates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TemplatesContext.Provider value={{ templates, loading }}>
      {children}
    </TemplatesContext.Provider>
  );
};
export default TemplatesContext;
