
import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import { Domain, Node, LensData, PrimaryEnergyData, UIStrings } from '../types';
import Quadrant from './Quadrant';
import OnboardingEnergies from './OnboardingEnergies';
import OnboardingSeeds from './OnboardingSeeds';
import WatercolorNode from './WatercolorNode';
import DomainShape from './DomainShape';
import DomainLabel from './DomainLabel';
import LensSpectrum from './LensSpectrum'; 
import gsap from 'gsap';
import { usePerformance } from '../contexts/PerformanceContext';

interface SkyMapProps {
  domains: Domain[];
  activeDomain: Domain | null;
  selectedNode: Node | null;
  completedDomains: Record<string, boolean>;
  onboardingStep: number;
  awakenedNodeId: string | null;
  lensData: LensData;
  primaryEnergyData: PrimaryEnergyData;
  definedNodesCount: number;
  onSelectDomain: (domain: Domain) => void;
  onSelectNode: (node: Node) => void;
  onEnterAtlas: () => void;
  onDeselect: () => void;
  uiStrings: UIStrings;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 4.0;

const CoreEnergyLabel: React.FC<{ 
    text: string, 
    tooltipText: string,
    positionStyle: React.CSSProperties,
    flowType: 'vertical' | 'horizontal' | 'radial',
    color: string,
    isVisible: boolean,
    isPulsing?: boolean,
    isZoomed?: boolean,
    uiStrings: UIStrings
}> = ({ text, tooltipText, positionStyle, flowType, color, isVisible, isPulsing, isZoomed, uiStrings }) => {
    const { settings } = usePerformance();
    
    // Removed backdrop-blur-md for performance
    let tooltipClasses = "absolute w-64 bg-black/60 p-4 rounded-xl border border-white/10 shadow-2xl text-sm text-slate-300 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-normal";
    let tooltipStyle: React.CSSProperties = {};

    // Dynamic Glow Dimensions
    let width = '50vw';
    let height = '50vh';
    
    if (flowType === 'vertical') {
        width = isZoomed ? '80vw' : '45vw';
        height = isZoomed ? '150vh' : '90vh';
    } else {
        width = isZoomed ? '150vw' : '90vw';
        height = isZoomed ? '80vh' : '45vh';
    }

    // Tooltip position adjustments
    const isFeeling = text.toLowerCase() === uiStrings.axis.feeling.toLowerCase();
    const isDoing = text.toLowerCase() === uiStrings.axis.doing.toLowerCase();
    const isBeing = text.toLowerCase() === uiStrings.axis.being.toLowerCase();

    if (isFeeling) {
        tooltipClasses += " bottom-full mb-4 left-1/2 -translate-x-1/2"; 
    } else if (isDoing) {
        tooltipStyle = { 
            transform: 'rotate(90deg) translateY(160%) translateX(0%)', 
            transformOrigin: 'center center'
        };
    } else if (isBeing) {
        tooltipStyle = { 
            transform: 'rotate(-90deg) translateY(160%) translateX(0%)',
            transformOrigin: 'center center'
        };
    } else {
        tooltipClasses += " top-full mt-4 left-1/2 -translate-x-1/2 translate-y-4 group-hover:translate-y-0"; 
    }

    const zIndexClass = isZoomed ? 'z-[60]' : 'z-[40]';
    const pulseScale = isPulsing ? 'scale-110 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'scale-100';

    return (
        <div 
            data-name={`axis-label-${text}`}
            className={`absolute ${zIndexClass} group cursor-help pointer-events-auto flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${pulseScale}`}
            style={positionStyle}
        >
            {/* ATMOSPHERIC GLOW */}
            <div 
                className="absolute z-[-1] pointer-events-none transition-all duration-[2000ms] ease-in-out"
                style={{ 
                    width: width,
                    height: height,
                    left: '50%', 
                    top: '50%', 
                    transform: 'translate(-50%, -50%)',
                    opacity: isVisible ? (isZoomed ? 0.7 : 0.5) : 0
                }}
            >
                <div 
                    className="w-full h-full rounded-full"
                    style={{
                        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
                        filter: settings.distortion ? 'blur(100px)' : 'blur(20px)',
                        // PERFORMANCE: Use simple blend if setting is off
                        mixBlendMode: settings.blending ? 'screen' : 'normal',
                        animation: settings.animations ? 'deep-breathe 10s ease-in-out infinite' : 'none'
                    }}
                />
            </div>

            <div className={`absolute inset-[-50%] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none ${isPulsing ? 'opacity-40 animate-pulse' : ''}`}>
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                    {flowType === 'vertical' && (
                        <path d="M50 0 Q60 50 50 100 M40 20 Q50 60 40 80 M60 20 Q50 60 60 80" stroke={color} strokeWidth="0.5" fill="none" />
                    )}
                    {flowType === 'horizontal' && (
                        <path d="M0 50 Q50 60 100 50 M20 40 Q60 50 80 40 M20 60 Q60 50 80 60" stroke={color} strokeWidth="0.5" fill="none" />
                    )}
                </svg>
            </div>
            
            {/* PERFORMANCE: Toggle blend mode on text too */}
            <span 
                className={`text-sm font-light lowercase tracking-[0.4em] select-none transition-colors duration-500 group-hover:text-white/90 ${isPulsing ? 'text-white font-normal' : 'text-white/60'}`}
                style={{ 
                    mixBlendMode: settings.blending ? 'overlay' : 'normal', 
                    textShadow: isPulsing ? `0 0 20px ${color}` : '0 0 10px rgba(0,0,0,0.5)' 
                }}
            >
                {text}
            </span>
            <div className={`${tooltipClasses} ${isPulsing ? '!opacity-100 !translate-y-0' : ''}`} style={tooltipStyle}>
                {tooltipText}
            </div>
        </div>
    );
};

const LensDemo = React.memo(({ step, uiStrings }: { step: number, uiStrings: UIStrings }) => {
    const [state, setState] = useState({
        roughness: 0,
        spread: 0,
        opacity: 0.8,
        sliderValue: 0
    });

    useEffect(() => {
        if (step < 27 || step > 29) {
            setState({ roughness: 0, spread: 0, opacity: 0.8, sliderValue: 0 });
            return;
        }

        let t = 0;
        const interval = setInterval(() => {
            t += 0.01;
            const sine = Math.sin(t) * 100;
            if (step === 27) setState({ roughness: sine, spread: 0, opacity: 0.8, sliderValue: sine });
            else if (step === 28) setState({ roughness: 0, spread: sine, opacity: 0.8, sliderValue: sine });
            else if (step === 29) setState({ roughness: 0, spread: 0, opacity: 0.6 + ((sine + 100) / 200) * 0.4, sliderValue: sine });
        }, 30);

        return () => clearInterval(interval);
    }, [step]);

    if (step === 30) {
        return (
            <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center animate-fade-in" style={{ transition: 'all 0.8s' }}>
                <div className="relative z-50 flex flex-col items-center gap-12">
                    <div className="absolute top-[-80px] text-center animate-fade-in">
                        <span className="text-xs uppercase tracking-widest text-purple-300 font-bold">Resonance</span>
                        <div className="w-px h-8 bg-purple-500/50 mx-auto mt-2"></div>
                    </div>
                    <WatercolorNode id="demo-lens-trinity" size={180} color="#ffffff" isDefined={true} isSelected={false} roughness={0} spread={0} opacity={0.8} renderVisuals={true} />
                    <div className="absolute bottom-[-60px] w-64 flex justify-between animate-fade-in delay-300">
                        <div className="text-center flex flex-col items-center">
                            <div className="w-px h-6 bg-indigo-500/50 mb-2"></div>
                            <span className="text-xs uppercase tracking-widest text-indigo-300 font-bold">Form</span>
                        </div>
                        <div className="text-center flex flex-col items-center">
                            <div className="w-px h-6 bg-amber-500/50 mb-2"></div>
                            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">Essence</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center animate-fade-in" style={{ transition: 'all 0.5s' }}>
            <div className="relative z-50 flex flex-col items-center gap-8">
                <WatercolorNode id="demo-lens" size={150} color="#ffffff" isDefined={true} isSelected={false} roughness={state.roughness} spread={state.spread} opacity={state.opacity} renderVisuals={true} />
                <div className="absolute top-[120%] left-1/2 -translate-x-1/2">
                    <LensSpectrum opacity={1} value={state.sliderValue} />
                </div>
            </div>
        </div>
    );
});

const getDomainCentroid = (domain: Domain): { x: number, y: number } => {
    let cx = 0, cy = 0;
    domain.nodes.forEach(n => { cx += n.position.x; cy += n.position.y; });
    return { x: cx / domain.nodes.length, y: cy / domain.nodes.length };
}

const SkyMap = forwardRef<{ zoomIn: () => void; zoomOut: () => void }, SkyMapProps>(
  ({ domains, activeDomain, selectedNode, completedDomains, onboardingStep, awakenedNodeId, lensData, primaryEnergyData, definedNodesCount, onSelectDomain, onSelectNode, onEnterAtlas, onDeselect, uiStrings }, ref) => {
    const transformRef = useRef({ x: 0, y: 0, scale: 0.65 });
    const mapRef = useRef<HTMLDivElement>(null);
    const [labelOffsets, setLabelOffsets] = useState({ x: 0, y: 0 }); 
    const interactionState = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0, lastDist: 0, isDragging: false });

    // Performance Context Access
    const { settings } = usePerformance();

    const updateTransform = (duration: number = 0) => {
        if (!mapRef.current) return;
        const { x, y, scale } = transformRef.current;
        gsap.to(mapRef.current, { x, y, scale, duration, ease: "power2.out", overwrite: "auto" });
        setLabelOffsets({ x, y });
    };

    useImperativeHandle(ref, () => ({
      zoomIn: () => {
        transformRef.current.scale = Math.min(transformRef.current.scale * 1.25, MAX_SCALE);
        updateTransform(0.8);
      },
      zoomOut: () => {
        const newScale = Math.max(transformRef.current.scale / 1.25, MIN_SCALE);
        transformRef.current.scale = newScale;
        updateTransform(0.8);
        if (activeDomain && newScale < 0.7) onDeselect();
      },
      reset: () => {
        transformRef.current = { x: 0, y: 0, scale: 0.65 };
        updateTransform(1.5);
        // Removed onDeselect() here to prevent infinite recursion if parent calls reset()
      }
    }));

    useEffect(() => {
      let targetX = 0, targetY = 0, targetScale = 1.0;
      let duration = 2.0;
      const vmin = Math.min(window.innerWidth, window.innerHeight);
      const mapPixels = 1.5 * vmin; 

      if (activeDomain) {
        const centroid = getDomainCentroid(activeDomain);
        let quadOffsetX = 0; let quadOffsetY = 0;
        if (activeDomain.id === 'd1') { quadOffsetX = -25; quadOffsetY = -25; }
        if (activeDomain.id === 'd3') { quadOffsetX = 25; quadOffsetY = -25; }
        if (activeDomain.id === 'd2') { quadOffsetX = -25; quadOffsetY = 25; }
        if (activeDomain.id === 'd4') { quadOffsetX = 25; quadOffsetY = 25; }
        const shiftX = (centroid.x - 50) / 2; 
        const shiftY = (centroid.y - 50) / 2;
        const finalXPercent = quadOffsetX + shiftX;
        const finalYPercent = quadOffsetY + shiftY;
        const finalXPixels = (finalXPercent / 100) * mapPixels;
        const finalYPixels = (finalYPercent / 100) * mapPixels;
        const domainZoomScale = 1.15;
        targetX = -finalXPixels * domainZoomScale; 
        targetY = -finalYPixels * domainZoomScale;
        targetScale = domainZoomScale;
      } 
      else if (onboardingStep < 99) {
          if (onboardingStep === 9) { targetScale = 0.60; }
          else if (onboardingStep === 11 || onboardingStep === 12) { targetScale = 0.85; targetX = mapPixels * 0.25 * 0.85; targetY = mapPixels * 0.25 * 0.85; duration = 1.5; }
          else if (onboardingStep === 13 || onboardingStep === 14) { targetScale = 0.85; targetX = -mapPixels * 0.25 * 0.85; targetY = mapPixels * 0.25 * 0.85; duration = 1.5; }
          else if (onboardingStep === 15 || onboardingStep === 16) { targetScale = 0.85; targetX = -mapPixels * 0.25 * 0.85; targetY = -mapPixels * 0.25 * 0.85; duration = 1.5; }
          else if (onboardingStep === 17 || onboardingStep === 18) { targetScale = 0.85; targetX = mapPixels * 0.25 * 0.85; targetY = -mapPixels * 0.25 * 0.85; duration = 1.5; }
          else if (onboardingStep === 19) { targetScale = 0.65; targetX = 0; targetY = 0; }
          else if (onboardingStep === 22 || onboardingStep === 23) { targetScale = 1.3; targetX = mapPixels * 0.25 * 1.3; targetY = mapPixels * 0.25 * 1.3; duration = 2.0; }
          else if (onboardingStep === 24) { targetScale = 0.9; targetX = 0; targetY = 0; }
          else if (onboardingStep >= 25 && onboardingStep <= 30) { targetScale = 2.5; targetX = 0; targetY = 0; duration = 2.0; }
          else { targetScale = 0.65; targetX = 0; targetY = 0; }
      } else {
          targetScale = 0.65; targetX = 0; targetY = 0;
      }
      transformRef.current = { x: targetX, y: targetY, scale: targetScale };
      updateTransform(duration);
    }, [activeDomain, onboardingStep]);

    const handleWheel = (e: React.WheelEvent) => {
      e.preventDefault();
      const { deltaY } = e;
      const newScale = transformRef.current.scale * (1 - deltaY * 0.002);
      transformRef.current.scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
      updateTransform(0.1); 
      if (activeDomain && transformRef.current.scale < 0.7) onDeselect();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      interactionState.current = { ...interactionState.current, startX: e.clientX, startY: e.clientY, lastX: transformRef.current.x, lastY: transformRef.current.y, isDragging: true };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactionState.current.isDragging) return;
      transformRef.current.x = interactionState.current.lastX + (e.clientX - interactionState.current.startX);
      transformRef.current.y = interactionState.current.lastY + (e.clientY - interactionState.current.startY);
      updateTransform(0);
    };
    
