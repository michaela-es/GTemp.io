import React from 'react';
import './GooeySpinner.css'; 

// source - https://codepen.io/kazmi066/pen/vELoNXr
const GooeySpinner = () => {
  return (
    <div className="gooey-container">
      <svg viewBox="0 0 200 200">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10" result="goo"/>
            <feBlend in="SourceGraphic" in2="goo"/>
          </filter>
        </defs>
        <g filter="url(#goo)">
          <circle className="dot" style={{"--tx": "0px", "--ty": "-25px"}} cx="100" cy="100" r="6"/>
          <circle className="dot" style={{"--tx": "25px", "--ty": "0px"}} cx="100" cy="100" r="6"/>
          <circle className="dot" style={{"--tx": "0px", "--ty": "25px"}} cx="100" cy="100" r="6"/>
          <circle className="dot" style={{"--tx": "-25px", "--ty": "0px"}} cx="100" cy="100" r="6"/>
          <circle className="dot" style={{"--tx": "-18px", "--ty": "-18px"}} cx="100" cy="100" r="6"/>
          <circle className="dot" style={{"--tx": "18px", "--ty": "-18px"}} cx="100" cy="100" r="6"/>
          <circle className="dot" style={{"--tx": "-18px", "--ty": "18px"}} cx="100" cy="100" r="6"/>
          <circle className="dot" style={{"--tx": "18px", "--ty": "18px"}} cx="100" cy="100" r="6"/>
        </g>
      </svg>
    </div>
  );
};

export default GooeySpinner;
