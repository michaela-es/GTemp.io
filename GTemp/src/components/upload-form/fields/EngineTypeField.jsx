import React, { useState, useEffect } from 'react';

export const EngineTypeField = ({ value, onChange }) => {
  const [filters, setFilters] = useState({ engines: [], types: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const response = await fetch('/connfig/filterConfig.json');
        const config = await response.json();
        setFilters(config);
      } catch (error) {
        console.error('Failed to load filter config:', error);
        // Fallback defaults based on your data.json
        setFilters({
          engines: ['Unity', 'Unreal', 'Godot'],
          types: ['sprite', 'code', 'model', 'sound', 'ui']
        });
      } finally {
        setLoading(false);
      }
    };
    loadFilters();
  }, []);

  if (loading) {
    return (
      <div className="form-field">
        <label>Engine & Type *</label>
        <div className="loading-text">Loading engine types...</div>
      </div>
    );
  }

  return (
    <div className="form-field">
      <label>Engine & Type *</label>
      <div className="engine-type-fields">
        <select 
          value={value.engine} 
          onChange={(e) => onChange({ ...value, engine: e.target.value })}
          required
          className="form-select"
        >
          <option value="">Select Engine</option>
          {filters.engines?.map(engine => (
            <option key={engine} value={engine}>{engine}</option>
          ))}
        </select>
        
        <select 
          value={value.type} 
          onChange={(e) => onChange({ ...value, type: e.target.value })}
          required
          className="form-select"
        >
          <option value="">Select Type</option>
          {filters.types?.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
};