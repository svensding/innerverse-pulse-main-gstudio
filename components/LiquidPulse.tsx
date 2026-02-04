
import React, { useMemo } from 'react';
import { generateBlobPath } from '../utils/geometry';

interface LiquidPulseProps {
  onboardingStep: number;
}

const LiquidPulse: React.FC<LiquidPulseProps> = ({ onboardingStep }) => {
    // Core Colors
    const C_DO = '#e11d48';   // Red (West)
    const C_BE = '#06b6d4';   // Cyan (East)
    const C_SEE = '#fbbf24';  // Yellow (North)
    const C_FEEL = '#9333ea'; // Purple (South)

    // Step Logic (Matches existing flow)
    // Step 4: Do
    // Step 5: Be
    // Step 6: See + Feel
    // Step 7: PAUSE (All visible)
    // Step 8+: Mixing
    const isMixing = onboardingStep >= 8;
    const activeDo = onboardingStep === 4 || onboardingStep === 7 || isMixing;
    const activeBe = onboardingStep === 5 || onboardingStep === 7 || isMixing;
    const activeSee = onboardingStep === 6 || onboardingStep === 7 || isMixing;
    const activeFeel = onboardingStep === 6 || onboardingStep === 7 || isMixing;

    // Generate Organic Blobs once
    // Radius 45 (keeps it within 100x100 viewbox with buffer), Randomness 0.2, Points 8
    const blobs = useMemo(() => ({
        do: generateBlobPath(40, 0.25, 8),
        be: generateBlobPath(40, 0.20, 9),
        see: generateBlobPath(40, 0.15, 7),
        feel: generateBlobPath(40, 0.30, 10),
    }), []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <style>{`
                /* 
                   THE DEEP LIQUID PHYSICS 
                   Simulates a drop hitting water: Impact -> Submerge/Recoil -> Spread
                */
                @keyframes liquid-ripple {
                    0% { 
                        transform: scale(0.0); 
                        opacity: 0;
                        stroke-width: 45px; /* Solid filled center */
                    }
                    10% {
                        transform: scale(0.4); 
                        opacity: 0.8;
                        stroke-width: 40px; /* Still mostly filled */
                    }
                    25% {
                        transform: scale(0.35); /* The Recoil/Bounce */
                        opacity: 1;
                        stroke-width: 35px;
                    }
                    50% {
                        opacity: 0.6;
                        stroke-width: 15px; /* The Wake opens up */
                    }
                    100% { 
                        transform: scale(4.0); /* Massive spread */
                        opacity: 0; 
                        stroke-width: 2px; /* Thin edge at the end */
                    }
                }

                @keyframes liquid-mixing {
                    0% { transform: scale(0.8); opacity: 0; stroke-width: 10px; }
                    20% { opacity: 0.4; }
                    100% { transform: scale(3.5); opacity: 0; stroke-width: 1px; }
                }

                .liquid-blob {
                    fill: none;
                    transform-box: fill-box;
                    transform-origin: center;
                    vector-effect: non-scaling-stroke; /* Keeps stroke crisp? No, we want stroke to scale with physics */
                }
            `}</style>

            <div className="absolute inset-0 flex items-center justify-center">
                
                {/* DO (West/Action - Red) */}
                {activeDo && (
                    <svg viewBox="0 0 100 100" className="absolute w-[80vmin] h-[80vmin] mix-blend-screen overflow-visible">
                        <path 
                            d={blobs.do} 
                            stroke={C_DO}
                            className="liquid-blob"
                            style={{
                                animation: isMixing 
                                    ? 'liquid-mixing 12s infinite linear' 
                                    : 'liquid-ripple 8s ease-out infinite',
                                willChange: 'transform' // Fix: Rasterization Hints
                            }}
                        />
                    </svg>
                )}

                {/* BE (East/Presence - Cyan) */}
                {activeBe && (
                    <svg viewBox="0 0 100 100" className="absolute w-[80vmin] h-[80vmin] mix-blend-screen overflow-visible">
                        <path 
                            d={blobs.be} 
                            stroke={C_BE}
                            className="liquid-blob"
                            style={{
                                animation: isMixing 
                                    ? 'liquid-mixing 12s infinite linear' 
                                    : 'liquid-ripple 8s ease-out infinite',
                                animationDelay: isMixing ? '0s' : '2s',
                                willChange: 'transform' // Fix: Rasterization Hints
                            }}
                        />
                    </svg>
                )}

                {/* SEE (North/Vision - Yellow) */}
                {activeSee && (
                    <svg viewBox="0 0 100 100" className="absolute w-[80vmin] h-[80vmin] mix-blend-screen overflow-visible">
                        <path 
                            d={blobs.see} 
                            stroke={C_SEE}
                            className="liquid-blob"
                            style={{
                                animation: isMixing 
                                    ? 'liquid-mixing 12s infinite linear' 
                                    : 'liquid-ripple 8s ease-out infinite',
                                animationDelay: isMixing ? '0s' : '4s',
                                willChange: 'transform' // Fix: Rasterization Hints
                            }}
                        />
                    </svg>
                )}

                {/* FEEL (South/Emotion - Purple) */}
                {activeFeel && (
                    <svg viewBox="0 0 100 100" className="absolute w-[80vmin] h-[80vmin] mix-blend-screen overflow-visible">
                        <path 
                            d={blobs.feel} 
                            stroke={C_FEEL}
                            className="liquid-blob"
                            style={{
                                animation: isMixing 
                                    ? 'liquid-mixing 12s infinite linear' 
                                    : 'liquid-ripple 8s ease-out infinite',
                                animationDelay: isMixing ? '0s' : '6s',
                                willChange: 'transform' // Fix: Rasterization Hints
                            }}
                        />
                    </svg>
                )}

                {/* Core White Impact (The Drop) - Only visible during mixing/end state for texture */}
                <div 
                    className="absolute rounded-full bg-white/20 blur-xl"
                    style={{
                        width: '10vmin', height: '10vmin',
                        animation: 'pulse 4s infinite ease-in-out',
                        opacity: 0.1
                    }}
                />
            </div>
        </div>
    );
};

export default React.memo(LiquidPulse);
