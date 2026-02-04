
import React, { useState, useEffect, useRef } from 'react';
import { UIStrings, Language, OnboardingStep } from '../types';
import SkipIcon from './icons/SkipIcon';

interface OnboardingProps {
  onComplete: () => void;
  onStepChange: (step: number) => void;
  steps: OnboardingStep[];
  uiStrings: UIStrings;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  toggleWakeLock: () => void;
  isWakeLockActive: boolean;
}

const CountdownCircle: React.FC<{ progress: number, size?: number }> = ({ progress, size = 56 }) => {
    const strokeWidth = 3;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size} className="absolute inset-0 rotate-[-90deg]">
            <circle
                stroke="rgba(255,255,255,0.1)"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                stroke="#fcd34d"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                className="transition-all duration-150 ease-linear"
            />
        </svg>
    );
};

const Onboarding: React.FC<OnboardingProps> = ({ 
    onComplete, 
    onStepChange, 
    steps, 
    uiStrings, 
    language, 
    onLanguageChange,
    toggleWakeLock, 
    isWakeLockActive 
}) => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fading, setFading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); 
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  
  // Interactive / Pause Logic
  const [isPaused, setIsPaused] = useState(false);
  const [countdownProgress, setCountdownProgress] = useState(100);
  const countdownRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const interactionOccurredRef = useRef(false);

  // --- Interaction Detection ---
  useEffect(() => {
      const handleUserInteraction = () => {
          if (!isPaused) return;
          interactionOccurredRef.current = true;
          // Reset countdown if user interacts
          setCountdownProgress(100); 
          
          // Clear any existing idle timer
          if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
          
          // Start 5s idle timer -> Trigger countdown resuming
          idleTimerRef.current = window.setTimeout(() => {
              interactionOccurredRef.current = false;
          }, 5000);
      };

      if (isPaused) {
          window.addEventListener('mousemove', handleUserInteraction);
          window.addEventListener('touchstart', handleUserInteraction);
          window.addEventListener('wheel', handleUserInteraction);
          // Start initial idle check
          handleUserInteraction();
      }

      return () => {
          window.removeEventListener('mousemove', handleUserInteraction);
          window.removeEventListener('touchstart', handleUserInteraction);
          window.removeEventListener('wheel', handleUserInteraction);
          if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      };
  }, [isPaused]);

  // --- Countdown Logic ---
  useEffect(() => {
      if (isPaused) {
           if (!countdownRef.current) {
               const tickInterval = 150; 
               const decrementPerTick = 100 / (15000 / tickInterval);
               
               countdownRef.current = window.setInterval(() => {
                   if (!interactionOccurredRef.current) {
                       setCountdownProgress(prev => {
                           if (prev <= 0) return 0;
                           return prev - decrementPerTick;
                       });
                   } else {
                       setCountdownProgress(100);
                   }
               }, tickInterval);
           }
      } else {
          if (countdownRef.current) {
              window.clearInterval(countdownRef.current);
              countdownRef.current = null;
          }
          setCountdownProgress(100);
      }
      return () => {
          if (countdownRef.current) window.clearInterval(countdownRef.current);
      };
  }, [isPaused]);

  // --- Auto-Advance on Countdown Zero ---
  useEffect(() => {
      if (isPaused && countdownProgress <= 0) {
          handleNext();
      }
  }, [countdownProgress, isPaused]);


  // --- Step & Play Logic ---
  useEffect(() => {
    onStepChange(step);
    
    // Text fade-in effect
    setFading(true);
    const textTimer = window.setTimeout(() => {
        setFading(false);
    }, 500);

    const currentStepData = steps[step];
    
    // Check if this step requires a pause
    if (currentStepData?.isInteractive) {
        setIsPlaying(false);
        setIsPaused(true);
        setCountdownProgress(100);
        return () => window.clearTimeout(textTimer); 
    } else {
        setIsPaused(false);
    }

    if (!isPlaying) {
        return () => window.clearTimeout(textTimer);
    }

    // Auto-advance logic for non-interactive steps
    let baseDuration = 6000;
    
    if (step >= 27 && step <= 29) {
        baseDuration = 14000; 
    }

    const adjustedDuration = baseDuration / playbackSpeed;
    const duration = step === 0 ? 999999 : adjustedDuration; 

    const advanceTimer = window.setTimeout(() => {
        if (step < steps.length - 1) {
            setStep(s => s + 1);
        } else {
            setIsPlaying(false);
        }
    }, duration);

    return () => {
        window.clearTimeout(textTimer);
        window.clearTimeout(advanceTimer);
    };
  }, [step, isPlaying, onStepChange, steps, playbackSpeed]);

  const handleBegin = () => {
      setHasStarted(true);
      setIsPlaying(true);
      setStep(1); 
  };

  const handleNext = () => {
    setIsPlaying(false);
    setIsPaused(false);
    interactionOccurredRef.current = false;
    
    if (step < steps.length - 1) {
      setStep(s => s + 1);
      const nextStep = steps[step+1];
      if (!nextStep.isInteractive) setIsPlaying(true);
    } else {
        onComplete();
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCountdownProgress(100);
    if (step > 0) {
      setStep(s => s - 1);
    }
  };
  
  const handleJumpToChapter = (targetChapter: number) => {
      const targetStep = steps.findIndex(s => s.chapter === targetChapter);
      if (targetStep !== -1) {
          setIsPlaying(false);
          setIsPaused(false);
          setStep(targetStep);
      }
  };

  const selectSpeed = (speed: number) => {
      setPlaybackSpeed(speed);
      setShowSpeedMenu(false);
  };

  const isFinalStep = step === steps.length - 1;
  const glassStyle = "bg-black/40 backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/10 transition-all";

  const rawText = steps[step]?.text || "";
  const parts = rawText.split('<br/>');

  const heavyShadowStyle = {
      textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5), 0 2px 2px rgba(0,0,0,1)'
  };

  const renderTextParts = () => {
      return (
          <div 
            className="flex flex-col gap-2 md:gap-4 text-center transition-opacity duration-500"
            style={{ opacity: fading ? 0 : 1 }}
          >
              {parts.map((part, index) => {
                  const isPrimary = part.includes('<strong>');
                  return (
                      <p 
                        key={index}
                        className={`font-light leading-relaxed drop-shadow-2xl ${isPrimary ? 'text-lg md:text-3xl text-white/95' : 'text-sm md:text-xl text-slate-200 italic'}`}
                        style={{ ...heavyShadowStyle, color: 'white' }} // Explicit white color fallback
                        dangerouslySetInnerHTML={{ __html: part }} 
                      />
                  );
              })}
          </div>
      )
  };

  const chapters = Array.from<number>(new Set(steps.map(s => s.chapter ?? 0))).sort((a, b) => a - b);
  const currentChapter = steps[step]?.chapter ?? 0;

  const chapterTitles: Record<number, string> = {
      1: "Intro",
      2: "Energies",
      3: "Realms",
      4: "Expressions",
      5: "Lenses",
      6: "Explore"
  };

  return (
    <div 
      className="fixed top-0 left-0 w-full z-[100] pointer-events-none flex flex-col justify-end items-center pb-20 md:pb-40 px-6 text-white"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 'var(--app-height, 100vh)', zIndex: 100, color: 'white', transform: 'translate3d(0,0,0)' }} // Inline positioning fallback
    >
      
      {/* START SCREEN */}
      {!hasStarted && step === 0 && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto bg-slate-950/80 backdrop-blur-sm z-[101]"
            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(2, 6, 23, 0.9)', zIndex: 101 }} // Inline fallback
          >
             <div className="w-full max-w-2xl px-6 flex flex-col items-center gap-12 animate-fade-in">
                {renderTextParts()}
                <div className="flex flex-col items-center gap-6">
                     <div className="flex gap-4 items-center">
                         <button 
                              onClick={handleBegin}
                              className={`px-10 py-4 rounded-full text-white/90 text-sm ${glassStyle}`}
                              style={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '16px 40px', borderRadius: '9999px', backgroundColor: 'rgba(0,0,0,0.4)' }}
                          >
                              {uiStrings.begin}
                          </button>
                          <button 
                              onClick={onComplete}
                              className="px-6 py-4 rounded-full text-white/40 hover:text-white transition-all text-xs"
                              style={{ color: '#94a3b8', padding: '16px 24px', borderRadius: '9999px' }}
                          >
                              {uiStrings.skip}
                          </button>
                     </div>
                     
                     <div className={`flex rounded-full overflow-hidden p-1 gap-1 ${glassStyle}`}>
                         <button 
                            onClick={() => onLanguageChange('en')}
                            className={`px-4 py-2 text-xs rounded-full transition-colors ${language === 'en' ? 'bg-white/20 text-white font-medium' : 'text-white/50 hover:text-white'}`}
                         >
                            en
                         </button>
                         <button 
                            onClick={() => onLanguageChange('es')}
                            className={`px-4 py-2 text-xs rounded-full transition-colors ${language === 'es' ? 'bg-white/20 text-white font-medium' : 'text-white/50 hover:text-white'}`}
                         >
                            es
                         </button>
                         <button 
                            onClick={() => onLanguageChange('nl')}
                            className={`px-4 py-2 text-xs rounded-full transition-colors ${language === 'nl' ? 'bg-white/20 text-white font-medium' : 'text-white/50 hover:text-white'}`}
                         >
                            nl
                         </button>
                     </div>

                     <label className="flex items-center gap-2 cursor-pointer mt-2 text-white/60 hover:text-white/90 transition-colors text-xs">
                        <input 
                            type="checkbox" 
                            checked={isWakeLockActive} 
                            onChange={toggleWakeLock} 
                            className="accent-amber-400"
                        />
                        {uiStrings.keepAwake}
                     </label>
                </div>
             </div>
          </div>
      )}

      {/* ONBOARDING FLOW */}
      {hasStarted && (
          <div className="w-full max-w-xl flex flex-col items-center gap-6 pointer-events-auto animate-fade-in mb-8 md:mb-0">
             
             {/* TEXT */}
             <div className="min-h-[120px] flex items-end justify-center mb-4 md:mb-0">
                {renderTextParts()}
             </div>

             {/* FINAL EXPLORE */}
             {isFinalStep ? (
                  <div className="flex gap-4 items-center mt-4">
                      <button onClick={handlePrev} className={`w-12 h-12 flex items-center justify-center rounded-full text-white/50 hover:text-white ${glassStyle}`} aria-label="Previous step">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                      </button>
                      <button 
                          onClick={onComplete}
                          className={`px-10 py-4 rounded-full text-amber-100 text-sm ${glassStyle} border-amber-500/30 animate-pulse`}
                          style={{ color: '#fef3c7', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '16px 40px', borderRadius: '9999px', backgroundColor: 'rgba(0,0,0,0.4)' }}
                      >
                          {uiStrings.explore}
                      </button>
                  </div>
             ) : (
                 <div className="flex flex-col items-center gap-6 opacity-80 hover:opacity-100 transition-opacity duration-500">
                     {/* CHAPTER DOTS */}
                     <div className="flex gap-3 items-center">
                         {chapters.map((c) => {
                             const isActive = c === currentChapter;
                             const isPast = c < currentChapter;
                             let dotClass = "bg-white/10 scale-75"; 
                             if (isActive) dotClass = "bg-amber-200 scale-100 shadow-[0_0_8px_rgba(251,191,36,0.5)]";
                             else if (isPast) dotClass = "bg-white/30 scale-90";
                             return (
                                <button 
                                    key={c} 
                                    onClick={() => handleJumpToChapter(c)}
                                    className={`w-2 h-2 rounded-full transition-all duration-500 ${dotClass}`} 
                                    aria-label={`Go to chapter ${c}`}
                                    title={chapterTitles[c] || `Chapter ${c}`} 
                                />
                             );
                         })}
                     </div>

                     {/* CONTROLS */}
                     <div className={`flex items-center justify-center gap-1 rounded-full p-1 relative ${glassStyle}`}>
                        
                        {isPaused && (
                            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/80 backdrop-blur-md rounded-full animate-fade-in">
                                <div className="relative flex items-center justify-center w-full h-full">
                                    <CountdownCircle progress={countdownProgress} size={50} />
                                    <button 
                                        onClick={handleNext}
                                        className="px-6 py-2 bg-transparent text-amber-200 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                                    >
                                        {uiStrings.continue}
                                    </button>
                                </div>
                            </div>
                        )}

                        <button onClick={handlePrev} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        </button>
                        
                        <div className="w-px h-4 bg-white/10 mx-1"></div>

                        <button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors">
                            {isPlaying ? (
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5V19M16 5V19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            ) : (
                                <svg className="w-6 h-6 ml-0.5 fill-current" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z" /></svg>
                            )}
                        </button>

                        <div className="w-px h-4 bg-white/10 mx-1"></div>

                        <button onClick={handleNext} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </button>
                        
                        <div className="w-px h-4 bg-white/10 mx-1"></div>

                        <div className="relative">
                            {showSpeedMenu && (
                                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-12 py-1 rounded-lg flex flex-col items-center gap-1 ${glassStyle} animate-fade-in`}>
                                    {[2, 1.5, 1, 0.5].map(s => (
                                        <button 
                                            key={s} 
                                            onClick={() => selectSpeed(s)}
                                            className={`w-full py-1 text-[9px] font-bold hover:bg-white/10 ${playbackSpeed === s ? 'text-amber-300' : 'text-white/60'}`}
                                        >
                                            {s}x
                                        </button>
                                    ))}
                                </div>
                            )}
                            <button 
                                onClick={() => setShowSpeedMenu(!showSpeedMenu)} 
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors text-[10px] font-bold" 
                            >
                                {playbackSpeed}x
                            </button>
                        </div>

                        <div className="w-px h-4 bg-white/10 mx-1"></div>

                         <button onClick={onComplete} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors">
                            <div className="w-5 h-5"><SkipIcon /></div>
                        </button>
                     </div>
                 </div>
             )}
          </div>
      )}
    </div>
  );
};

export default Onboarding;
