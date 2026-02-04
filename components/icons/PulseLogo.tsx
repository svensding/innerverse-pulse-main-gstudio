
import React from 'react';

const PulseLogo: React.FC<{ label?: string }> = ({ label = "Pulse" }) => (
  <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Text "Pulse" - Elegant Typography */}
    <text x="36" y="22" fontFamily="'Atkinson Hyperlegible Next', sans-serif" fontSize="20" fontWeight="200" fill="rgba(255,255,255,0.9)" textAnchor="start" letterSpacing="0.15em">
      {label}
    </text>
    
    {/* Organic Ripple Icon - Optimized: Removed ink-flow filter */}
    <g transform="translate(16, 16)">
      {/* Outer Ripple */}
      <path 
        d="M0 -10 C 5 -10, 10 -5, 10 0 C 10 5, 5 10, 0 10 C -5 10, -10 5, -10 0 C -10 -5, -5 -10, 0 -10 Z"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
        fill="none"
        className="pulse-logo-outer"
      />
      
      {/* Inner Ripple */}
      <path 
        d="M0 -5 C 3 -5, 5 -3, 5 0 C 5 3, 3 5, 0 5 C -3 5, -5 3, -5 0 C -5 -3, -3 -5, 0 -5 Z"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
        fill="none"
        className="pulse-logo-inner"
      />
      
      {/* Core */}
      <circle cx="0" cy="0" r="2" fill="rgba(255,255,255,0.9)" />
    </g>
  </svg>
);

export default PulseLogo;
