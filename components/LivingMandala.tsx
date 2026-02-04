
import React, { useState, useRef } from 'react';
import { AnalysisData } from '../types';

interface LivingMandalaProps {
  axes: { name: string, data: AnalysisData }[];
  isInteractive: boolean;
  onEnterAtlas: () => void;
}

const mapValueToRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
    if (inMin === inMax) return outMin;
    const mapped = ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    return Math.max(outMin, Math.min(outMax, mapped));
};

const polarToCartesian = (angle: number, radius: number, centerX: number, centerY: number): [number, number] => {
    const angleInRadians = (angle - 90) * Math.PI / 180.0;
    return [
        centerX + (radius * Math.cos(angleInRadians)),
        centerY + (radius * Math.sin(angleInRadians))
    ];
};

const LivingMandala: React.FC<LivingMandalaProps> = ({ axes, isInteractive, onEnterAtlas }) => {
    if (!Array.isArray(axes) || axes.length === 0) {
        return <div className="relative w-48 h-48 md:w-64 md:h-64 opacity-0 scale-50" />;
    }

    const hasData = axes.some(axis => axis.data.equilibrium !== 0 || axis.data.flux !== 0);
    const pulseClass = isInteractive ? 'group-hover:scale-105 cursor-pointer' : 'pointer-events-none';
    const svgRef = useRef<SVGSVGElement>(null);
    const [hoveredPoint, setHoveredPoint] = useState<{ x: number, y: number, label: string } | null>(null);

    const CENTER = 50;
    const MAX_RADIUS = 45;
    const BALANCE_RADIUS = 28;

    const getPointPath = (type: 'equilibrium' | 'flux'): string => {
        const points = axes.map((axis, i) => {
            const value = type === 'equilibrium' ? axis.data.equilibrium : axis.data.flux;
            const inMin = type === 'equilibrium' ? -100 : 0;
            const inMax = type === 'equilibrium' ? 100 : 70;
            const outMin = type === 'equilibrium' ? 5 : BALANCE_RADIUS; // Flux starts from balance ring
            const radius = mapValueToRange(value, inMin, inMax, outMin, MAX_RADIUS);
            const angle = (360 / axes.length) * i;
            return polarToCartesian(angle, radius, CENTER, CENTER);
        });
        return points.map(p => p.join(',')).join(' ');
    };
    
    const signaturePoints = axes.map((axis, i) => {
        const radius = mapValueToRange(axis.data.equilibrium, -100, 100, 5, MAX_RADIUS);
        const angle = (360 / axes.length) * i;
        return polarToCartesian(angle, radius, CENTER, CENTER);
    });

    const signaturePath = signaturePoints.map(p => p.join(',')).join(' ');
    const fluxPath = getPointPath('flux');
    
    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
        if (!svgRef.current) return;
        const svgPoint = svgRef.current.createSVGPoint();
        svgPoint.x = event.clientX;
        svgPoint.y = event.clientY;
        const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM()?.inverse());

        let closestDist = Infinity;
        let closestPoint = null;

        signaturePoints.forEach((point, i) => {
            const dist = Math.hypot(transformedPoint.x - point[0], transformedPoint.y - point[1]);
            if (dist < closestDist) {
                closestDist = dist;
                closestPoint = {
                    x: point[0],
                    y: point[1],
                    label: `${axes[i].name}: ${axes[i].data.equilibrium.toFixed(1)}`
                };
            }
        });

        if (closestPoint && closestDist < 10) { // Hover radius
            setHoveredPoint(closestPoint);
        } else {
            setHoveredPoint(null);
        }
    };

    return (
        <div
            className={`relative w-48 h-48 md:w-64 md:h-64 group transition-all duration-1000 ${hasData ? 'opacity-100' : 'opacity-0 scale-50'}`}
            onClick={isInteractive ? onEnterAtlas : undefined}
            role={isInteractive ? "button" : undefined}
            aria-label={isInteractive ? "Enter Soul's Atlas view" : undefined}
        >
            <svg
                ref={svgRef}
                viewBox="0 0 100 100"
                className={`w-full h-full transition-transform duration-500 ease-in-out ${pulseClass}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredPoint(null)}
            >
                <defs>
                    <filter id="mandala-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    </filter>
                    <filter id="flux-blur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                    </filter>
                </defs>

                <g opacity={0.3} filter="url(#mandala-glow)">
                    {axes.map((_, i) => {
                        const angle = (360 / axes.length) * i;
                        const [x, y] = polarToCartesian(angle, MAX_RADIUS, CENTER, CENTER);
                        return <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="white" strokeWidth="0.2" />;
                    })}
                    <circle cx={CENTER} cy={CENTER} r={BALANCE_RADIUS} fill="none" stroke="#f59e0b" strokeWidth="0.3" strokeDasharray="1 2" />
                </g>
                
                {/* The Flux Field (Background Aura) */}
                <polygon points={fluxPath} fill="#f59e0b" fillOpacity="0.1" filter="url(#flux-blur)" className="transition-all duration-1000 ease-in-out pointer-events-none" />
                
                {/* The Signature (Living Bioluminescent Shape) */}
                {/* PERFORMANCE FIX: Removed filter="url(#ink-flow)" */}
                <polygon 
                    points={signaturePath} 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="0.5" 
                    className="transition-all duration-1000 ease-in-out" 
                />

                {/* Interactive Tooltip */}
                {hoveredPoint && (
                    <g className="pointer-events-none transition-opacity duration-200">
                        <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="2" fill="#f59e0b" />
                        <text x={hoveredPoint.x} y={hoveredPoint.y - 4} fill="white" fontSize="4" textAnchor="middle" className="font-bold tracking-wider uppercase">{hoveredPoint.label.split(':')[0]}</text>
                        <text x={hoveredPoint.x} y={hoveredPoint.y + 4} fill="white" fontSize="3" textAnchor="middle">{hoveredPoint.label.split(':')[1]}</text>
                    </g>
                )}
            </svg>
             {isInteractive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center text-white text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-bold">enter atlas</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LivingMandala;
