
import React from 'react';
import { Node, AttributeDefinition, UIStrings } from '../types';
import { DOMAINS_DATA } from '../constants';
import AttributeSlider from './AttributeSlider';
import NextIcon from './icons/NextIcon';
import PrevIcon from './icons/PrevIcon';
import CheckIcon from './icons/CheckIcon';
import { adjustInkColor, getAttributeColor } from '../utils/colors';
import WatercolorNode from './WatercolorNode';
import { getOrganicStyle } from '../utils/style';

interface StarDetailViewProps {
  star: Node;
  isAwakening: boolean;
  onAttributeChange: (nodeId: string, attributeId: string, value: number) => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  readOnly?: boolean;
  attributeDefinitions: Record<string, AttributeDefinition>;
  isMapComplete?: boolean;
  isLastGlobalNode?: boolean; // Kept for legacy if needed, but primary logic now uses isMapComplete
  uiStrings?: UIStrings;
}

const StarDetailView: React.FC<StarDetailViewProps> = ({ 
    star, 
    isAwakening, 
    onAttributeChange, 
    onSelectNext, 
    onSelectPrev, 
    hasNext, 
    hasPrev, 
    readOnly, 
    attributeDefinitions,
    isMapComplete,
    isLastGlobalNode,
    uiStrings
}) => {
  const starDefinition = attributeDefinitions[star.name];
  if (!starDefinition) return null;

  const isDefined = star.attributes.some(a => a.value !== null);
  
  // Calculate visual props based on attributes
  let avgValue = 0;
  const definedAttributes = star.attributes.filter(a => a.value !== null);
  if (definedAttributes.length > 0) {
      avgValue = definedAttributes.reduce((acc, a) => acc + a.value!, 0) / definedAttributes.length;
  }

  // Use Domain-Specific Ink Logic for consistency with Map
  const domainId = star.id.split('-')[0];
  const domainConfig = DOMAINS_DATA.find(d => d.id === domainId);
  const baseInkColor = domainConfig?.inkColor || '#94a3b8';
  const color = isDefined ? adjustInkColor(baseInkColor, avgValue) : '#94a3b8';

  const egoAttr = star.attributes.find(a => a.name === 'Ego')?.value ?? 0;
  const soulAttr = star.attributes.find(a => a.name === 'Soul')?.value ?? 0;
  const spiritAttr = star.attributes.find(a => a.name === 'Spirit')?.value ?? 0;
  
  // Apply the same organic visual transformation as the map view
  const organicStyle = getOrganicStyle(star.id);

  // If the map is complete (24/24), the Next button becomes a Finish button on ANY node
  // allowing the user to easily exit back to the overview.
  const showFinishIcon = isMapComplete;

  // --- SCORE LABEL LOGIC ---
  const getOverallLabel = (val: number) => {
      if (!uiStrings?.sliderLabels) return 'Undefined';
      if (val < -60) return uiStrings.sliderLabels.lacking;
      if (val < -20) return uiStrings.sliderLabels.low;
      if (val <= 20) return uiStrings.sliderLabels.balanced;
      if (val <= 60) return uiStrings.sliderLabels.high;
      return uiStrings.sliderLabels.excess;
  };
  
  const overallLabel = isDefined ? getOverallLabel(avgValue) : 'Undefined';
  const scoreColor = isDefined ? getAttributeColor(avgValue) : '#fff';

  return (
    <div className="p-6 md:p-8 text-white h-full flex flex-col" onClick={e => e.stopPropagation()}>
       <div className="flex-shrink-0">
        <div className="flex items-center gap-6 mb-4">
            {/* Large Watercolor Avatar - Explicitly pass renderVisuals=true */}
            <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                 <div style={{ 
                     filter: `hue-rotate(${organicStyle.hueShift}deg)`, 
                     transform: `rotate(${organicStyle.rotation}deg)` 
                 }}>
                    <WatercolorNode 
                        id={star.id}
                        color={color}
                        size={100}
                        roughness={egoAttr}
                        spread={soulAttr}
                        opacity={1} // Always full opacity in detail view for clarity
                        isDefined={isDefined}
                        isAwakening={isAwakening}
                        isSelected={false}
                        renderVisuals={true}
                    />
                 </div>
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-3">
                <h3 className="text-xl md:text-2xl font-bold tracking-wide">{star.name}</h3>
              </div>
              
              {/* Overall Score Indicator */}
              <div className="mt-1 flex items-center gap-2">
                  <span 
                    className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white/10 border border-white/5" 
                    style={{ color: scoreColor }}
                  >
                      {overallLabel}
                  </span>
                  {isDefined && <span className="text-xs text-white/40 font-mono">({avgValue.toFixed(0)})</span>}
              </div>
            </div>

            <div className="flex gap-1 self-stretch items-start">
                <button onClick={onSelectPrev} disabled={!hasPrev} className="p-2 rounded-full text-white/70 hover:text-white disabled:text-white/30 hover:bg-white/10 transition-all" aria-label="Previous node">
                    <PrevIcon />
                </button>
                <button onClick={onSelectNext} disabled={!hasNext && !showFinishIcon} className={`p-2 rounded-full text-white/70 hover:text-white disabled:text-white/30 hover:bg-white/10 transition-all ${showFinishIcon ? 'text-amber-400 hover:text-amber-200' : ''}`} aria-label="Next node">
                    {showFinishIcon ? <CheckIcon /> : <NextIcon />}
                </button>
            </div>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed font-light italic">{starDefinition.description}</p>
        
      </div>

      <div className="my-6 border-t border-white/10 flex-shrink-0" />
      
      <div className="flex-grow overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          {star.attributes.map(attr => {
              const lens = attr.name.toLowerCase() as 'ego' | 'soul' | 'spirit';
              const prompt = starDefinition.prompt[lens];
              return (
                <div key={attr.id} className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <AttributeSlider
                    starName={star.name}
                    attribute={attr}
                    prompt={prompt}
                    onChange={value => onAttributeChange(star.id, attr.id, value)}
                    readOnly={readOnly}
                    attributeDefinitions={attributeDefinitions}
                    sliderLabels={uiStrings?.sliderLabels}
                  />
                </div>
              )
          })}
      </div>
    </div>
  );
};

export default StarDetailView;
