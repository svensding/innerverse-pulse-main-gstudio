
import React from 'react';
import { Domain, UIStrings } from '../types';

interface OnboardingSeedsProps {
  onboardingStep: number;
  domains: Domain[];
  uiStrings: UIStrings;
}

const OnboardingSeeds: React.FC<OnboardingSeedsProps> = ({ onboardingStep, domains, uiStrings }) => {
  
  const SEED_MAPPING: Record<string, string> = {
      // Realm 1 (D1)
      direction: 'd1-n1',
      rhythm: 'd1-n5',
      focus: 'd1-n3',
      
      // Realm 2 (D3)
      reception: 'd3-n3',
      empathy: 'd3-n2',
      exchange: 'd3-n1',
      
      // Realm 3 (D4)
      sensation: 'd4-n1',
      grounding: 'd4-n3',
      alchemy: 'd4-n2',
      
      // Realm 4 (D2)
      spark: 'd2-n4',
      ascent: 'd2-n1',
      quest: 'd2-n5',
  };

  // Determine active realm based on step (Showing seeds on the SECOND step of each domain description)
  let activeSeedKeys: string[] = [];
  let ambientColor = '';
  let showAmbients = false;
  let showAll = false;

  // D1 Part 2 (Step 12)
  if (onboardingStep === 12) {
      activeSeedKeys = ['direction', 'rhythm', 'focus'];
      ambientColor = domains.find(d => d.id === 'd1')?.inkColor || '#fff';
      showAmbients = true;
  }
  // D3 Part 2 (Step 14)
  else if (onboardingStep === 14) {
      activeSeedKeys = ['reception', 'empathy', 'exchange'];
      ambientColor = domains.find(d => d.id === 'd3')?.inkColor || '#fff';
      showAmbients = true;
  }
  // D4 Part 2 (Step 16)
  else if (onboardingStep === 16) {
      activeSeedKeys = ['sensation', 'grounding', 'alchemy'];
      ambientColor = domains.find(d => d.id === 'd4')?.inkColor || '#fff';
      showAmbients = true;
  }
  // D2 Part 2 (Step 18)
  else if (onboardingStep === 18) {
      activeSeedKeys = ['spark', 'ascent', 'quest'];
      ambientColor = domains.find(d => d.id === 'd2')?.inkColor || '#fff';
      showAmbients = true;
  }
  // Pause Step - Show ALL (Step 19)
  else if (onboardingStep === 19) {
      showAll = true;
      showAmbients = true;
      // Use a neutral or combined color for 'all' mode
      ambientColor = '#e2e8f0'; 
  }

  // Helper to find position
  const getSeedPosition = (nodeId: string) => {
      for (const d of domains) {
          const n = d.nodes.find(node => node.id === nodeId);
          if (n) {
              let offsetX = 0;
              let offsetY = 0;
              
              if (d.id === 'd1') { offsetX = 0; offsetY = 0; }
              else if (d.id === 'd3') { offsetX = 50; offsetY = 0; }
              else if (d.id === 'd2') { offsetX = 0; offsetY = 50; }
              else if (d.id === 'd4') { offsetX = 50; offsetY = 50; }
              
              return {
                  left: `${offsetX + (n.position.x / 2)}%`,
                  top: `${offsetY + (n.position.y / 2)}%`
              };
          }
      }
      return { left: '50%', top: '50%' };
  };

  const renderAmbients = () => {
      if (!showAmbients) return null;
      
      const spots = [];
      const seed = onboardingStep * 13; 
      const count = 12; // Texture amount
      
      let offsetX = 0; let offsetY = 0;
      
      // Coordinate logic for ambient dust
      if (onboardingStep === 12) { offsetX = 0; offsetY = 0; } // D1
      else if (onboardingStep === 14) { offsetX = 50; offsetY = 0; } // D3
      else if (onboardingStep === 16) { offsetX = 50; offsetY = 50; } // D4
      else if (onboardingStep === 18) { offsetX = 0; offsetY = 50; } // D2
      
      if (showAll) {
          // If showing all, scatter across entire map (simulated)
          // We render 4 batches
          return (
              <>
               {renderAmbientBatch(0, 0, seed, count, ambientColor)}
               {renderAmbientBatch(50, 0, seed + 100, count, ambientColor)}
               {renderAmbientBatch(0, 50, seed + 200, count, ambientColor)}
               {renderAmbientBatch(50, 50, seed + 300, count, ambientColor)}
              </>
          )
      }

      return renderAmbientBatch(offsetX, offsetY, seed, count, ambientColor);
  };

  const renderAmbientBatch = (offX: number, offY: number, seed: number, count: number, color: string) => {
      const spots = [];
      for(let i=0; i<count; i++) {
          const r1 = Math.sin(seed + i * 432.1);
          const r2 = Math.cos(seed + i * 123.4);
          
          const localX = 10 + Math.abs(r1 * 80);
          const localY = 10 + Math.abs(r2 * 80);
          
          const globalLeft = offX + (localX / 2);
          const globalTop = offY + (localY / 2);
          
          const delay = Math.abs(r1) * 2;
          const duration = 3 + Math.abs(r2) * 3;

          spots.push(
              <div 
                key={`amb-${offX}-${offY}-${i}`}
                className="absolute rounded-full animate-pulse"
                style={{
                    left: `${globalLeft}%`,
                    top: `${globalTop}%`,
                    width: '3px',
                    height: '3px',
                    backgroundColor: color,
                    opacity: 0.2,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                    filter: 'blur(1px)'
                }}
              />
          )
      }
      return spots;
  }

  const keysRender = showAll ? Object.keys(SEED_MAPPING) : activeSeedKeys;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-1000">
        {renderAmbients()}
        
        {keysRender.map((key, i) => {
            const nodeId = SEED_MAPPING[key];
            const pos = getSeedPosition(nodeId);
            const label = uiStrings.onboardingSeeds[key as keyof typeof uiStrings.onboardingSeeds];
            
            // If showing all, use generic white, otherwise domain color
            const displayColor = showAll ? '#e2e8f0' : ambientColor;

            return (
                <div 
                    key={key}
                    className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 animate-fade-in"
                    style={{ 
                        left: pos.left, 
                        top: pos.top,
                        animationDelay: `${i * 100}ms`
                    }}
                >
                    {/* Glowing Seed Dot */}
                    <div className="relative mb-2">
                        <div 
                            className="absolute inset-0 rounded-full animate-ping" 
                            style={{ 
                                backgroundColor: displayColor, 
                                width: '6px', 
                                height: '6px', 
                                opacity: 0.4,
                                animationDuration: '3s'
                            }} 
                        />
                        <div 
                            className="relative rounded-full" 
                            style={{ 
                                backgroundColor: 'rgba(255,255,255,0.6)', 
                                width: '6px', 
                                height: '6px',
                                boxShadow: `0 0 8px ${displayColor}` 
                            }} 
                        />
                    </div>
                    
                    <span 
                        className="text-[9px] uppercase tracking-widest font-medium text-white/60 whitespace-nowrap mix-blend-plus-lighter transition-opacity duration-1000"
                    >
                        {label}
                    </span>
                </div>
            );
        })}
    </div>
  );
};

export default OnboardingSeeds;
