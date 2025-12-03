import React from 'react';
import '../styles/TemplateDetail.css';

const HeadingText = ({ text, className = '' }) => {
  return (
    <h1 className={`heading-text ${className}`}>
      {text}
    </h1>
  );
};

export default HeadingText;