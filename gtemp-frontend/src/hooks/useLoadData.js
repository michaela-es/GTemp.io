import { useState, useEffect } from 'react';

const useLoadData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      console.log('useLoadData: Starting data fetch...');
      setLoading(true);
      
      try {
        console.log('useLoadData: Fetching from /data.json');
        const response = await fetch('/data.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const templates = await response.json();

        const fixedTemplates = templates.map(template => ({
          ...template,
          coverImagePath: template.coverImagePath 
            ? template.coverImagePath.replace(/\\/g, '/')
            : null
        }));

        console.log('useLoadData: Successfully loaded mock templates', fixedTemplates);
        setData(fixedTemplates);

      } catch (error) {
        console.error('useLoadData: Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading };
};

export default useLoadData;
