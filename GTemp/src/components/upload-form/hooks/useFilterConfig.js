// hooks/useFilterConfig.js
import { useState, useEffect } from 'react';

export const useFilterConfig = () => {
  const [filters, setFilters] = useState({ engines: [], types: [], categories: [], genres: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const response = await fetch('/filterConfig.json');
        const config = await response.json();
        setFilters(config);
      } catch (error) {
        console.error('Failed to load filter config:', error);
        // Fallback defaults
        setFilters({
          engines: ['Unity', 'Unreal', 'Godot'],
          types: ['sprite', 'code', 'model', 'sound', 'ui'],
          categories: ['Environment', 'Character', 'UI', 'Audio', 'System'],
          genres: ['Educational', 'Sci-Fi', 'Fantasy', 'Action', 'RPG']
        });
      } finally {
        setLoading(false);
      }
    };

    loadFilters();
  }, []);

  return { filters, loading };
};