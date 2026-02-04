
import React from 'react';
import { usePerformance } from '../contexts/PerformanceContext';

const GlobalFilters: React.FC = () => {
  const { settings } = usePerformance();

  // If distortion is disabled, we render "noop" filters or simplified versions
  // to prevent crashes in components referencing them, but effectively doing nothing.
  
  return (
    <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <defs>
        {/* Ink Flow: The primary organic distortion */}
        <filter id="ink-flow" x="-50%" y="-50%" width="200%" height="200%">
          {settings.distortion ? (
             <>
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves={settings.octaves} result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" />
             </>
          ) : (
             // Pass-through if disabled
             <feIdentity in="SourceGraphic" />
          )}
        </filter>
        
        {/* Watercolor Edge: Rougher edges */}
        <filter id="watercolor-edge" x="-50%" y="-50%" width="200%" height="200%">
          {settings.distortion ? (
              <>
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={settings.octaves} result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" result="distorted" />
                <feGaussianBlur in="distorted" stdDeviation="2" result="blurred" />
                <feComposite operator="in" in="distorted" in2="blurred" result="final" />
              </>
          ) : (
              <feIdentity in="SourceGraphic" />
          )}
        </filter>

        {/* Global Blur Filters (Used for Domain Shapes) */}
        <filter id="domain-blur">
             <feGaussianBlur stdDeviation={settings.glow > 1 ? 12 : 4} />
        </filter>

      </defs>
    </svg>
  );
};

export default GlobalFilters;
