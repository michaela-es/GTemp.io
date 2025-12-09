import { useState, useEffect } from 'react';

const useLoadData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      console.log('useLoadData: Starting data fetch...');
      setLoading(true);
      
      try {
        console.log('useLoadData: Making GET request to http://localhost:8080/api/templates/homepage');
        const response = await fetch('http://localhost:8080/api/templates/homepage');
        
        console.log('useLoadData: Received response:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const templates = await response.json();

        const fixedTemplates = templates.map(template => ({
        ...template,
        coverImagePath: template.coverImagePath ? 
            `http://localhost:8080/${template.coverImagePath.replace(/\\/g, '/')}` : 
            null
        }));

        console.log('useLoadData: Successfully parsed JSON response');
        console.log('useLoadData: Number of templates received:', templates.length);
        
        console.log('useLoadData: Fixed templates:', fixedTemplates);
        setData(fixedTemplates);

      } catch (error) {
        console.error('useLoadData: Error loading data:', error);
        console.error('useLoadData: Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      } finally {
        console.log('useLoadData: Setting loading to false');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  console.log('useLoadData: Return state:', {
    dataLength: data.length,
    loading: loading
  });

  return { data, loading };
};

export default useLoadData;