
import React from 'react';

interface LensSpectrumProps {
  opacity: number;
  value?: number; // -100 to 100, if provided, a thumb is rendered
}

const mapValueToRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

const LensSpectrum: React.FC<LensSpectrumProps> = ({ opacity, value = 0 }) => {
  const thumbLeft = mapValueToRange(value, -100, 100, 0, 100);

  return (
    <div 
        className="absolute top-[65%] left-1/2 -translate-x-1/2 w-64 transition-opacity duration-1000 flex flex-col items-center gap-2"
        style={{ opacity }}
    >
        {/* Spectrum Bar */}
        <div className="relative w-full h-2 rounded-full bg-slate-800/50 border border-white/10 overflow-visible backdrop-blur-md">
            {/* Lacking Zone (Indigo) */}
            <div className="absolute left-0 top-0 bottom-0 w-[30%] bg-gradient-to-r from-indigo-900 to-indigo-500/50 rounded-l-full overflow-hidden" />
            
            {/* Balanced Zone (Gold - Center) */}
            <div className="absolute left-[30%] top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
            
            {/* Excess Zone (Red) */}
            <div className="absolute right-0 top-0 bottom-0 w-[30%] bg-gradient-to-l from-red-900 to-red-500/50 rounded-r-full overflow-hidden" />
            
            {/* Center Marker */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber-400 box-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />

            {/* Moving Thumb Indicator */}
            <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 ease-out z-20"
                style={{ 
                    left: `${thumbLeft}%`, 
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: value > 20 ? '#ef4444' : value < -20 ? '#6366f1' : '#f59e0b'
                }}
            />
        </div>

        {/* Labels */}
        <div className="w-full flex justify-between text-[9px] uppercase tracking-widest text-slate-400 font-medium">
            <span className="text-indigo-400">Lacking</span>
            <span className="text-amber-300">Balanced</span>
            <span className="text-red-400">Excess</span>
        </div>
    </div>
  );
};

export default LensSpectrum;
