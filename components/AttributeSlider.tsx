
import React from 'react';
import { Attribute, AttributeDefinition } from '../types';
import { getAttributeColor } from '../utils/colors';

interface AttributeSliderProps {
  attribute: Attribute;
  starName: string;
  prompt: string;
  onChange: (value: number) => void;
  readOnly?: boolean;
  attributeDefinitions?: Record<string, AttributeDefinition>;
  sliderLabels?: {
      lacking: string;
      low: string;
      balanced: string;
      high: string;
      excess: string;
  };
}

const SPECTRUM_VALUES = [-80, -40, 0, 40, 80];

const getSpectrumIndex = (value: number | null): number => {
    if (value === null) return 2; // Default to balanced for initial view
    if (value < -60) return 0;
    if (value < -20) return 1;
    if (value <= 20) return 2;
    if (value <= 60) return 3;
    return 4;
};

const getDynamicLabel = (value: number | null, labels?: AttributeSliderProps['sliderLabels']): string | null => {
    if (!labels) return null;
    if (value === null) return labels.balanced; // Default hint
    
    if (value < -60) return labels.lacking;
    if (value < -20) return labels.low;
    if (value <= 20) return labels.balanced;
    if (value <= 60) return labels.high;
    return labels.excess;
}

const AttributeSlider: React.FC<AttributeSliderProps> = ({ attribute, starName, prompt, onChange, readOnly, attributeDefinitions, sliderLabels }) => {
  const definition = attributeDefinitions ? attributeDefinitions[starName] : undefined;
  
  const lensKey = attribute.name.toLowerCase() as 'ego' | 'soul' | 'spirit';
  const spectrum = definition?.spectrum[lensKey] || ['','','','',''];
  
  const isUndefined = attribute.value === null;
  const sliderValue = isUndefined ? 0 : attribute.value;
  const currentIndex = getSpectrumIndex(sliderValue);
  const thumbColor = getAttributeColor(sliderValue);

  // Define CSS variables for the thumb based on state
  const thumbStyle = isUndefined ? {
      '--thumb-bg': 'rgba(0, 0, 0, 0.4)',
      '--thumb-border': '1px solid rgba(255, 255, 255, 0.3)',
      '--thumb-shadow': 'none'
  } : {
      '--thumb-bg': thumbColor,
      '--thumb-border': '2px solid #fff',
      '--thumb-shadow': '0 0 8px rgba(255,255,255,0.6)'
  };

  const textColors = [
    'text-indigo-500',
    'text-indigo-500/70',
    'text-amber-400',
    'text-red-500/70',
    'text-red-500',
  ]

  const handleLabelClick = (index: number) => {
    if (!readOnly) {
        onChange(SPECTRUM_VALUES[index]);
    }
  };
  
  const dynamicLabel = getDynamicLabel(sliderValue, sliderLabels);

  return (
    <div className={readOnly ? "opacity-70 pointer-events-none" : ""}>
      <div className="mb-3 text-sm text-gray-300 italic leading-relaxed">
        {prompt}
      </div>
      
      <div className="relative w-full h-8 flex items-center">
          {/* Visual Track Background with Zones */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-1.5 rounded-full overflow-hidden bg-white/5 flex pointer-events-none">
             {/* 5 Distinct Zones */}
             <div className="w-[20%] h-full border-r border-white/10 bg-indigo-900/30"></div>
             <div className="w-[20%] h-full border-r border-white/10 bg-indigo-500/10"></div>
             <div className="w-[20%] h-full border-r border-white/10 bg-amber-500/10"></div>
             <div className="w-[20%] h-full border-r border-white/10 bg-red-500/10"></div>
             <div className="w-[20%] h-full bg-red-900/30"></div>
          </div>
          
          {/* Ticks - Made more visible */}
          <div className="absolute top-1/2 left-[20%] w-px h-3 -translate-y-1/2 bg-white/40 pointer-events-none"></div>
          <div className="absolute top-1/2 left-[40%] w-px h-3 -translate-y-1/2 bg-white/40 pointer-events-none"></div>
          
          {/* Center Dot (Replaces Tick) - Increased Z-index to sit above track but below thumb */}
          <div className="absolute top-1/2 left-[50%] w-1.5 h-1.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-amber-500/80 pointer-events-none z-[5]"></div> 
          
          <div className="absolute top-1/2 left-[60%] w-px h-3 -translate-y-1/2 bg-white/40 pointer-events-none"></div>
          <div className="absolute top-1/2 left-[80%] w-px h-3 -translate-y-1/2 bg-white/40 pointer-events-none"></div>
          
          {/* Dynamic Label above slider thumb area */}
          {dynamicLabel && (
               <div className="absolute top-[-14px] w-full text-center pointer-events-none">
                   <span className="text-[10px] text-amber-400/90 font-thin lowercase tracking-widest whitespace-nowrap animate-fade-in">
                       {dynamicLabel}
                   </span>
               </div>
          )}

          <input
            type="range"
            min="-100"
            max="100"
            value={sliderValue}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            className="w-full h-8 bg-transparent appearance-none cursor-pointer range-slider disabled:opacity-50 relative z-10"
            aria-label={`${attribute.name} lens for ${starName}`}
            disabled={readOnly}
            style={thumbStyle as React.CSSProperties}
          />
      </div>

      <div className="flex justify-between mt-2">
        {spectrum.map((quality, index) => (
          <button
            key={index}
            onClick={() => handleLabelClick(index)}
            disabled={readOnly}
            /* 
               Updated Styling for Text Wrapping:
               - w-1/5: Enforce 20% width bucket
               - flex items-start justify-center: Center alignment, start top
               - break-words: Allow long words to wrap
               - leading-tight: Tighter line height for wrapped text
               - min-h-[24px]: Reserve vertical space
            */
            className={`
                w-1/5 px-0.5 py-1 
                flex items-start justify-center
                text-[10px] leading-[1.1] break-words whitespace-normal text-center
                transition-all duration-300 rounded-md
                focus:outline-none focus:ring-2 focus:ring-cyan-400/50 
                ${currentIndex === index ? `font-bold text-xs ${textColors[index]}` : 'opacity-60 hover:opacity-100 text-gray-400'} 
                ${readOnly ? 'cursor-default' : ''}
            `}
          >
            {quality}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AttributeSlider;
