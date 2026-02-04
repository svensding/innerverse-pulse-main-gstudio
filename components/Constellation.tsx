
import React from 'react';
import { Node, Domain } from '../types';
import Star from './Star';

interface ConstellationProps {
  stars: Node[];
  domainData: Domain;
  selectedStar: Node | null;
  onSelectStar: (node: Node) => void;
  isQuadrantActive: boolean;
  isComplete: boolean;
  onboardingStep: number;
  awakenedStarId: string | null;
  currentScale: number;
}

const Constellation: React.FC<ConstellationProps> = ({ stars, domainData, selectedStar, onSelectStar, isQuadrantActive, isComplete, onboardingStep, awakenedStarId, currentScale }) => {
  
  // Reveal at Step 23 ("I found 6 points").
  // Stay visible through Step 24 (Pause / Exploration).
  // Fade out at Step 25 (Transition to Lenses demo).
  // Re-appear at 99 (Complete).
  const isStarsVisible = (onboardingStep >= 23 && onboardingStep <= 24) || onboardingStep >= 99;

  return (
    <div className="relative w-full h-full pointer-events-none">
      {/* THE EXPRESSIONS */}
      <div 
        className="relative w-full h-full transition-opacity duration-[2000ms]" 
        style={{ opacity: isStarsVisible ? 1 : 0 }}
      >
        {stars.map((star, i) => {
            const isDefined = star.attributes.every(a => a.value !== null);
            let revealDelay = i * 200;
            // Stagger reveals slightly
            if (domainData.id === 'd3') revealDelay += 200;
            if (domainData.id === 'd4') revealDelay += 400;
            if (domainData.id === 'd2') revealDelay += 600;

            return (
            <Star
                key={star.id}
                star={star}
                index={i}
                isSelected={selectedStar?.id === star.id}
                isDefined={isDefined}
                onSelect={() => onSelectStar(star)}
                isQuadrantActive={isQuadrantActive}
                isAwakening={awakenedStarId === star.id}
                delay={revealDelay}
                domainColor={domainData.nebula.color1}
                onboardingStep={onboardingStep} // Prop passed down for forced visibility logic inside Star too
            />
            );
        })}
      </div>
    </div>
  );
};

export default React.memo(Constellation);
