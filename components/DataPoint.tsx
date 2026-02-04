
import React from 'react';
import { AnalysisData, PersonalSpectrum } from '../types';
import { getAttributeColor } from '../utils/colors';
import StarGlyph from './StarGlyph';

interface DataPointProps {
  title: string;
  subTitle: string;
  data: AnalysisData;
  personalSpectrum: PersonalSpectrum;
  isExpandable?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  starGlyphs?: { name: string, equilibrium: number }[];
  lensEquilibriums?: { ego: number, soul: number, spirit: number };
}

const mapValueToRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
  if (inMin === inMax) return (outMin + outMax) / 2;
  const mapped = ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  return Math.max(outMin, Math.min(outMax, mapped));
};

const ChevronIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const DataPoint: React.FC<DataPointProps> = ({ title, subTitle, data, personalSpectrum, isExpandable = false, isExpanded = false, onToggleExpand, starGlyphs, lensEquilibriums }) => {
  const { equilibrium, flux } = data;

  const dotPosition = mapValueToRange(equilibrium, -100, 100, 0, 100);
  const dotColor = getAttributeColor(equilibrium);
  
  const auraSize = mapValueToRange(flux, 0, 70, 10, 50);
  const auraOpacity = mapValueToRange(flux, 0, 70, 0.1, 0.6);

  const minMarkerPos = mapValueToRange(personalSpectrum.min, -100, 100, 0, 100);
  const maxMarkerPos = mapValueToRange(personalSpectrum.max, -100, 100, 0, 100);

  return (
    <div className="bg-white/5 p-4 rounded-xl border border-white/10 transition-all duration-300">
      <button
        className="flex justify-between items-start w-full text-left disabled:cursor-default group"
        onClick={onToggleExpand}
        disabled={!isExpandable}
        aria-expanded={isExpanded}
      >
        <div className="flex-grow pr-4">
            <h3 className="font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">{title}</h3>
            <p className="text-sm text-slate-400 line-clamp-2">{subTitle}</p>
        </div>
        {isExpandable && <ChevronIcon className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 mt-1 ${isExpanded ? 'rotate-180' : ''}`} />}
      </button>
      <div className="relative h-10 w-full mt-3 flex items-center" title={`Equilibrium: ${equilibrium.toFixed(1)}, Flux: ${flux.toFixed(1)}`}>
        {/* Track with markers */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-black/30 rounded-full">
          <div className="absolute top-0 h-full w-px bg-white/20" style={{ left: `${minMarkerPos}%` }} title={`Your Minimum: ${personalSpectrum.min.toFixed(0)}`}></div>
          <div className="absolute top-0 h-full w-px bg-white/20" style={{ left: `${maxMarkerPos}%` }} title={`Your Maximum: ${personalSpectrum.max.toFixed(0)}`}></div>
        </div>

        {/* Lens Indicators (Updated to Ego/Soul/Spirit) */}
        {lensEquilibriums && (
          <>
            <div className="absolute top-0 w-px h-full bg-slate-400" style={{ left: `${mapValueToRange(lensEquilibriums.ego, -100, 100, 0, 100)}%`}} title={`Ego: ${lensEquilibriums.ego.toFixed(1)}`}></div>
            <div className="absolute top-0 w-px h-full bg-slate-400 border-x-[0.5px] border-dashed border-slate-500" style={{ left: `${mapValueToRange(lensEquilibriums.soul, -100, 100, 0, 100)}%`}} title={`Soul: ${lensEquilibriums.soul.toFixed(1)}`}></div>
            <div className="absolute top-0 w-px h-full bg-slate-400 opacity-50" style={{ left: `${mapValueToRange(lensEquilibriums.spirit, -100, 100, 0, 100)}%`}} title={`Spirit: ${lensEquilibriums.spirit.toFixed(1)}`}></div>
          </>
        )}

        {/* Star Glyphs */}
        {starGlyphs && starGlyphs.map(glyph => (
            <div key={glyph.name} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${mapValueToRange(glyph.equilibrium, -100, 100, 0, 100)}%`}} title={`${glyph.name}: ${glyph.equilibrium.toFixed(1)}`}>
                <StarGlyph starName={glyph.name} className="w-2.5 h-2.5 text-white/40" />
            </div>
        ))}

        {/* Center line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-amber-400/30"></div>
        
        {/* Data Point and Aura */}
        <div className="absolute top-1/2 -translate-y-1/2 h-8 w-full flex items-center">
            <div
              className="absolute top-1/2 -translate-y-1/2 rounded-full bg-amber-300 transition-all duration-500"
              style={{
                width: `${auraSize}px`,
                height: `${auraSize}px`,
                left: `${dotPosition}%`,
                transform: 'translateX(-50%)',
                filter: `blur(${auraSize / 2.5}px)`,
                opacity: auraOpacity,
              }}
            />
             <div
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-white/80"
                style={{
                  left: `${dotPosition}%`,
                  transform: 'translateX(-50%)',
                  backgroundColor: dotColor,
                  transition: 'left 500ms ease-out',
                  /* PERFORMANCE FIX: Removed filter: 'url(#ink-flow)' */
                }}
            />
        </div>
      </div>
    </div>
  );
};

export default DataPoint;
