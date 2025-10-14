import React from 'react';
import '../styles/TemplateDetail.css';

const DescBox = ({ text, className = '' }) => {
  return (
    <p className='desc-box'>
      {text}
    </p>
  );
};

export default DescBox;