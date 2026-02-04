
import React from 'react';

interface InsightReadyIndicatorProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const InsightReadyIndicator: React.FC<InsightReadyIndicatorProps> = ({ onClick }) => {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center">
        {/* Pulsing glow */}
        <div className="absolute w-24 h-24 bg-amber-300/30 rounded-full animate-pulse blur-lg"></div>
        
        <button 
          className="relative px-5 py-2.5 bg-black/30 border border-amber-300/50 rounded-full text-amber-200 text-xs tracking-widest backdrop-blur-sm hover:bg-amber-300/20 hover:border-amber-300/80 transition-all duration-300"
        >
          Reveal story
        </button>
      </div>
    </div>
  );
};

export default InsightReadyIndicator;
