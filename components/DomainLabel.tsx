
import React from 'react';
import { Domain } from '../types';

interface DomainLabelProps {
  domain: Domain;
  isVisible: boolean;
  isActive: boolean; // Is this quadrant active/zoomed?
  currentScale: number;
}

const DomainLabel: React.FC<DomainLabelProps> = ({ domain, isVisible, isActive, currentScale }) => {
  const domainName = domain.name;
  const domainInkColor = domain.inkColor;
  const domainDesc = domain.description;
  
  const getLabelPositionStyle = (dId: string): React.CSSProperties => {
      switch(dId) {
          case 'd1': return { bottom: '20%', right: '20%' };
          case 'd3': return { bottom: '20%', left: '20%' };
          case 'd2': return { top: '20%', right: '20%' };
          case 'd4': return { top: '20%', left: '20%' };
          default: return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      }
  };
  const labelStyle = getLabelPositionStyle(domain.id);

  return (
    <div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
    >
        <div 
            className="absolute flex items-center justify-center pointer-events-none"
            style={{ 
                ...labelStyle,
                opacity: isVisible && !isActive ? 1 : 0, 
                transition: 'opacity 0.5s ease-in-out',
            }}
        >
            <div 
                className={`pointer-events-auto cursor-help group relative flex flex-col items-center transition-opacity duration-500 opacity-100`}
                style={{ transform: `scale(${1 / Math.max(0.5, currentScale)})` }} 
            >
                <h3 
                    className="text-sm font-light tracking-[0.3em] text-white/80 uppercase lowercase mix-blend-plus-lighter transition-colors group-hover:text-white whitespace-normal text-center w-24 leading-relaxed"
                    style={{ textShadow: `0 0 20px ${domainInkColor}` }}
                >
                    {domainName}
                </h3>
                
                <div className="absolute top-full mt-6 w-64 p-5 rounded-xl bg-black/60 border border-white/10 shadow-2xl transition-all duration-500 text-center z-50 pointer-events-none opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                    <p className="text-sm leading-relaxed text-slate-200 font-light">{domainDesc}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DomainLabel;
