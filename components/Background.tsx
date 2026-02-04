
import React from 'react';

interface BackgroundProps {
  onboardingStep: number;
}

const Background: React.FC<BackgroundProps> = ({ onboardingStep }) => {
  return (
    <>
      <div className="fixed inset-0 z-0 bg-slate-950 pointer-events-none overflow-hidden transition-all duration-1000">
        
        {/* Base Texture - Deep Current Overlay */}
        <div 
            className="absolute inset-[-50%] z-0 opacity-20 mix-blend-overlay"
            style={{
                background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(30, 58, 138, 0.2) 120deg, transparent 240deg)'
            }}
        />
        
        {/* Subtle Central Vignette to keep focus in center */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-950/40 pointer-events-none" />

      </div>
    </>
  );
};

export default Background;
