import React from 'react';
import TemplateGrid from '../components/TemplateGrid';
import useLoadData from '../hooks/useLoadData';

export const Home = () => {
  const { data: templates, loading } = useLoadData();

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading templates...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Templates</h1>
      <TemplateGrid templates={templates} />
    </div>
  );
};

export default Home;