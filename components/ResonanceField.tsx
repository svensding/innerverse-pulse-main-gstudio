
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Domain, MandalaData, UIStrings, Node, AttributeDefinition } from '../types';
import { calculateAllNodeAverages, calculateLensDataByDomain, calculatePrimaryEnergyData } from '../utils/cosmosAnalysis';
import CloseIcon from './icons/CloseIcon';
import PulseLogo from './icons/PulseLogo';
import StarDetailView from './StarDetailView';

interface ResonanceFieldProps {
  domains: Domain[];
  mandalaData: MandalaData;
  onClose: () => void;
  uiStrings: UIStrings;
  attributeDefinitions: Record<string, AttributeDefinition>;
}

// The 8 Cardinal Points of the Pulse System
const ANCHORS = [
    { id: 'seeing',  type: 'energy', x: 50, y: 15, color: '#fbbf24' }, // North
    { id: 'd3',      type: 'domain', x: 80, y: 25, color: '#10b981' }, // NE - Emerald Green
    { id: 'being',   type: 'energy', x: 90, y: 50, color: '#06b6d4' }, // East
    { id: 'd4',      type: 'domain', x: 80, y: 75, color: '#4338ca' }, // SE
    { id: 'feeling', type: 'energy', x: 50, y: 90, color: '#9333ea' }, // South
    { id: 'd2',      type: 'domain', x: 20, y: 75, color: '#e11d48' }, // SW
    { id: 'doing',   type: 'energy', x: 10, y: 50, color: '#f43f5e' }, // West
    { id: 'd1',      type: 'domain', x: 20, y: 25, color: '#ea580c' }, // NW
];

const STAGES = [
    { id: 0, text: "Your expressions are unique points of light.", duration: 4000 },
    { id: 1, text: "They gather into realms of experience.", duration: 4000 },
    { id: 2, text: "Held by the primary forces of your nature.", duration: 4000 },
    { id: 3, text: "Together, they form your resonance.", duration: 0 } // Interactive
];

// Strict mapping to ensure exactly 6 nodes per Energy Axis
const NODE_AXIS_MAPPING: Record<string, string> = {
    // DOING (West)
    'd1-n1': 'doing', 'd1-n4': 'doing', 'd1-n6': 'doing',
    'd2-n1': 'doing', 'd2-n3': 'doing', 'd2-n4': 'doing',
    
    // SEEING (North)
    'd1-n2': 'seeing', 'd1-n3': 'seeing', 'd1-n5': 'seeing',
    'd3-n1': 'seeing', 'd3-n2': 'seeing', 'd3-n3': 'seeing',

    // BEING (East)
    'd3-n4': 'being', 'd3-n5': 'being', 'd3-n6': 'being',
    'd4-n2': 'being', 'd4-n3': 'being', 'd4-n4': 'being',

    // FEELING (South)
    'd2-n2': 'feeling', 'd2-n5': 'feeling', 'd2-n6': 'feeling',
    'd4-n1': 'feeling', 'd4-n5': 'feeling', 'd4-n6': 'feeling'
};

const LENS_LABELS: Record<string, string> = {
    ego: 'form',
    soul: 'essence',
    spirit: 'resonance'
};

