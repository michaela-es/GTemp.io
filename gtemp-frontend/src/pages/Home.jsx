import React from 'react';
import TemplateGrid from '../components/Templates/TemplateGrid';
import useLoadData from '../hooks/useLoadData_back';
import FirstContainer from '../components/display/Header';
import { useAuth } from '../context/AuthContext';
export const Home = () => {
  const { data: templates, loading } = useLoadData();

    const currentUser = useAuth();
    const isLoggedIn = currentUser;


  if (loading) {
    return (
        
      <div style={{ padding: '20px', textAlign: 'center' }}>
        
        <h2>Loading templates...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
    <FirstContainer/>
      <TemplateGrid templates={templates} />
    </div>
  );
};

export default Home;