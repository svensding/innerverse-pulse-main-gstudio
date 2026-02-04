
import React from 'react';
import { usePerformance } from '../contexts/PerformanceContext';

interface OnboardingEnergiesProps {
  onboardingStep: number;
  isZoomed?: boolean;
}

const OnboardingEnergies: React.FC<OnboardingEnergiesProps> = ({ onboardingStep, isZoomed = false }) => {
    const { settings } = usePerformance();
    
    // Core Colors
    const C_DO = '#e11d48';   // Red (West)
    const C_BE = '#06b6d4';   // Cyan (East)
    const C_SEE = '#fbbf24';  // Yellow (North)
    const C_FEEL = '#9333ea'; // Purple (South)

    // Step 10+ is "Mixing" where everything merges (Realms start)
    const isMixing = onboardingStep >= 10;
    
    // Step 9 is the PAUSE / CIRCLE step where all fire together
    const isPause = onboardingStep === 9;

    // Intro Activation Logic (Cumulative)
    const activeDo = onboardingStep >= 4;
    const activeBe = onboardingStep >= 5;
    const activeSee = onboardingStep >= 6;
    const activeFeel = onboardingStep >= 7;

    // Transition for Opacity
    const transClass = "transition-opacity duration-[2000ms] ease-out";

    // Opacity Logic
    const getOpacity = (energyStep: number) => {
        // Reduced ambient opacities for less distraction
        if (isZoomed) return 0.1;
        
        // During Mixing/Map view (Step 10+ or 99)
        // We boost opacity here because we rely on the animation to pulse it.
        // If we set it too low here, the base level is invisible.
        if (isMixing) return 0.6; 
        
        // During Pause Step (9), all should be bright and visible to mix
        if (isPause) return 1.0;

        // If this energy hasn't started yet, hide it
        if (onboardingStep < energyStep) return 0;

        // If this is the CURRENTLY introducing step, it's bright
        if (onboardingStep === energyStep) return 1.0;

        // If it's a past step (cumulative), show it dim (30%)
        return 0.3;
    };

    // Stagger logic: 
    // Step 4-9 (Intro): No stagger, we want immediate response or synchronized firing.
    // Step 10+ (Mixing): Ambient staggered loop.
    const getDelay = (index: number) => {
        if (isMixing) return `${index * 2}s`;
        return '0s';
    };

    // PERFORMANCE: Use settings.blending to toggle expensive blend modes
    // mix-blend-screen is beautiful but expensive. 'normal' is cheap.
    const blendMode = settings.blending ? 'mix-blend-screen' : 'mix-blend-normal';

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
            <style>{`
                /* 
                   UPDATED PHYSICS: 
                   1. Start small & invisible.
                   2. Grow significantly while staying dim/invisible (The swell).
                   3. Bloom to full brightness at mid-scale (The crest).
                   4. Fade out while continuing to expand (The dissipation).
                */
                @keyframes pulse-intro {
                    0% { 
                        transform: scale(0.4); 
                        opacity: 0; 
                    }
                    35% { 
                        opacity: 0; 
                        transform: scale(0.8);
                    } 
                    55% { 
                        opacity: 1; 
                        transform: scale(1.1); 
                    } 
                    100% { 
                        transform: scale(2.8); 
                        opacity: 0; 
                    } 
                }
                
                /* Infinite loop for mixing - BOOSTED OPACITY */
                @keyframes pulse-mixing {
                    0% { transform: scale(0.8); opacity: 0; }
                    20% { opacity: 0.8; } /* Boosted from 0.5 to 0.8 for visibility */
                    100% { transform: scale(3.5); opacity: 0; }
                }
                @keyframes pulse-white {
                    0% { transform: scale(0.1); opacity: 0; }
                    10% { opacity: 0.8; }
                    100% { transform: scale(3.5); opacity: 0; }
                }
            `}</style>

            <div className="absolute inset-0 flex items-center justify-center">
                
                {/* --- LAYER 1: PULSE WAKE (The Void Background) --- */}
                {settings.particles && (
                    <div 
                        className="absolute w-[300vw] h-[300vw] rounded-full animate-pulse opacity-10"
                        style={{
                            background: 'radial-gradient(circle, transparent 0%, transparent 20%, rgba(255,255,255,0.02) 40%, transparent 80%)',
                            animationDuration: '24s'
                        }}
                    />
                )}

                {/* --- LAYER 2: DIRECTIONAL PULSES --- */}
                
                {/* WEST (DO - Red) */}
                <div 
                    className={`absolute ${blendMode} ${transClass}`}
                    style={{
                        width: '80vmin', height: '80vmin', borderRadius: '50%',
                        background: `linear-gradient(to left, transparent 40%, ${C_DO} 90%)`,
                        maskImage: 'radial-gradient(circle, transparent 25%, rgba(0,0,0,0.5) 45%, black 60%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(circle, transparent 25%, rgba(0,0,0,0.5) 45%, black 60%, transparent 70%)',
                        opacity: getOpacity(4),
                        animation: settings.animations && (activeDo || isPause) ? `${isMixing ? 'pulse-mixing 12s infinite linear' : 'pulse-intro 8s ease-out infinite'}` : 'none',
                        animationDelay: getDelay(0)
                    }}
                />

                {/* EAST (BE - Cyan) */}
                <div 
                    className={`absolute ${blendMode} ${transClass}`}
                    style={{
                        width: '80vmin', height: '80vmin', borderRadius: '50%',
                        background: `linear-gradient(to right, transparent 40%, ${C_BE} 90%)`,
                        maskImage: 'radial-gradient(circle, transparent 25%, rgba(0,0,0,0.5) 45%, black 60%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(circle, transparent 25%, rgba(0,0,0,0.5) 45%, black 60%, transparent 70%)',
                        opacity: getOpacity(5),
                        animation: settings.animations && (activeBe || isPause) ? `${isMixing ? 'pulse-mixing 12s infinite linear' : 'pulse-intro 8s ease-out infinite'}` : 'none',
                        animationDelay: getDelay(1)
                    }}
                />

                {/* NORTH (SEE - Yellow) */}
                <div 
                    className={`absolute ${blendMode} ${transClass}`}
                    style={{
                        width: '80vmin', height: '80vmin', borderRadius: '50%',
                        background: `linear-gradient(to top, transparent 40%, ${C_SEE} 90%)`,
                        maskImage: 'radial-gradient(circle, transparent 25%, rgba(0,0,0,0.5) 45%, black 60%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(circle, transparent 25%, rgba(0,0,0,0.5) 45%, black 60%, transparent 70%)',
                        opacity: getOpacity(6),
                        animation: settings.animations && (activeSee || isPause) ? `${isMixing ? 'pulse-mixing 12s infinite linear' : 'pulse-intro 8s ease-out infinite'}` : 'none',
                        animationDelay: getDelay(2)
                    }}
                />

                {/* SOUTH (FEEL - Purple) */}
                <div 
                    className={`absolute ${blendMode} ${transClass}`}
                    style={{
                        width: '80vmin', height: '80vmin', borderRadius: '50%',
                        background: `linear-gradient(to bottom, transparent 40%, ${C_FEEL} 90%)`,
                        maskImage: 'radial-gradient(circle, transparent 25%, rgba(0,0,0,0.5) 45%, black 60%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(circle, transparent 25%, rgba(0,0,0,0.5) 45%, black 60%, transparent 70%)',
                        opacity: getOpacity(7),
                        animation: settings.animations && (activeFeel || isPause) ? `${isMixing ? 'pulse-mixing 12s infinite linear' : 'pulse-intro 8s ease-out infinite'}` : 'none',
                        animationDelay: getDelay(3)
                    }}
                />

                {/* Pure White Core (The Source) - Always active but prominent in pause */}
                <div 
                    className="absolute border border-white/20 z-10"
                    style={{
                        width: '40vmin', height: '40vmin', borderRadius: '50%',
                        animation: settings.animations ? 'pulse-white 16s infinite linear' : 'none',
                        boxShadow: '0 0 40px rgba(255,255,255,0.1)',
                        opacity: isZoomed ? 0.1 : (isPause ? 1 : 0.6)
                    }}
                />
            </div>
        </div>
    );
};

export default React.memo(OnboardingEnergies);
