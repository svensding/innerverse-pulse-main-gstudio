
import React, { useMemo } from 'react';
import { Domain } from '../types';
import { getConvexHull, generateSmoothHullPath } from '../utils/geometry';

interface DomainShapeProps {
  domain: Domain;
  isActive: boolean;
  onSelect?: () => void;
  style?: React.CSSProperties;
}

const DomainShape: React.FC<DomainShapeProps> = ({ domain, isActive, onSelect, style }) => {
  
  const getAnchorPoint = (dId: string) => {
      switch(dId) {
          case 'd1': return { x: 85, y: 85 }; // Bottom Right anchor for TL quadrant
          case 'd3': return { x: 15, y: 85 }; // Bottom Left anchor for TR quadrant
          case 'd2': return { x: 85, y: 15 }; // Top Right anchor for BL quadrant
          case 'd4': return { x: 15, y: 15 }; // Top Left anchor for BR quadrant
          default: return { x: 50, y: 50 };
      }
  }

  // Calculate geometry
  const { shapePath, clipPathD } = useMemo(() => {
      const points = domain.nodes.map(n => ({ x: n.position.x, y: n.position.y }));
      const anchor = getAnchorPoint(domain.id);
      points.push(anchor);
      
      const hullPoints = getConvexHull(points);
      
      // 1. Standard Path for the colored blob (0..100 coords)
      const path = generateSmoothHullPath(hullPoints, 25);

      // 2. Normalized Path for the CSS Clip Path (0..1 coords)
      // We scale points down by 100, and scale the buffer (25 -> 0.25)
      const normalizedPoints = hullPoints.map(p => ({ x: p.x / 100, y: p.y / 100 }));
      const clip = generateSmoothHullPath(normalizedPoints, 0.25);

      return { shapePath: path, clipPathD: clip };
  }, [domain]);

  const gradientId = `domain-grad-${domain.id}`;
  const clipId = `domain-clip-${domain.id}`;

  return (
    <>
        {/* Definition for the Clip Path used by the blur container */}
        <svg width="0" height="0" className="absolute">
            <defs>
                <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                    <path d={clipPathD} />
                </clipPath>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform={`rotate(${parseInt(domain.gradient.direction) || 45})`}>
                    <stop offset="0%" stopColor={domain.gradient.start} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={domain.gradient.end} stopOpacity="0.3" />
                </linearGradient>
            </defs>
        </svg>

        <div 
            className={`absolute inset-0 transition-all duration-1000 ease-in-out`}
            style={style}
            onClick={(e) => {
                if (onSelect) {
                    e.stopPropagation();
                    onSelect();
                }
            }}
        >
            {/* The Frosted Glass Layer - Clipped to the organic shape */}
            <div 
                className={`absolute inset-0 transition-all duration-1000 ease-in-out origin-center ${isActive ? 'backdrop-blur-xl' : 'backdrop-blur-sm'}`}
                style={{ 
                    clipPath: `url(#${clipId})`,
                    // We apply the same scale transform here to match the inner SVG
                    // Fix: Force GPU Layer Promotion to prevent flickering
                    transform: isActive ? 'scale(2.5) translateZ(0)' : 'scale(1) translateZ(0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                }} 
            />

            {/* The Colored Blob Layer */}
            <svg viewBox="0 0 100 100" width="100%" height="100%" className="overflow-visible absolute inset-0" style={{ filter: 'blur(12px)' }}>
                <path 
                    d={shapePath} 
                    fill={`url(#${gradientId})`}
                    className={`transition-all duration-1000 ease-in-out cursor-pointer origin-center ${
                        isActive 
                        ? 'scale-[2.5] opacity-60' 
                        : 'scale-100 opacity-100 hover:opacity-90 hover:scale-[1.02]'
                    }`}
                />
            </svg>
        </div>
    </>
  );
};

export default DomainShape;
