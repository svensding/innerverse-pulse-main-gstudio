import React from 'react';
import { Node } from '../types';

interface GeneratedConstellationImageProps {
  stars: Node[];
}

const mapValueToRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

const GeneratedConstellationImage: React.FC<GeneratedConstellationImageProps> = ({ stars }) => {
  const starData = stars.map(star => {
    const avgValue = star.attributes.reduce((sum, attr) => sum + (attr.value ?? 0), 0) / star.attributes.length;
    return {
      ...star,
      radius: mapValueToRange(Math.abs(avgValue), 0, 100, 2, 6),
      opacity: mapValueToRange(Math.abs(avgValue), 0, 100, 0.6, 1.0),
    };
  });

  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <filter id="starGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Lines */}
      {starData.slice(1).map((star, index) => {
        const prevStar = starData[index];
        return (
          <line
            key={`${star.id}-sigil-line`}
            x1={prevStar.position.x}
            y1={prevStar.position.y}
            x2={star.position.x}
            y2={star.position.y}
            stroke="rgba(251, 191, 36, 0.5)"
            strokeWidth="0.5"
          />
        );
      })}
      {/* Stars */}
      {starData.map(star => (
        <circle
          key={`${star.id}-sigil-star`}
          cx={star.position.x}
          cy={star.position.y}
          r={star.radius}
          fill="rgba(251, 191, 36, 1)"
          fillOpacity={star.opacity}
          filter="url(#starGlow)"
        />
      ))}
    </svg>
  );
};

export default GeneratedConstellationImage;