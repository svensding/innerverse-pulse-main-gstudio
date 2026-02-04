

import React, { useState, useRef, useEffect } from 'react';
import { Domain, Node } from '../types';
import Constellation from './Constellation';

interface QuadrantProps {
  quadrant: Domain;
  isActive: boolean;
  isDimmed: boolean;
  selectedStar: Node | null;
  isComplete: boolean;
  onboardingStep: number;
  awakenedStarId: string | null;
  onSelect: () => void;
  onDeselect: () => void;
  onSelectStar: (node: Node) => void;
  currentScale: number;
}

const Quadrant: React.FC<QuadrantProps> = ({ quadrant, isActive, isDimmed, selectedStar, isComplete, onboardingStep, awakenedStarId, onSelect, onDeselect, onSelectStar, currentScale }) => {
  const quadrantRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Disable parallax on mobile for performance
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!quadrantRef.current || !isActive) return;
      const rect = quadrantRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setParallax({ x: -x * 20, y: -y * 20 });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  return (
    <div
      ref={quadrantRef}
      className={`relative w-full h-full transition-all duration-1000 ease-in-out ${isDimmed ? 'opacity-20 blur-sm grayscale' : 'opacity-100'} overflow-visible pointer-events-none`}
      // Note: Click handling moved to DomainShape in SkyMap.tsx
    >
      <div 
        className="absolute inset-0 z-10 flex items-center justify-center p-4 transition-transform duration-500 ease-out pointer-events-none"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
      >
        <Constellation 
          stars={quadrant.nodes}
          domainData={quadrant}
          selectedStar={selectedStar} 
          onSelectStar={onSelectStar}
          isQuadrantActive={isActive}
          isComplete={isComplete}
          onboardingStep={onboardingStep}
          awakenedStarId={awakenedStarId}
          currentScale={currentScale}
        />
      </div>
    </div>
  );
};

export default React.memo(Quadrant);
