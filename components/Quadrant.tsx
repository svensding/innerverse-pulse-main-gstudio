
import React, { useState, useRef, useEffect } from 'react';
import { Domain, Node } from '../types';
import Constellation from './Constellation';
import { usePerformance } from '../contexts/PerformanceContext';

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
  
  const { settings } = usePerformance();

  useEffect(() => {
    // Check global settings AND screen width
    if (!settings.parallax || window.innerWidth < 768) {
        setParallax({ x: 0, y: 0 });
        return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!quadrantRef.current || !isActive) return;
      const rect = quadrantRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setParallax({ x: -x * 20, y: -y * 20 });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive, settings.parallax]);

  return (
    <div
      ref={quadrantRef}
      className={`relative w-full h-full transition-all duration-1000 ease-in-out ${isDimmed ? 'opacity-20 blur-sm grayscale' : 'opacity-100'} overflow-visible pointer-events-none`}
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
