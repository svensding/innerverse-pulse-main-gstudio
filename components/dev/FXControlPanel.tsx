
import React from 'react';
import { usePerformance } from '../../contexts/PerformanceContext';
import CloseIcon from '../icons/CloseIcon';

interface FXControlPanelProps {
  onClose: () => void;
}

const Toggle: React.FC<{ label: string; value: boolean; onChange: (v: boolean) => void }> = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between py-2 border-b border-white/5">
        <span className="text-sm text-slate-300">{label}</span>
        <button 
            onClick={() => onChange(!value)}
            className={`w-10 h-5 rounded-full relative transition-colors ${value ? 'bg-amber-500' : 'bg-slate-700'}`}
        >
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${value ? 'left-6' : 'left-1'}`} />
        </button>
    </div>
);

const Slider: React.FC<{ label: string; value: number; min: number; max: number; onChange: (v: number) => void }> = ({ label, value, min, max, onChange }) => (
    <div className="py-3 border-b border-white/5">
        <div className="flex justify-between mb-1">
            <span className="text-sm text-slate-300">{label}</span>
            <span className="text-xs text-amber-400 font-mono">{value}</span>
        </div>
        <input 
            type="range" min={min} max={max} step={1} value={value} 
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
    </div>
);

const FXControlPanel: React.FC<FXControlPanelProps> = ({ onClose }) => {
  const { settings, updateSetting, resetToHigh, setToLite } = usePerformance();

  return (
    // Changed: Positioned absolute top-right instead of centered modal
    <div className="fixed top-24 right-4 z-[100] w-72 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-fade-in-up">
            
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-slate-950/80 border-b border-white/10 cursor-move">
            <h3 className="text-white font-bold tracking-wide flex items-center gap-2 text-xs uppercase">
                <span className="text-amber-400">⚡</span> FX Tuner
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white scale-75"><CloseIcon /></button>
        </div>

        {/* Controls */}
        <div className="p-4 overflow-y-auto space-y-2 custom-scrollbar">
            
            {/* Presets */}
            <div className="flex gap-2 mb-6">
                <button onClick={resetToHigh} className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider rounded border border-white/10">
                    Max Quality
                </button>
                <button onClick={setToLite} className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded border border-white/10">
                    Lite Mode
                </button>
            </div>

            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-2">Rendering (GPU)</div>
            <Toggle label="Glass Blur" value={settings.glass} onChange={(v) => updateSetting('glass', v)} />
            <Toggle label="Mix Blending" value={settings.blending} onChange={(v) => updateSetting('blending', v)} />
            <Toggle label="SVG Distortion" value={settings.distortion} onChange={(v) => updateSetting('distortion', v)} />
            <Slider label="Glow Quality" value={settings.glow} min={0} max={3} onChange={(v) => updateSetting('glow', v)} />
            
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-4">Motion (CPU)</div>
            <Toggle label="Ambient Animation" value={settings.animations} onChange={(v) => updateSetting('animations', v)} />
            <Toggle label="Mouse Parallax" value={settings.parallax} onChange={(v) => updateSetting('parallax', v)} />
            
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-4">Complexity</div>
            <Slider label="Noise Octaves" value={settings.octaves} min={1} max={5} onChange={(v) => updateSetting('octaves', v)} />
            <Toggle label="Particles" value={settings.particles} onChange={(v) => updateSetting('particles', v)} />

        </div>
    </div>
  );
};

export default FXControlPanel;
