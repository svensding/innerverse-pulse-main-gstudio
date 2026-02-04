
import React from 'react';

interface WatercolorNodeProps {
  id: string; 
  size: number;
  color: string;
  roughness: number; // EGO: -100 (Cloud) -> 0 (Organic Circle) -> 100 (Square)
  spread: number;    // SOUL: -100 (Clear) -> 0 (Dye) -> 100 (Storm)
  opacity: number;   // SPIRIT: -100 (Black Hole) -> 0 (Aura) -> 100 (Blinding)
  isDefined: boolean;
  isAwakening?: boolean;
  isSelected: boolean;
  isHovered?: boolean;
  renderVisuals?: boolean; 
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const mapValueToRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
  const mapped = ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  return Math.max(outMin, Math.min(outMax, mapped));
};

const WatercolorNode: React.FC<WatercolorNodeProps> = ({ 
  size, 
  color,
  roughness, // Ego (Form)
  spread,    // Soul (Essence)
  opacity,   // Spirit (Resonance)
  isDefined,
  renderVisuals = true,
  onMouseEnter,
  onMouseLeave
}) => {
  
  // --- LENS 1: FORM (EGO) - SHAPE VIA CSS BORDER RADIUS ---
  // Performance Note: changing border-radius is much cheaper than SVG filters
  let borderRadius = '50%';
  
  if (roughness < -30) {
      // Amorphous / Blobby (Negative Ego)
      // Creates an organic, non-uniform shape
      borderRadius = '40% 60% 70% 30% / 40% 50% 60% 50%';
  } else if (roughness > 30) {
      // Rigid / Square (Positive Ego)
      const r = mapValueToRange(roughness, 30, 100, 40, 2); 
      borderRadius = `${r}px`;
  } else {
      // Balanced: Slightly Organic Circle
      borderRadius = '50% 45% 55% 50% / 50% 55% 45% 50%';
  }

  // --- LENS 2: ESSENCE (SOUL) - FILL & MOVEMENT ---
  // Opacity: -100 (0.1) -> 0 (0.8) -> 100 (0.95)
  let textureOpacity = 0.8;
  if (spread < 0) textureOpacity = mapValueToRange(spread, -100, 0, 0.2, 0.8);
  else textureOpacity = mapValueToRange(spread, 0, 100, 0.8, 0.95);

  // Animation Speed: -100 (Slow) -> 100 (Fast)
  const animDurationSec = mapValueToRange(spread, -100, 100, 8, 1.5);
  
  // Gradient Logic
  let stop1Color = color;
  let stop1Pos = '30%';
  
  if (spread < -20) {
      // Hollow / Fading Center
      const fade = mapValueToRange(spread, -100, -20, 0, 1);
      stop1Color = `rgba(255,255,255,${0.1 + fade * 0.9})`; 
      if (spread < -50) stop1Color = 'rgba(255,255,255,0.05)';
      stop1Pos = '0%';
  } else {
      stop1Pos = `${mapValueToRange(spread, -20, 100, 30, 0)}%`;
  }

  const backgroundStyle = `radial-gradient(circle at 40% 40%, ${stop1Color} ${stop1Pos}, ${color} 100%)`;

  // --- LENS 3: RESONANCE (SPIRIT) - GLOW & BLUR ---
  // We use standard CSS blur instead of SVG displacement maps
  const spiritVal = (opacity - 0.6) / 0.4 * 200 - 100; 
  
  let boxShadow = `0 0 15px ${color}`; 
  let cssFilter = 'none';
  let scale = 1;

  if (spiritVal < -30) {
      // LACK: Inwards Isolation (Hard Shell)
      const strength = mapValueToRange(spiritVal, -30, -100, 2, 8);
      boxShadow = `inset 0 0 10px ${strength}px rgba(0,0,0,0.5)`; 
      scale = 0.9;
  } else if (spiritVal > 30) {
      // EXCESS: Dissolving / Radiant (Wide Glow + Blur)
      const glowSize = mapValueToRange(spiritVal, 30, 100, 20, 50);
      const blurSize = mapValueToRange(spiritVal, 30, 100, 0, 6); // Subtle CSS Blur
      boxShadow = `0 0 ${glowSize}px ${color}, 0 0 ${glowSize*0.5}px white`;
      
      if (blurSize > 0) {
          cssFilter = `blur(${blurSize}px)`;
      }
      // Reduce core opacity to let glow dominate
      textureOpacity *= 0.8;
  }

  const visualBlob = isDefined ? (
    <div className="relative flex items-center justify-center w-full h-full" style={{ transform: `scale(${scale})`, transition: 'transform 0.5s ease-out' }}>
        {/* The Core Ink Blob */}
        <div 
            style={{ 
                position: 'absolute',
                inset: 0,
                borderRadius: borderRadius, 
                background: backgroundStyle,
                opacity: textureOpacity,
                filter: cssFilter,
                boxShadow: boxShadow,
                transition: 'all 0.5s ease-in-out',
                animation: `bio-pulse ${animDurationSec}s ease-in-out infinite`
            }}
            className="pointer-events-none"
        />
        
        {/* Shine / Reflection Overlay */}
        <div 
             style={{ 
                position: 'absolute',
                inset: 0,
                borderRadius: borderRadius,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
                mixBlendMode: 'overlay',
                opacity: 0.6,
                pointerEvents: 'none',
                transition: 'border-radius 0.5s ease-in-out'
            }}
        />
    </div>
  ) : (
     // Undefined State
     <div 
        style={{ 
            width: '80%', 
            height: '80%',
            borderRadius: '50% 55% 45% 50% / 55% 50% 50% 45%',
            border: `1px solid ${color}`,
            background: 'rgba(255,255,255,0.02)',
            boxShadow: `0 0 5px ${color}`,
            opacity: 0.5
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 animate-pulse"
    />
  );

  if (renderVisuals && !onMouseEnter) {
      return (
        <div data-name="node-visual-container" className="relative" style={{ width: size, height: size }}>
            {visualBlob}
        </div>
      );
  }

  return (
    <div data-name="node-interaction-wrapper" className="relative flex items-center justify-center">
        <div style={{ width: size, height: size }} className="relative pointer-events-none">
            {renderVisuals && visualBlob}
        </div>
        {/* Interaction Hit Area */}
        <div 
            style={{ width: size, height: size }}
            className="absolute inset-0 rounded-full cursor-pointer pointer-events-auto bg-transparent z-10"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    </div>
  );
};

export default WatercolorNode;
