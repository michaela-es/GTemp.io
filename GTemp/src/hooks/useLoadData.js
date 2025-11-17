import { useState, useEffect } from 'react';

const useLoadData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data.json');
        const templates = await response.json();
        setData(templates);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { data, loading };
};

export default useLoadData;