    const handleMouseUp = () => {
      interactionState.current.isDragging = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!canInteract) return;
        if (e.touches.length === 1) {
            interactionState.current.startX = e.touches[0].clientX;
            interactionState.current.startY = e.touches[0].clientY;
            interactionState.current.lastX = transformRef.current.x;
            interactionState.current.lastY = transformRef.current.y;
            interactionState.current.isDragging = true;
        } else if (e.touches.length === 2) {
            const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            interactionState.current.lastDist = dist;
            interactionState.current.isDragging = true;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!interactionState.current.isDragging || !canInteract) return;
        if (e.touches.length === 1) {
            const deltaX = e.touches[0].clientX - interactionState.current.startX;
            const deltaY = e.touches[0].clientY - interactionState.current.startY;
            transformRef.current.x = interactionState.current.lastX + deltaX;
            transformRef.current.y = interactionState.current.lastY + deltaY;
            updateTransform(0);
        } else if (e.touches.length === 2) {
            const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            const delta = dist - interactionState.current.lastDist;
            const zoomFactor = delta * 0.005; 
            const newScale = transformRef.current.scale + zoomFactor;
            transformRef.current.scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
            interactionState.current.lastDist = dist;
            updateTransform(0);
        }
    };

    const handleTouchEnd = () => {
        interactionState.current.isDragging = false;
        if (activeDomain && transformRef.current.scale < 0.7) onDeselect();
    };

    const isOnboardingComplete = onboardingStep >= 99;
    const showEnergies = isOnboardingComplete || onboardingStep >= 4;
    const showDoing = !activeDomain || activeDomain.id === 'd1' || activeDomain.id === 'd2';
    const showBeing = !activeDomain || activeDomain.id === 'd3' || activeDomain.id === 'd4';
    const showSeeing = !activeDomain || activeDomain.id === 'd1' || activeDomain.id === 'd3';
    const showFeeling = !activeDomain || activeDomain.id === 'd2' || activeDomain.id === 'd4';

    const getClampedOffset = (offset: number, axis: 'x' | 'y') => {
        const dim = axis === 'x' ? window.innerWidth : window.innerHeight;
        const maxOffset = dim * 0.4; 
        return Math.max(-maxOffset, Math.min(maxOffset, offset));
    };

    const clampedX = getClampedOffset(labelOffsets.x, 'x');
    const clampedY = getClampedOffset(labelOffsets.y, 'y');
    const showLensDemo = onboardingStep >= 25 && onboardingStep <= 30;
    const highlightEnergies = onboardingStep === 9;
    
    const isDomainShapeVisible = (dId: string) => {
        if (isOnboardingComplete) return true;
        if (onboardingStep >= 19) return true;
        if (dId === 'd1') return onboardingStep >= 11;
        if (dId === 'd3') return onboardingStep >= 13;
        if (dId === 'd4') return onboardingStep >= 15;
        if (dId === 'd2') return onboardingStep >= 17;
        return false;
    };

    const isLabelVisible = (dId: string) => {
        if (isOnboardingComplete) return true;
        if (onboardingStep >= 19) return true;
        return false;
    };

    const isInteractiveStep = onboardingStep === 9 || onboardingStep === 19 || onboardingStep === 24;
    const canInteract = isOnboardingComplete || isInteractiveStep;
    const interactionClass = canInteract ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none';

    return (
      <>
        {showLensDemo && <LensDemo step={onboardingStep} uiStrings={uiStrings} />}
        <style>{`
            @keyframes deep-breathe {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.15); opacity: 0.8; }
            }
        `}</style>

        <div 
            data-name="sky-map-interaction-layer"
            className={`absolute inset-0 perspective-1000 overflow-hidden touch-none flex items-center justify-center z-10 ${interactionClass}`}
            onWheel={canInteract ? handleWheel : undefined}
            onMouseDown={canInteract ? handleMouseDown : undefined}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                ref={mapRef}
                data-name="map-transform-container"
                className="w-[150vmin] h-[150vmin] will-change-transform relative flex items-center justify-center z-30"
                style={{ 
                    transform: `translate(${transformRef.current.x}px, ${transformRef.current.y}px) scale(${transformRef.current.scale})`,
                    backfaceVisibility: 'hidden',
                    isolation: 'isolate' 
                }}
            >
                <OnboardingEnergies onboardingStep={onboardingStep} isZoomed={!!activeDomain} />
                <OnboardingSeeds onboardingStep={onboardingStep} domains={domains} uiStrings={uiStrings} />

                <div className="w-full h-full relative flex items-center justify-center">
                    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-12 relative z-10 pointer-events-none">
                    {domains.map(domain => {
                        const isActive = activeDomain?.id === domain.id;
                        const shapeVisible = isDomainShapeVisible(domain.id);
                        const labelVisible = isLabelVisible(domain.id);
                        const expressionsRevealing = onboardingStep >= 23 && onboardingStep < 25;
                        const starZIndex = isActive || expressionsRevealing ? 'z-20' : 'z-0';
                        const isShapePulsing = isActive;

                        return (
                            <div key={domain.id} data-name={`quadrant-${domain.id}`} className="relative p-0 pointer-events-auto group">
                                <div className={`relative w-full h-full transition-all duration-500 ${starZIndex}`}>
                                    <Quadrant
                                        quadrant={domain}
                                        isActive={isActive}
                                        isDimmed={!!activeDomain && !isActive}
                                        selectedStar={selectedNode}
                                        isComplete={!!completedDomains[domain.id]}
                                        awakenedStarId={awakenedNodeId}
                                        onSelect={() => onSelectDomain(domain)}
                                        onDeselect={onDeselect}
                                        onSelectStar={onSelectNode}
                                        onboardingStep={onboardingStep}
                                        currentScale={transformRef.current.scale} 
                                    />
                                </div>
                                <div className={`absolute inset-0 transition-all duration-1000 ${shapeVisible ? 'opacity-100' : 'opacity-0'} ${isActive ? 'z-0' : 'z-10'}`}>
                                    <DomainShape 
                                        domain={domain}
                                        isActive={isShapePulsing} 
                                        onSelect={() => {
                                            if (!canInteract) return; 
                                            if (isActive) onDeselect();
                                            else onSelectDomain(domain);
                                        }}
                                    />
                                </div>
                                <div className="absolute inset-0 z-30 pointer-events-none">
                                    <DomainLabel domain={domain} isVisible={labelVisible} isActive={isActive} currentScale={transformRef.current.scale} />
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
            
            <CoreEnergyLabel text={uiStrings.axis.doing} tooltipText={uiStrings.axis.doingDef} positionStyle={{ left: '2%', top: `calc(50% + ${clampedY}px)`, transform: 'translateY(-50%) rotate(-90deg)' }} flowType="vertical" color="#e11d48" isVisible={showEnergies && showDoing} isPulsing={highlightEnergies} isZoomed={!!activeDomain} uiStrings={uiStrings} />
            <CoreEnergyLabel text={uiStrings.axis.being} tooltipText={uiStrings.axis.beingDef} positionStyle={{ right: '2%', top: `calc(50% + ${clampedY}px)`, transform: 'translateY(-50%) rotate(90deg)' }} flowType="vertical" color="#06b6d4" isVisible={showEnergies && showBeing} isPulsing={highlightEnergies} isZoomed={!!activeDomain} uiStrings={uiStrings} />
            <CoreEnergyLabel text={uiStrings.axis.seeing} tooltipText={uiStrings.axis.seeingDef} positionStyle={{ top: '5%', left: `calc(50% + ${clampedX}px)`, transform: 'translateX(-50%)' }} flowType="horizontal" color="#fbbf24" isVisible={showEnergies && showSeeing} isPulsing={highlightEnergies} isZoomed={!!activeDomain} uiStrings={uiStrings} />
            <CoreEnergyLabel text={uiStrings.axis.feeling} tooltipText={uiStrings.axis.feelingDef} positionStyle={{ bottom: '5%', left: `calc(50% + ${clampedX}px)`, transform: 'translateX(-50%)' }} flowType="horizontal" color="#9333ea" isVisible={showEnergies && showFeeling} isPulsing={highlightEnergies} isZoomed={!!activeDomain} uiStrings={uiStrings} />
        </div>
      </>
    );
  }
);

export default SkyMap;