const ResonanceField: React.FC<ResonanceFieldProps> = ({ domains, mandalaData, onClose, uiStrings, attributeDefinitions }) => {
    const [stage, setStage] = useState(0);
    const [textOpacity, setTextOpacity] = useState(0);
    
    // Toggles state
    const [activeLayers, setActiveLayers] = useState({ 
        overall: true, 
        ego: false, 
        soul: false, 
        spirit: false 
    });

    // Global Dashboard View State
    const [dashboardTab, setDashboardTab] = useState<'energies' | 'lenses'>('energies');

    const [hoveredAnchor, setHoveredAnchor] = useState<string | null>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    
    // Unified selection state: can be a Node OR an Anchor (Energy/Domain)
    const [selection, setSelection] = useState<{ type: 'node' | 'anchor', id: string } | null>(null);
    
    // Accordion state for the detail view
    const [expandedAccordionNodes, setExpandedAccordionNodes] = useState<Record<string, boolean>>({});

    const handleAccordionToggle = (nodeId: string) => {
        setExpandedAccordionNodes(prev => ({...prev, [nodeId]: !prev[nodeId]}));
    };

    // Tooltip persistence logic
    const closeTimeoutRef = useRef<number | null>(null);

    const handleAnchorEnter = (id: string) => {
        if (closeTimeoutRef.current) {
            window.clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setHoveredAnchor(id);
    };

    const handleAnchorLeave = () => {
        closeTimeoutRef.current = window.setTimeout(() => {
            setHoveredAnchor(null);
        }, 300); 
    };

    // --- DATA PREP ---
    const allNodes = useMemo(() => domains.flatMap(d => d.nodes), [domains]);
    
    const getFormattedNodeScore = (node: Node) => {
        const defined = node.attributes.filter(a => a.value !== null);
        if (defined.length === 0) return null;
        return defined.reduce((a, b) => a + b.value!, 0) / defined.length;
    };

    const getScoreLabel = (score: number | null) => {
        if (score === null) return "undefined";
        if (score <= -61) return "dormant";
        if (score <= -21) return "receding";
        if (score <= 20) return "balanced flow";
        if (score <= 60) return "intense";
        return "abundant";
    };

    // Fix for visibility on black backgrounds
    const getSafeColor = (val: number | null) => {
        if (val === null) return '#94a3b8'; // Slate 400
        if (val < -20) return '#818cf8'; // Indigo 400 (Visible Lacking)
        if (val <= 20) return '#fbbf24'; // Amber 400 (Balanced)
        return '#f87171'; // Red 400 (Excess)
    };

    // Helper: Map quadrant-local coordinates to global map
    const getGlobalNodePosition = (node: Node, scoreOverride?: number | null) => {
        const domainId = node.id.split('-')[0];
        const localX = node.position.x;
        const localY = node.position.y;
        
        let anchorX = 50;
        let anchorY = 50;

        if (domainId === 'd1') { anchorX = 20; anchorY = 25; }      // NW
        else if (domainId === 'd3') { anchorX = 80; anchorY = 25; } // NE
        else if (domainId === 'd2') { anchorX = 20; anchorY = 75; } // SW
        else if (domainId === 'd4') { anchorX = 80; anchorY = 75; } // SE

        const scaleFactor = 0.4; 
        const idealGlobalX = anchorX + (localX - 50) * scaleFactor;
        const idealGlobalY = anchorY + (localY - 50) * scaleFactor;

        const score = scoreOverride !== undefined ? scoreOverride : getFormattedNodeScore(node);
        
        let distortion = 1.0;
        if (score !== null) {
            distortion = 1.0 + (score / 160); 
        }

        let vecX = idealGlobalX - anchorX;
        let vecY = idealGlobalY - anchorY;
        
        vecX *= distortion;
        vecY *= distortion;

        const DEADZONE_RADIUS = 8; 
        const currentDist = Math.sqrt(vecX * vecX + vecY * vecY);
        
        if (currentDist < DEADZONE_RADIUS) {
            if (currentDist === 0) {
               vecX = DEADZONE_RADIUS;
               vecY = 0;
            } else {
               const ratio = DEADZONE_RADIUS / currentDist;
               vecX *= ratio;
               vecY *= ratio;
            }
        }

        return {
            x: anchorX + vecX,
            y: anchorY + vecY,
            distortion
        };
    };

    const getAnchorDetails = (id: string) => {
        if (id === 'doing') return { label: uiStrings.axis.doing, desc: uiStrings.axis.doingDef };
        if (id === 'being') return { label: uiStrings.axis.being, desc: uiStrings.axis.beingDef };
        if (id === 'seeing') return { label: uiStrings.axis.seeing, desc: uiStrings.axis.seeingDef };
        if (id === 'feeling') return { label: uiStrings.axis.feeling, desc: uiStrings.axis.feelingDef };
        
        const domain = domains.find(d => d.id === id);
        if (domain) return { label: domain.name, desc: domain.subName }; 
        
        return { label: id, desc: '' };
    };

    const anchorData = useMemo(() => {
        const getLensAvg = (nodes: Node[], lens: string) => {
            const values = nodes.map(n => n.attributes.find(a => a.name.toLowerCase() === lens)?.value).filter(v => v !== null) as number[];
            if (!values.length) return 0;
            return values.reduce((a, b) => a + b, 0) / values.length;
        };

        const getNodeSet = (id: string) => {
            if (id === 'd1' || id === 'd2' || id === 'd3' || id === 'd4') {
                return domains.find(d => d.id === id)?.nodes || [];
            }
            return allNodes.filter(n => NODE_AXIS_MAPPING[n.id] === id);
        };

        const data: Record<string, { ego: number, soul: number, spirit: number, overall: number, nodes: { id: string, name: string, score: number | null, ego: number|null, soul: number|null, spirit: number|null }[] }> = {};
        
        ANCHORS.forEach(anchor => {
            const nodes = getNodeSet(anchor.id);
            const ego = getLensAvg(nodes, 'ego');
            const soul = getLensAvg(nodes, 'soul');
            const spirit = getLensAvg(nodes, 'spirit');
            const overall = (ego + soul + spirit) / 3;
            
            const nodeList = nodes.map(n => ({
                id: n.id,
                name: n.name,
                score: getFormattedNodeScore(n),
                ego: n.attributes.find(a => a.name === 'Ego')?.value ?? null,
                soul: n.attributes.find(a => a.name === 'Soul')?.value ?? null,
                spirit: n.attributes.find(a => a.name === 'Spirit')?.value ?? null,
            })).sort((a, b) => (b.score || 0) - (a.score || 0));

            data[anchor.id] = { ego, soul, spirit, overall, nodes: nodeList };
        });
        
        return data;
    }, [domains, allNodes]);

    // Global Lens Data (Aggregated across ALL nodes)
    const globalLensData = useMemo(() => {
        const calculateGlobalLens = (lensName: string) => {
            const allValues = allNodes.map(n => n.attributes.find(a => a.name.toLowerCase() === lensName)?.value).filter(v => v !== null) as number[];
            if (!allValues.length) return 0;
            return allValues.reduce((a,b) => a+b, 0) / allValues.length;
        };
        return {
            ego: calculateGlobalLens('ego'),
            soul: calculateGlobalLens('soul'),
            spirit: calculateGlobalLens('spirit')
        };
    }, [allNodes]);

    useEffect(() => {
        let timer: number;
        const playStage = (index: number) => {
            setTextOpacity(0);
            setTimeout(() => {
                setStage(index);
                setTextOpacity(1);
            }, 500);

            const currentDuration = STAGES[index].duration;
            if (currentDuration > 0 && index < STAGES.length - 1) {
                timer = window.setTimeout(() => {
                    playStage(index + 1);
                }, currentDuration);
            }
        };
        playStage(0);
        return () => clearTimeout(timer);
    }, []);

    // --- GEOMETRY HELPERS ---
    const getDistortedPoint = (anchorIndex: number, value: number) => {
        const anchor = ANCHORS[anchorIndex];
        const centerX = 50;
        const centerY = 50;
        
        const dx = anchor.x - centerX;
        const dy = anchor.y - centerY;
        
        const distortion = 1 + (value / 200); 
        
        return {
            x: centerX + dx * distortion,
            y: centerY + dy * distortion
        };
    };

    const generatePath = (layerKey: 'overall' | 'ego' | 'soul' | 'spirit') => {
        const points = ANCHORS.map((anchor, i) => {
            const val = anchorData[anchor.id][layerKey];
            const pos = getDistortedPoint(i, val);
            return `${pos.x},${pos.y}`;
        });
        return `M ${points.join(' L ')} Z`;
    };

    const toggleLayer = (layer: 'overall' | 'ego' | 'soul' | 'spirit') => {
        setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
    };

    // Calculate Detail Objects
    const currentDetailNode = useMemo(() => {
        if (selection?.type === 'node') {
            return allNodes.find(n => n.id === selection.id);
        }
        return null;
    }, [selection, allNodes]);

    const currentAnchorData = useMemo(() => {
        if (selection?.type === 'anchor') {
            return {
                id: selection.id,
                details: getAnchorDetails(selection.id),
                stats: anchorData[selection.id]
            }
        }
        return null;
    }, [selection, anchorData, domains, uiStrings]);

    // --- SUB-COMPONENTS FOR RENDERING ---

    const MiniBar = ({ value, color }: { value: number | null, color: string }) => {
        if (value === null) return <div className="h-1 w-full bg-slate-800 rounded-full" />;
        const percent = Math.min(100, Math.max(0, (value + 100) / 2));
        return (
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div 
                    className="h-full rounded-full"
                    style={{ width: `${percent}%`, backgroundColor: color, transition: 'width 0.5s ease-out' }}
                />
            </div>
        );
    };

    const DetailedBar = ({ label, value }: { label: string, value: number }) => {
        const safeColor = getSafeColor(value);
        return (
            <div className="mb-4">
                <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-xs font-medium text-slate-400 tracking-wide">{label}</span>
                    <span className="text-xs font-bold" style={{ color: safeColor }}>{getScoreLabel(value)} <span className="opacity-50 text-[10px] text-slate-500">({value.toFixed(0)})</span></span>
                </div>
                {/* 5-Zone Track Background - Obsidian Style */}
                <div className="relative w-full h-2 rounded-full overflow-hidden flex opacity-100 bg-slate-900 border border-slate-800">
                    <div className="w-[20%] h-full bg-indigo-950/60 border-r border-slate-800"></div>
                    <div className="w-[20%] h-full bg-indigo-900/30 border-r border-slate-800"></div>
                    <div className="w-[20%] h-full bg-amber-900/20 border-r border-slate-800"></div>
                    <div className="w-[20%] h-full bg-red-900/30 border-r border-slate-800"></div>
                    <div className="w-[20%] h-full bg-red-950/60"></div>
                    
                    {/* Thumb */}
                    <div 
                        className="absolute top-0 bottom-0 w-1 bg-slate-200 shadow-sm" 
                        style={{ left: `${Math.min(100, Math.max(0, (value + 100) / 2))}%`, transition: 'left 0.5s ease-out' }} 
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-950 text-slate-200 flex flex-col md:flex-row overflow-hidden font-light">
            
            <style>{`
                @keyframes pulse-bright {
                    0% { transform: scale(1); filter: brightness(1); }
                    50% { transform: scale(1.3); filter: brightness(1.5) drop-shadow(0 0 5px white); }
                    100% { transform: scale(1); filter: brightness(1); }
                }
                @keyframes pulse-dim {
                    0% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(0.8); opacity: 0.3; }
                    100% { transform: scale(1); opacity: 0.6; }
                }
                .animate-pulse-fast { animation: pulse-bright 1.5s ease-in-out infinite; }
                .animate-pulse-slow-dim { animation: pulse-dim 4s ease-in-out infinite; }
            `}</style>

            {/* --- LEFT COLUMN: MAP STAGE --- */}
            <div 
                className={`relative w-full transition-all duration-700 ease-in-out flex flex-col items-center justify-center ${selection ? 'h-1/3 md:h-full md:w-2/3 cursor-pointer' : 'h-full'}`}
                onClick={() => setSelection(null)}
            >
                {/* BACKGROUND ATMOSPHERE - SOLID VOID */}
                <div className="absolute inset-0 bg-slate-950 z-0 pointer-events-none" />
                
                <div className="absolute top-8 left-8 z-50 pointer-events-none">
                    <PulseLogo label="resonance" />
                </div>

                <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors z-50 p-2 pointer-events-auto">
                    <CloseIcon />
                </button>
                
                <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center z-10 p-8">
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible transition-all duration-1000">
                        {/* (SVG Contents Same as Before - Shapes, Links, Nodes, Anchors) */}
                        <g className={`transition-opacity duration-1000 ${stage >= 2 ? 'opacity-20' : 'opacity-0'}`}>
                            <line x1="50" y1="50" x2="50" y2="10" stroke="#475569" strokeWidth="0.2" strokeDasharray="1 1" />
                            <line x1="50" y1="50" x2="50" y2="90" stroke="#475569" strokeWidth="0.2" strokeDasharray="1 1" />
                            <line x1="50" y1="50" x2="10" y2="50" stroke="#475569" strokeWidth="0.2" strokeDasharray="1 1" />
                            <line x1="50" y1="50" x2="90" y2="50" stroke="#475569" strokeWidth="0.2" strokeDasharray="1 1" />
                        </g>

                        {stage >= 3 && (
                            <g className="transition-all duration-1000">
                                <path d={generatePath('ego')} fill="transparent" stroke="#6366f1" strokeWidth="0.3" className={`transition-all duration-700 ease-out ${activeLayers.ego ? 'opacity-100' : 'opacity-0'}`} />
                                <path d={generatePath('soul')} fill="transparent" stroke="#fbbf24" strokeWidth="0.3" strokeDasharray="2 1" className={`transition-all duration-700 ease-out ${activeLayers.soul ? 'opacity-100' : 'opacity-0'}`} />
                                <path d={generatePath('spirit')} fill="transparent" stroke="#ef4444" strokeWidth="0.5" className={`transition-all duration-700 ease-out ${activeLayers.spirit ? 'opacity-100' : 'opacity-0'}`} />
                                <path d={generatePath('overall')} fill="rgba(251, 191, 36, 0.05)" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="0.6" className={`transition-all duration-700 ease-out ${activeLayers.overall ? 'opacity-100' : 'opacity-0'}`} />
                            </g>
                        )}

                        {stage >= 1 && stage < 3 && (
                            <g>
                                {allNodes.map((node) => {
                                    const parentId = node.id.split('-')[0];
                                    const parentAnchor = ANCHORS.find(a => a.id === parentId);
                                    if (!parentAnchor) return null;
                                    const globalPos = getGlobalNodePosition(node);
                                    return <line key={`link-${node.id}`} x1={globalPos.x} y1={globalPos.y} x2={parentAnchor.x} y2={parentAnchor.y} stroke={parentAnchor.color} strokeWidth="0.1" opacity="0.3" />;
                                })}
                            </g>
                        )}

                        <g className={`transition-opacity duration-1000 ${stage >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                            {allNodes.map((node) => {
                                const domainId = node.id.split('-')[0];
                                const anchor = ANCHORS.find(a => a.id === domainId);
                                const posOverall = getGlobalNodePosition(node);
                                const score = getFormattedNodeScore(node);
                                const isNodeHovered = hoveredNode === node.id || (selection?.type === 'node' && selection.id === node.id);
                                let animationClass = '';
                                if (stage >= 3 && score !== null) {
                                    if (score > 60) animationClass = 'animate-pulse-fast';
                                    else if (score < -60) animationClass = 'animate-pulse-slow-dim';
                                }

                                return (
                                    <g key={node.id} onClick={(e) => { e.stopPropagation(); setSelection({ type: 'node', id: node.id }); }} onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)} className={`cursor-pointer transition-all duration-300 ${animationClass}`} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                                        <circle cx={posOverall.x} cy={posOverall.y} r="5" fill="transparent" />
                                        {(activeLayers.overall || isNodeHovered) && (
                                            <>
                                                <circle cx={posOverall.x} cy={posOverall.y} r={isNodeHovered ? 2 : 0.8} fill={isNodeHovered ? '#fff' : (anchor?.color || 'white')} opacity={stage >= 3 ? 1 : 0.8} className="transition-all duration-300" />
                                                {selection?.type === 'node' && selection.id === node.id && <circle cx={posOverall.x} cy={posOverall.y} r="3" fill="none" stroke="white" strokeWidth="0.2" opacity="0.5" />}
                                            </>
                                        )}
                                    </g>
                                );
                            })}
                        </g>

                        <g className={`transition-all duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                            {ANCHORS.map((anchor) => {
                                const details = getAnchorDetails(anchor.id);
                                const isSelected = selection?.type === 'anchor' && selection.id === anchor.id;
                                return (
                                    <g key={anchor.id} className="cursor-pointer group" onClick={(e) => { e.stopPropagation(); setSelection({ type: 'anchor', id: anchor.id }); }} onMouseEnter={() => handleAnchorEnter(anchor.id)} onMouseLeave={handleAnchorLeave}>
                                        <circle cx={anchor.x} cy={anchor.y} r="8" fill="transparent" />
                                        <circle cx={anchor.x} cy={anchor.y} r={(hoveredAnchor === anchor.id || isSelected) ? "4" : "3"} fill={anchor.color} opacity="0.1" className="transition-all duration-300" />
                                        <circle cx={anchor.x} cy={anchor.y} r="1" fill={anchor.color} />
                                        <text x={anchor.x} y={anchor.y + 5} fontSize="2.5" fill={anchor.color} textAnchor="middle" className={`tracking-widest transition-opacity duration-1000 ${stage >= 2 ? 'opacity-80' : 'opacity-0'}`} style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>{details.label.split(' ')[0]}</text>
                                    </g>
                                )
                            })}
                        </g>
                    </svg>

                    {hoveredNode && !hoveredAnchor && !selection && (() => {
                        const node = allNodes.find(n => n.id === hoveredNode);
                        if (!node) return null;
                        const pos = getGlobalNodePosition(node);
                        const score = getFormattedNodeScore(node);
                        return (
                            <div className="absolute z-50 pointer-events-none" style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -140%)', paddingBottom: '12px' }}>
                                <div className="bg-slate-900 border border-slate-700 rounded p-2 text-center min-w-[120px] shadow-xl animate-fade-in">
                                    <h4 className="text-white text-[10px] font-bold tracking-wide mb-0.5">{node.name}</h4>
                                    <span className="text-[9px] font-bold" style={{ color: getSafeColor(score) }}>{getScoreLabel(score)}</span>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                <div className="absolute bottom-12 w-full flex flex-col items-center gap-8 px-8 z-20">
                    <p className="text-xl md:text-2xl font-light text-slate-300 text-center transition-opacity duration-1000 max-w-md" style={{ opacity: textOpacity }}>{STAGES[stage].text}</p>
                    {stage === 3 && (
                        <div className="flex rounded-full bg-slate-900 p-1 border border-slate-800 shadow-lg animate-fade-in-up">
                            <button onClick={() => toggleLayer('overall')} className={`px-6 py-2 rounded-full text-xs tracking-widest transition-all ${activeLayers.overall ? 'bg-amber-500/20 text-amber-200' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}>overall</button>
                            <div className="w-px bg-slate-800 my-1 mx-1"></div>
                            <button onClick={() => toggleLayer('ego')} className={`px-4 py-2 rounded-full text-xs tracking-widest transition-all ${activeLayers.ego ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}>form</button>
                            <button onClick={() => toggleLayer('soul')} className={`px-4 py-2 rounded-full text-xs tracking-widest transition-all ${activeLayers.soul ? 'bg-amber-600/20 text-amber-300' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}>essence</button>
                            <button onClick={() => toggleLayer('spirit')} className={`px-4 py-2 rounded-full text-xs tracking-widest transition-all ${activeLayers.spirit ? 'bg-red-500/20 text-red-300' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}>resonance</button>
                        </div>
                    )}
                </div>
            </div>

            {/* --- RIGHT/BOTTOM COLUMN: DETAIL PANEL - OBSIDIAN STYLE --- */}
            <aside className={`border-t md:border-t-0 md:border-l border-slate-800 bg-slate-950 transition-all duration-700 ease-in-out overflow-hidden h-2/3 md:h-full md:w-1/3 shadow-2xl z-50 flex flex-col`}>
                
                {/* 1. INDIVIDUAL STAR DETAIL */}
                {currentDetailNode && (
                    <div className="h-full overflow-y-auto">
                        <StarDetailView 
                            star={currentDetailNode}
                            isAwakening={false}
                            onAttributeChange={() => {}} 
                            onSelectNext={() => {}}
                            onSelectPrev={() => {}}
                            hasNext={false}
                            hasPrev={false}
                            readOnly={true}
                            attributeDefinitions={attributeDefinitions}
                            uiStrings={uiStrings}
                        />
                    </div>
                )}

                {/* 2. ANCHOR DETAIL (Aggregate View) */}
                {currentAnchorData && (
                    <div className="p-6 md:p-8 text-slate-200 h-full flex flex-col animate-fade-in bg-slate-950">
                        <div className="flex-shrink-0">
                            <h3 className="text-xl md:text-2xl font-bold tracking-wide text-white">{currentAnchorData.details.label}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-light italic mt-1">{currentAnchorData.details.desc}</p>
                            
                            <div className="my-6 border-t border-slate-800" />
                            
                            {/* Score Display */}
                            <div className="mb-6">
                                <span className="text-[10px] text-slate-500 tracking-widest uppercase">aggregate resonance</span>
                                <div className="flex items-baseline gap-3 mt-1">
                                    <span className="text-2xl font-bold capitalize" style={{ color: getSafeColor(currentAnchorData.stats.overall) }}>
                                        {getScoreLabel(currentAnchorData.stats.overall)}
                                    </span>
                                    <span className="text-lg font-mono text-slate-600">
                                        ({currentAnchorData.stats.overall.toFixed(0)})
                                    </span>
                                </div>
                            </div>

                            {/* Lens Breakdown */}
                            <div className="space-y-4 mb-8">
                                <DetailedBar label={LENS_LABELS.ego} value={currentAnchorData.stats.ego} />
                                <DetailedBar label={LENS_LABELS.soul} value={currentAnchorData.stats.soul} />
                                <DetailedBar label={LENS_LABELS.spirit} value={currentAnchorData.stats.spirit} />
                            </div>
                        </div>

                        {/* Node List (Accordion) */}
                        <div className="flex-grow overflow-y-auto pr-1 custom-scrollbar">
                            <h4 className="text-[10px] text-slate-500 tracking-widest mb-3 sticky top-0 bg-slate-950 py-2 z-10 border-b border-slate-800 uppercase">constituent expressions</h4>
                            <div className="space-y-1">
                                {currentAnchorData.stats.nodes.map((n) => {
                                    const isExpanded = !!expandedAccordionNodes[n.id];
                                    return (
                                        <div key={n.id} className={`rounded transition-colors border ${isExpanded ? 'bg-slate-900 border-slate-800' : 'bg-slate-950 border-slate-800 hover:bg-slate-900'}`}>
                                            <button 
                                                onClick={() => handleAccordionToggle(n.id)}
                                                className="w-full flex justify-between items-center p-3 text-left group"
                                            >
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${isExpanded ? 'bg-slate-400' : 'bg-slate-700'}`} />
                                                    <span className={`text-sm font-medium transition-colors truncate ${isExpanded ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{n.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <span className="text-[10px] tracking-wider font-bold capitalize" style={{ color: getSafeColor(n.score) }}>{getScoreLabel(n.score)}</span>
                                                    <span className="text-xs font-mono text-slate-600">({n.score !== null ? n.score.toFixed(0) : '-'})</span>
                                                </div>
                                            </button>
                                            
                                            {/* Accordion Content */}
                                            {isExpanded && (
                                                <div className="px-3 pb-4 pt-1 animate-fade-in space-y-3 border-t border-slate-800">
                                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                                        <div className="text-center">
                                                            <span className="block text-[9px] tracking-widest text-indigo-400 mb-1">{LENS_LABELS.ego}</span>
                                                            <MiniBar value={n.ego} color="#6366f1" />
                                                            <span className="text-[9px] text-slate-500 mt-1 block">{n.ego?.toFixed(0)}</span>
                                                        </div>
                                                        <div className="text-center">
                                                            <span className="block text-[9px] tracking-widest text-amber-400 mb-1">{LENS_LABELS.soul}</span>
                                                            <MiniBar value={n.soul} color="#fbbf24" />
                                                            <span className="text-[9px] text-slate-500 mt-1 block">{n.soul?.toFixed(0)}</span>
                                                        </div>
                                                        <div className="text-center">
                                                            <span className="block text-[9px] tracking-widest text-red-400 mb-1">{LENS_LABELS.spirit}</span>
                                                            <MiniBar value={n.spirit} color="#ef4444" />
                                                            <span className="text-[9px] text-slate-500 mt-1 block">{n.spirit?.toFixed(0)}</span>
                                                        </div>
                                                    </div>
                                                    <button onClick={(e) => { e.stopPropagation(); setSelection({ type: 'node', id: n.id }); }} className="w-full py-2 text-[10px] tracking-widest border border-slate-700 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors mt-2 uppercase">
                                                        inspect full details
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. GLOBAL DASHBOARD (Default State) */}
                {!currentDetailNode && !currentAnchorData && (
                    <div className="p-6 md:p-8 text-slate-200 h-full flex flex-col animate-fade-in bg-slate-950">
                        <div className="flex-shrink-0">
                            <h3 className="text-xl md:text-2xl font-bold tracking-wide text-white">resonance overview</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-light italic mt-1">A global view of your energetic signature.</p>
                            
                            {/* Toggle Switch */}
                            <div className="flex bg-slate-900 p-1 rounded border border-slate-800 my-6">
                                <button 
                                    onClick={() => setDashboardTab('energies')}
                                    className={`flex-1 py-1.5 rounded text-xs tracking-widest transition-all ${dashboardTab === 'energies' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
                                >
                                    energies
                                </button>
                                <button 
                                    onClick={() => setDashboardTab('lenses')}
                                    className={`flex-1 py-1.5 rounded text-xs tracking-widest transition-all ${dashboardTab === 'lenses' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
                                >
                                    lenses
                                </button>
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                            {dashboardTab === 'energies' && ANCHORS.map(anchor => {
                                const data = anchorData[anchor.id];
                                const details = getAnchorDetails(anchor.id);
                                return (
                                    <div key={anchor.id} onClick={() => setSelection({ type: 'anchor', id: anchor.id })} className="bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 p-3 rounded transition-all cursor-pointer group">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-sm tracking-wide group-hover:text-amber-300 transition-colors capitalize">{details.label}</h4>
                                            <span className="text-[10px] font-bold capitalize" style={{ color: getSafeColor(data.overall) }}>{getScoreLabel(data.overall)}</span>
                                        </div>
                                        <MiniBar value={data.overall} color={getSafeColor(data.overall)} />
                                    </div>
                                );
                            })}

                            {dashboardTab === 'lenses' && (
                                <div className="space-y-6">
                                    <div className="bg-slate-900 border-l-2 border-indigo-500/50 p-4 rounded-r">
                                        <DetailedBar label={LENS_LABELS.ego} value={globalLensData.ego} />
                                        <p className="text-[10px] text-slate-500 italic mt-2 leading-relaxed">How you define boundaries and structure.</p>
                                    </div>
                                    <div className="bg-slate-900 border-l-2 border-amber-500/50 p-4 rounded-r">
                                        <DetailedBar label={LENS_LABELS.soul} value={globalLensData.soul} />
                                        <p className="text-[10px] text-slate-500 italic mt-2 leading-relaxed">Your internal emotional drive and flow.</p>
                                    </div>
                                    <div className="bg-slate-900 border-l-2 border-red-500/50 p-4 rounded-r">
                                        <DetailedBar label={LENS_LABELS.spirit} value={globalLensData.spirit} />
                                        <p className="text-[10px] text-slate-500 italic mt-2 leading-relaxed">Your connection to the larger whole.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </aside>

        </div>
    );
};

export default ResonanceField;
