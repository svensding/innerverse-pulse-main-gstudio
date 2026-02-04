
import React, { useMemo, useState } from 'react';
import { Node } from '../types';
import { adjustInkColor } from '../utils/colors';
import WatercolorNode from './WatercolorNode';
import { DOMAINS_DATA } from '../constants';
import { getOrganicStyle } from '../utils/style';

interface StarProps {
  star: Node;
  index: number;
  isSelected: boolean;
  isDefined: boolean;
  onSelect: () => void;
  isQuadrantActive: boolean;
  isAwakening: boolean;
  delay: number;
  domainColor: string;
  onboardingStep?: number; // Add prop to check for reveal step
}

const mapValueToRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
  const mapped = ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  return Math.max(outMin, Math.min(outMax, mapped));
};

const Star: React.FC<StarProps> = ({ star, index, isSelected, isDefined, onSelect, isQuadrantActive, isAwakening, delay, onboardingStep }) => {
  const [isHovered, setIsHovered] = useState(false);

  let avgValue = 0;
  const definedAttributes = star.attributes.filter(a => a.value !== null);
  if (definedAttributes.length > 0) {
    avgValue = definedAttributes.reduce((acc, a) => acc + a.value!, 0) / definedAttributes.length;
  }

  // --- Visual Logic ---
  const domainId = star.id.split('-')[0];
  const domainConfig = DOMAINS_DATA.find(d => d.id === domainId);
  const baseInkColor = domainConfig?.inkColor || '#94a3b8';

  // Use deterministic style based on ID, not index, to ensure consistency with Detail View
  const organicStyle = useMemo(() => getOrganicStyle(star.id), [star.id]);

  const displayColor = isDefined ? adjustInkColor(baseInkColor, avgValue) : '#94a3b8';
  
  const egoAttr = star.attributes.find(a => a.name === 'Ego')?.value ?? 0;
  const soulAttr = star.attributes.find(a => a.name === 'Soul')?.value ?? 0;
  const spiritAttr = star.attributes.find(a => a.name === 'Spirit')?.value ?? 0;

  const size = mapValueToRange(Math.abs(egoAttr), 0, 100, 80, 110); 
  const opacity = mapValueToRange(spiritAttr, -100, 100, 0.6, 1.0);

  // FORCE REVEAL during onboarding steps 23 & 24 (Expressions Reveal)
  const isForcedVisible = onboardingStep === 23 || onboardingStep === 24;

  // Calculate current total scale applied to container to counter-scale text
  // If forced visible, we treat it as active scale
  const currentScale = (isQuadrantActive || isForcedVisible) ? organicStyle.scaleVar : organicStyle.scaleVar * 0.75;

  // Interactivity Rule: Undefined stars are only interactive/visible when zoom level is active OR during force reveal
  const isInteractable = isDefined || isQuadrantActive || isForcedVisible;
  
  const finalOpacity = isInteractable ? ((isQuadrantActive || isForcedVisible) ? 1 : 0.7) : 0.1;
  const pointerEvents = isInteractable ? 'auto' : 'none';

  const containerStyle: React.CSSProperties = {
    left: `${star.position.x}%`,
    top: `${star.position.y}%`,
    transition: `opacity 0.8s ${delay}ms, transform 0.8s ${delay}ms`,
    opacity: finalOpacity,
    transform: `translate(-50%, -50%) scale(${currentScale})`,
    zIndex: isSelected || isHovered ? 20 : 10,
    pointerEvents: pointerEvents as any
  };

  return (
    <div
      className={`absolute origin-center group`}
      style={containerStyle}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className="relative flex items-center justify-center outline-none"
        aria-label={`Select expression ${star.name}`}
        disabled={!isInteractable}
        style={{ 
            filter: `hue-rotate(${organicStyle.hueShift}deg)`,
            // Apply rotation ONLY to the artwork
            transform: `rotate(${organicStyle.rotation}deg)`,
            pointerEvents: pointerEvents as any
        }}
      >
         {/* Map nodes now render visuals via CSS, replacing the p5 layer */}
         <WatercolorNode 
            id={star.id}
            color={displayColor}
            size={size}
            roughness={egoAttr}
            spread={soulAttr}
            opacity={opacity}
            isDefined={isDefined}
            isAwakening={isAwakening}
            isSelected={isSelected}
            isHovered={isHovered}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            renderVisuals={true} 
         />
      </button>

      {/* 
        Label - Centered inside the star 
        Counter-scaled to ensure consistent text size across all nodes
      */}
      <div
        className={`absolute top-1/2 left-1/2 flex flex-col items-center justify-center gap-0 text-xs whitespace-nowrap transition-all duration-500 pointer-events-none ${(isQuadrantActive || isForcedVisible) ? (isDefined || isForcedVisible ? 'opacity-100' : 'opacity-60') : 'opacity-0'}`}
        style={{ 
            transitionDelay: `${delay + 100}ms`,
            transform: `translate(-50%, -50%) scale(${1 / currentScale})`
        }}
      >
        {star.name.split(' ').map((word, i) => (
            <span 
                key={i} 
                className={`
                    text-[9px] font-semibold leading-none tracking-wider
                    ${isSelected ? 'text-white drop-shadow-md' : 'text-white/90 mix-blend-hard-light'}
                `}
            >
                {word}
            </span>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Star);
