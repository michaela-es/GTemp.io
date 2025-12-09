import React from 'react';

const BackgroundWrapper = ({ imageUrl, children }) => {
  const wrapperStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundRepeat: 'repeat',
    backgroundSize: '300px',
    backgroundPosition: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(39, 39, 39, 0.5)',
    zIndex: 0,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
  };

  return (
    <>
      <div style={wrapperStyle}></div>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>{children}</div>
    </>
  );
};

export default BackgroundWrapper;
