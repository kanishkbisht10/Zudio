import React from 'react';

const Logo = ({ width = "120", color = "black" }) => (
  <svg width={width} viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <text x="0" y="40" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="48" fill={color} letterSpacing="4">
      ZUDIO
    </text>
  </svg>
);

export default Logo;
