
import React, { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { MandalaData, Domain, LensData, PrimaryEnergyData, InquiryData, PersonalSpectrum, CosmicHighlights, Node, AnalysisData, UIStrings, AttributeDefinition, Language } from '../types';
import { calculateCosmicHighlights, calculateNodeAverages, calculateLensDataByDomain, getNodesForEnergy, calculateAllNodeAverages } from '../utils/cosmosAnalysis';
import { DOMAINS_DATA } from '../constants';
import { getAttributeColor } from '../utils/colors';
import LivingMandala from './LivingMandala';
import PulseLogo from './icons/PulseLogo';
import DataPoint from './DataPoint';
import RichTextViewer from './RichTextViewer';

// Optimization: Lazy Load ResonanceField
const ResonanceField = React.lazy(() => import('./ResonanceField'));

interface SoulAtlasViewProps {
  domains: Domain[];
  mandalaData: MandalaData;
  lensData: LensData;
  primaryEnergyData: PrimaryEnergyData;
  personalSpectrum: PersonalSpectrum;
  onClose: () => void;
  uiStrings: UIStrings;
  attributeDefinitions: Record<string, AttributeDefinition>;
  language: Language;
  // Lifted state props
  inquiryData: InquiryData | null;
  setInquiryData: (data: InquiryData | null) => void;
}

type MainViewMode = 'overview' | 'reading';
type OverviewSubTab = 'map' | 'lenses' | 'energies' | 'highlights';
type ActiveInquiryTab = 'summary' | 'strengths' | 'shadows' | 'archetypes' | 'balancingPractices'; 

const getValueLabel = (value: number): string => {
    if (value < -60) return "Dormant / Quiet";
    if (value < -20) return "Receding";
    if (value <= 20) return "Balanced Flow";
    if (value <= 60) return "Intense";
    return "Volatile / Abundant";
};

const HighlightCard: React.FC<{
    title: string;
    context: string;
    label: string;
    labelColor: string;
}> = ({ title, context, label, labelColor }) => (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10 h-full flex flex-col">
        <h4 className="text-lg font-bold text-white">{title}</h4>
        <p className="text-xs text-slate-400 mt-1 italic flex-grow line-clamp-2">{context}</p>
        <p className="text-sm font-bold mt-2 self-start" style={{ color: labelColor }}>{label}</p>
    </div>
);


const getNodeContext = (nodeName: string, domains: Domain[]): { domain: string, primary_energy: string } => {
    for (const d of domains) {
        const nodeIndex = d.nodes.findIndex(n => n.name === nodeName);
        if (nodeIndex !== -1) {
            let primary_energy = 'unknown';
            if (d.id === 'd1') primary_energy = 'External Structure (Do & See)';
            else if (d.id === 'd2') primary_energy = 'Inner Drive (Do & Feel)';
            else if (d.id === 'd3') primary_energy = 'Interconnection (Be & See)';
            else if (d.id === 'd4') primary_energy = 'Deep Presence (Be & Feel)';
            return { domain: d.name, primary_energy };
        }
    }
    return { domain: 'unknown', primary_energy: 'unknown' };
};

const SoulAtlasView: React.FC<SoulAtlasViewProps> = ({ domains, mandalaData, lensData, primaryEnergyData, personalSpectrum, onClose, uiStrings, attributeDefinitions, language, inquiryData, setInquiryData }) => {
  const [viewMode, setViewMode] = useState<MainViewMode>('overview');
  const [overviewTab, setOverviewTab] = useState<OverviewSubTab>('map');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // --- LAB STATE ---
  const [showResonanceLab, setShowResonanceLab] = useState(false);

  const [activeInquiryTab, setActiveInquiryTab] = useState<ActiveInquiryTab>('summary');
  const [showPrompt, setShowPrompt] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState(uiStrings.copyPrompt);
  
  // Font Size Control
  const [textSizeMultiplier, setTextSizeMultiplier] = useState(1); // 1 = Normal

  // Follow-up interaction
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [followUpResponse, setFollowUpResponse] = useState<string | null>(null);
  const [activeFollowUpQuestion, setActiveFollowUpQuestion] = useState<string | null>(null);


  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  
  // Store the "Master Context" string to re-use it for chat interaction without re-generating it
  const masterContextRef = useRef(''); 
  const lastPromptRef = useRef('');

  const cosmicHighlights = useMemo(() => calculateCosmicHighlights(domains, mandalaData), [domains, mandalaData]);
  
  const allNodeAverages = useMemo(() => calculateAllNodeAverages(domains), [domains]);
  const allNodes = useMemo(() => domains.flatMap(d => d.nodes), [domains]);

  const drillDownData = useMemo(() => {
    const nodeDataByDomain: Record<string, Record<string, AnalysisData>> = {};
    domains.forEach(d => {
        nodeDataByDomain[d.id] = calculateNodeAverages(d.nodes);
    });
    const lensDataByDomain = calculateLensDataByDomain(domains);
    const nodesByEnergy = {
        doing: getNodesForEnergy('doing', domains),
        being: getNodesForEnergy('being', domains),
        seeing: getNodesForEnergy('seeing', domains),
        feeling: getNodesForEnergy('feeling', domains),
    };
    return { nodeDataByDomain, lensDataByDomain, nodesByEnergy };
  }, [domains]);
  
  const MAIN_TABS = [ 
      { id: 'overview', label: uiStrings.overview }, 
      { id: 'reading', label: uiStrings.atlasReading } 
  ];

  const OVERVIEW_SUB_TABS = [
      { id: 'map', label: 'Map' },
      { id: 'lenses', label: uiStrings.lenses },
      { id: 'energies', label: uiStrings.energies },
      { id: 'highlights', label: uiStrings.highlights },
  ];

  const INQUIRY_TABS = [ { id: 'summary', label: 'Summary' }, { id: 'strengths', label: 'Strengths' }, { id: 'shadows', label: 'Shadows' }, { id: 'archetypes', label: 'Archetypes' }, { id: 'balancingPractices', label: 'Practices' } ];
  
  const LENSES_TABS_CONFIG = [['ego', uiStrings.lensesTitles.ego, uiStrings.lensesTitles.egoSub], ['soul', uiStrings.lensesTitles.soul, uiStrings.lensesTitles.soulSub], ['spirit', uiStrings.lensesTitles.spirit, uiStrings.lensesTitles.spiritSub]] as const;
  const ENERGIES_TABS_CONFIG = [['doing', uiStrings.energiesTitles.doing, uiStrings.energiesTitles.doingSub], ['being', uiStrings.energiesTitles.being, uiStrings.energiesTitles.beingSub], ['seeing', uiStrings.energiesTitles.seeing, uiStrings.energiesTitles.seeingSub], ['feeling', uiStrings.energiesTitles.feeling, uiStrings.energiesTitles.feelingSub]] as const;

  const lensNodeGlyphs = useMemo(() => {
      if (!allNodes.length) return { ego: [], soul: [], spirit: [] };
      return {
          ego: allNodes.map(n => ({ name: n.name, equilibrium: n.attributes.find(a => a.name === 'Ego')?.value ?? 0 })),
          soul: allNodes.map(n => ({ name: n.name, equilibrium: n.attributes.find(a => a.name === 'Soul')?.value ?? 0 })),
          spirit: allNodes.map(n => ({ name: n.name, equilibrium: n.attributes.find(a => a.name === 'Spirit')?.value ?? 0 })),
      };
  }, [allNodes]);

  const energyNodeGlyphs = useMemo(() => {
      const energyGlyphs: Record<string, {name: string, equilibrium: number}[]> = {};
      ENERGIES_TABS_CONFIG.forEach(([key]) => {
          const energyNodes = drillDownData.nodesByEnergy[key as 'doing'|'being'|'seeing'|'feeling'];
          energyGlyphs[key] = energyNodes.map(n => ({ name: n.name, equilibrium: allNodeAverages[n.name]?.equilibrium ?? 0 }));
      });
      return energyGlyphs;
  }, [drillDownData.nodesByEnergy, allNodeAverages, ENERGIES_TABS_CONFIG]);


  const handleToggleExpand = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleNodeExpand = (nodeName: string) => {
    setExpandedNodes(prev => ({ ...prev, [nodeName]: !prev[nodeName] }));
  };

  const buildContext = () => {
      // Base Glossary logic (can be shared or localized)
      const glossary = `
          --- GLOSSARY & GUIDE: INNERVERSE 3.0 ---
          This application maps a user's inner world using a Grounded/Cartographic metaphor.
          - The Goal: To provide a "Map of Location." It answers: Where do I currently reside on the landscape of human potential?
          - Scoring Philosophy: 
            - (-100 to -60) Dormant: Energy is asleep or suppressed.
            - (-60 to -20) Receding: Energy is present but weak.
            - (-20 to +20) Balanced: The "Flow State." Energy is available and appropriate. HONOR THIS STATE.
            - (+20 to +60) Intense: Energy is strong, potentially dominating.
            - (+60 to +100) Volatile: Energy is over-expressed, rigid, or consuming.
          - LENSES:
            - Ego: The visible mechanism and output.
            - Soul: The internal emotional motivation.
            - Spirit: The resonance and connection to the whole.
          - DOMAINS (REALMS):
            - <d1>External Structure (Do & See)</d1>: ${domains[0].description}
            - <d3>Interconnection (Be & See)</d3>: ${domains[1].description}
            - <d2>Inner Drive (Do & Feel)</d2>: ${domains[2].description}
            - <d4>Deep Presence (Be & Feel)</d4>: ${domains[3].description}
        `;

        const energeticLandscape = `
          --- USER'S ENERGETIC LANDSCAPE ---
          - Domain Balances:
            - <d1>External Structure</d1>: Eq ${mandalaData.d1.equilibrium.toFixed(1)}, Flux ${mandalaData.d1.flux.toFixed(1)}
            - <d3>Interconnection</d3>: Eq ${mandalaData.d3.equilibrium.toFixed(1)}, Flux ${mandalaData.d3.flux.toFixed(1)}
            - <d2>Inner Drive</d2>: Eq ${mandalaData.d2.equilibrium.toFixed(1)}, Flux ${mandalaData.d2.flux.toFixed(1)}
            - <d4>Deep Presence</d4>: Eq ${mandalaData.d4.equilibrium.toFixed(1)}, Flux ${mandalaData.d4.flux.toFixed(1)}
          - Lens Balances:
            - Ego: Eq ${lensData.ego.equilibrium.toFixed(1)}, Flux ${lensData.ego.flux.toFixed(1)}
            - Soul: Eq ${lensData.soul.equilibrium.toFixed(1)}, Flux ${lensData.soul.flux.toFixed(1)}
            - Spirit: Eq ${lensData.spirit.equilibrium.toFixed(1)}, Flux ${lensData.spirit.flux.toFixed(1)}
        `;

        const formatAllNodeData = (node: Node) => {
            const def = attributeDefinitions[node.name];
            const context = getNodeContext(node.name, domains);
            const egoSpectrum = def.spectrum.ego.join(' | ');
            const soulSpectrum = def.spectrum.soul.join(' | ');
            const spiritSpectrum = def.spectrum.spirit.join(' | ');
            return `
            - Expression: "${node.name}" (Domain: ${context.domain})
              - Ego value is ${node.attributes[0].value}. Spectrum: [${egoSpectrum}].
              - Soul value is ${node.attributes[1].value}. Spectrum: [${soulSpectrum}].
              - Spirit value is ${node.attributes[2].value}. Spectrum: [${spiritSpectrum}].
            `
        };

        const fullCosmosData = allNodes.length > 0 ? `
        --- USER'S FULL MAP DATA (All 24 Expressions) ---
        ${allNodes.map(formatAllNodeData).join('')}
        ` : '';

        return `
          You are a Cartographer of the Inner Landscape. Your task is to provide a "Field Guide" entry for the user's current residence in the Innerverse.

          ${glossary}
          ${energeticLandscape}
          ${fullCosmosData}
        `;
  }

  const handleGenerateReading = async () => {
    setLoading(true);
    setError('');
    setInquiryData(null);
    setShowPrompt(false);
    setFollowUpResponse(null);
    setActiveFollowUpQuestion(null);
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const context = buildContext();
        masterContextRef.current = context; // Save context for follow-ups
        
        const langInstruction = language === 'es' ? 'CRITICAL: OUTPUT MUST BE IN SPANISH.' : (language === 'nl' ? 'CRITICAL: OUTPUT MUST BE IN DUTCH.' : '');

        const prompt = `
          ${context}

          --- YOUR TASK ---
          Based on ALL data provided, generate a Cartographic Reading.
          - Tone: Observational, appreciative, curious. "This region is known for X. Your presence here suggests Y."
          - Avoid "Good/Bad" language. Use "Dormant, Flowing, Volatile."
          - Use "Ink & Water" metaphors for texture (e.g., "The ink runs thin here," "The currents are turbulent," "Your soul's watercolor flows freely").
          - Keep 'title' fields Short, Poetic, and Concise (max 10 words). Do NOT list synonyms.
          - For 'balancingPractices', offer routes for movement. "To move from the arid plains of excessive Structure back to the fertile riverbed of flow, consider..."
          - **CRITICAL**: In 'followUpPaths', provide 3 concise "Topics for Further Exploration" (e.g., "The Shadow of the Architect", "Grounding High Flux", "The Roots of Trust"). Do NOT write them as full questions.
          
          ${langInstruction}
          
          Respond ONLY with a single JSON object.
          Use rich formatting in the strings: **bold**, *italic*, <pos>Volatile</pos>, <neg>Dormant</neg>, <bal>Flowing</bal>, and domain tags <d1>...</d1> etc.
        `;
        
        lastPromptRef.current = prompt;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                strengths: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, text: { type: Type.STRING } } },
                shadows: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, text: { type: Type.STRING } } },
                archetypes: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, mantra: { type: Type.STRING } } } },
                balancingPractices: { type: Type.OBJECT, properties: { masculineFeminine: { type: Type.STRING }, lightDark: { type: Type.STRING } } },
                followUpPaths: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["summary", "strengths", "shadows", "archetypes", "balancingPractices", "followUpPaths"]
            }
          }
        });
        
        const parsedData: InquiryData = JSON.parse(response.text);
        setInquiryData(parsedData);
    } catch (e) {
      console.error(`Error generating reading:`, e);
      setError(uiStrings.error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFollowUp = async (topic: string) => {
    setFollowUpLoading(true);
    setActiveFollowUpQuestion(topic);
    setFollowUpResponse(null);
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const langInstruction = language === 'es' ? 'CRITICAL: OUTPUT MUST BE IN SPANISH.' : (language === 'nl' ? 'CRITICAL: OUTPUT MUST BE IN DUTCH.' : '');

        // We send the Master Context again, but with a TEXT prompt (not JSON)
        // This avoids the "Mode Collapse" where the model tries to force poetry into JSON.
        const prompt = `
            ${masterContextRef.current}
            
            --- DEEPEN THE INQUIRY ---
            The user has selected this topic for deeper exploration: "${topic}".
            
            Please provide a "Field Guide Note" on this specific topic.
            - Format: 2-3 evocative paragraphs (Markdown allowed).
            - Tone: Wise, poetic, grounded, cartographic.
            - End with a specific "Somatic Inquiry" or "Micro-Ritual" related to this topic.
            
            ${langInstruction}
            
            Do NOT output JSON. Return clean, rich Markdown text.
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            // No JSON Schema here - we want free text
        });
        setFollowUpResponse(response.text);
    } catch(e) {
        console.error("Error with follow up", e);
        setFollowUpResponse(uiStrings.error);
    } finally {
        setFollowUpLoading(false);
    }
  }

  const handleExportReading = () => {
    if (!inquiryData) return;
    const { summary, strengths, shadows, archetypes, balancingPractices } = inquiryData;
    const clean = (str: string | undefined | null) => (str || '').replace(/<[^>]+>/g, '');
    let content = `# Your Pulse Reading\n\n`;
    content += `## Summary\n\n${clean(summary)}\n\n`;
    content += `## Strengths: ${clean(strengths?.title)}\n\n${clean(strengths?.text)}\n\n`;
    content += `## Shadows: ${clean(shadows?.title)}\n\n${clean(shadows?.text)}\n\n`;
    content += `## Your Archetypes\n\n`;
    archetypes?.forEach(a => {
        content += `### ${clean(a.name)}\n\n${clean(a.description)}\n\n*Mantra: "${clean(a.mantra || '')}"*\n\n`;
    });
    content += `## Routes of Movement\n\n`;
    content += `### Doing & Being\n\n${clean(balancingPractices?.masculineFeminine)}\n\n`;
    content += `### Seeing & Feeling\n\n${clean(balancingPractices?.lightDark)}\n\n`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-pulse-reading.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(lastPromptRef.current).then(() => {
        setCopyButtonText(uiStrings.copied);
        setTimeout(() => setCopyButtonText(uiStrings.copyPrompt), 2000);
    }).catch(err => {
        console.error('Failed to copy prompt: ', err);
        setCopyButtonText('Error!');
        setTimeout(() => setCopyButtonText(uiStrings.copyPrompt), 2000);
    });
  };

  const mandalaAxes = useMemo(() => {
      if (overviewTab === 'lenses') {
          return LENSES_TABS_CONFIG.map(([key, name]) => ({ name, data: lensData[key] }));
      }
      return ENERGIES_TABS_CONFIG.map(([key, name]) => ({ name, data: primaryEnergyData[key]}));
  }, [overviewTab, primaryEnergyData, lensData, LENSES_TABS_CONFIG, ENERGIES_TABS_CONFIG]);

  if (showResonanceLab) {
      return (
          <Suspense fallback={<div className="fixed inset-0 z-[60] bg-slate-950 flex items-center justify-center text-amber-500/50 animate-pulse font-mono text-xs">INITIALIZING RESONANCE...</div>}>
            <ResonanceField 
                domains={domains} 
                mandalaData={mandalaData} 
                onClose={() => setShowResonanceLab(false)} 
                uiStrings={uiStrings}
                attributeDefinitions={attributeDefinitions}
            />
          </Suspense>
      );
  }

  return (
    <div 
        className="fixed top-0 left-0 w-full z-40 bg-slate-950/30 backdrop-blur-xl text-slate-200 animate-fade-in flex flex-col" 
        style={{ height: 'var(--app-height, 100vh)', animationDuration: '500ms' }}
    >
      <header className="flex-shrink-0 p-4 md:p-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <button onClick={onClose} aria-label="Return to galaxy view">
                <PulseLogo label={uiStrings.pulse} />
            </button>
            
            {/* --- EXPERIMENTAL LAB TOGGLE --- */}
            <button 
                onClick={() => setShowResonanceLab(true)} 
                className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 text-white/40 hover:text-amber-300 transition-colors border border-white/5 hover:border-amber-500/30"
                title="Enter Resonance Field (Beta)"
            >
                <span className="text-lg leading-none">⚗️</span>
            </button>
        </div>

        <div className="flex gap-4 items-center">
            {viewMode === 'reading' && (
                <div className="flex items-center gap-1 bg-black/20 rounded-full border border-white/10 px-2 py-1">
                    <button 
                        onClick={() => setTextSizeMultiplier(Math.max(0.8, textSizeMultiplier - 0.1))} 
                        className="w-6 h-6 flex items-center justify-center text-xs text-slate-400 hover:text-white"
                    >
                        A-
                    </button>
                    <div className="w-px h-3 bg-white/20"></div>
                    <button 
                        onClick={() => setTextSizeMultiplier(Math.min(1.5, textSizeMultiplier + 0.1))} 
                        className="w-6 h-6 flex items-center justify-center text-sm text-slate-400 hover:text-white font-bold"
                    >
                        A+
                    </button>
                </div>
            )}
            <nav className="flex items-center gap-1 border border-white/10 bg-black/20 p-1 rounded-full overflow-x-auto">
                {MAIN_TABS.map(tab => (
                    <button 
                        key={tab.id} 
                        onClick={() => setViewMode(tab.id as MainViewMode)} 
                        className={`px-4 py-2 text-xs md:text-sm rounded-full transition-colors whitespace-nowrap font-medium tracking-wide ${viewMode === tab.id ? 'bg-white/10 text-white shadow-sm shadow-white/5' : 'text-slate-400 hover:bg-white/5'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
      </header>
      
      <main className="flex-grow overflow-y-auto flex flex-col md:flex-row min-h-0">
        
        {/* LEFT COLUMN: Mandala & Nav */}
        <div className="w-full md:w-1/2 lg:w-2/5 p-4 md:p-8 flex flex-col items-center justify-center relative">
            <div className="flex-grow flex items-center justify-center w-full">
                <LivingMandala axes={mandalaAxes} onEnterAtlas={() => {}} isInteractive={false} />
            </div>
            
            {/* Overview Sub-Navigation - Placed below Mandala */}
            {viewMode === 'overview' && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {OVERVIEW_SUB_TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setOverviewTab(tab.id as OverviewSubTab)}
                            className={`px-3 py-1.5 rounded-lg text-xs transition-colors border ${overviewTab === tab.id ? 'border-amber-500/50 bg-amber-500/10 text-amber-200' : 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* RIGHT COLUMN: Content Area */}
        <div className="w-full md:w-1/2 lg:w-3/5 p-4 md:p-8 border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto">
            
            {/* --- OVERVIEW CONTENT --- */}
            {viewMode === 'overview' && (
                <div className="space-y-4 animate-fade-in">
                    {overviewTab === 'map' && domains.map(d => {
                        const qNodeGlyphs = d.nodes.map(n => ({ name: n.name, equilibrium: allNodeAverages[n.name]?.equilibrium ?? 0 }));
                        const qLensEquilibriums = {
                            ego: drillDownData.lensDataByDomain.ego[d.id]?.equilibrium ?? 0,
                            soul: drillDownData.lensDataByDomain.soul[d.id]?.equilibrium ?? 0,
                            spirit: drillDownData.lensDataByDomain.spirit[d.id]?.equilibrium ?? 0,
                        };
                        return (<React.Fragment key={d.id}><DataPoint title={d.name} subTitle={d.subName} data={mandalaData[d.id]} personalSpectrum={personalSpectrum} isExpandable isExpanded={!!expandedSections[d.id]} onToggleExpand={() => handleToggleExpand(d.id)} starGlyphs={qNodeGlyphs} lensEquilibriums={qLensEquilibriums} />{expandedSections[d.id] && <div className="pl-4 border-l-2 border-white/10 space-y-2 ml-2">{Object.entries(drillDownData.nodeDataByDomain[d.id]).map(([nodeName, nodeData]) => { const node = d.nodes.find(n=>n.name===nodeName)!; const isNodeExpanded = !!expandedNodes[nodeName]; return (<React.Fragment key={nodeName}><DataPoint title={nodeName} subTitle={attributeDefinitions[nodeName]?.description || ''} data={nodeData} personalSpectrum={personalSpectrum} isExpandable isExpanded={isNodeExpanded} onToggleExpand={() => handleToggleNodeExpand(nodeName)} />{isNodeExpanded && <div className="pl-4 border-l-2 border-white/5 space-y-1 ml-2 mt-2">{node.attributes.map(attr => <DataPoint key={attr.id} title={attr.name} subTitle="Lens Expression" data={{equilibrium: attr.value ?? 0, flux: 0}} personalSpectrum={personalSpectrum} />)}</div>}</React.Fragment>)})}</div>}</React.Fragment>)
                    })}
                    
                    {overviewTab === 'lenses' && LENSES_TABS_CONFIG.map(([key, title, subTitle]) => <React.Fragment key={key}><DataPoint title={title} subTitle={subTitle} data={lensData[key]} personalSpectrum={personalSpectrum} isExpandable isExpanded={!!expandedSections[key]} onToggleExpand={() => handleToggleExpand(key)} starGlyphs={lensNodeGlyphs[key]} />{expandedSections[key] && <div className="pl-4 border-l-2 border-white/10 space-y-2 ml-2">{domains.map(d => <DataPoint key={d.id} title={d.name} subTitle={`${title} Expression`} data={drillDownData.lensDataByDomain[key][d.id]} personalSpectrum={personalSpectrum} />)}</div>}</React.Fragment>)}
                    
                    {overviewTab === 'energies' && ENERGIES_TABS_CONFIG.map(([key, title, subTitle]) => <React.Fragment key={key}><DataPoint title={title} subTitle={subTitle} data={primaryEnergyData[key]} personalSpectrum={personalSpectrum} isExpandable isExpanded={!!expandedSections[key]} onToggleExpand={() => handleToggleExpand(key)} starGlyphs={energyNodeGlyphs[key]} />{expandedSections[key] && <div className="pl-4 border-l-2 border-white/10 space-y-2 ml-2">{drillDownData.nodesByEnergy[key as 'doing'|'being'|'seeing'|'feeling'].map(node => <DataPoint key={node.id} title={node.name} subTitle={attributeDefinitions[node.name]?.description || ''} data={allNodeAverages[node.name]} personalSpectrum={personalSpectrum} />)}</div>}</React.Fragment>)}
                    
                    {overviewTab === 'highlights' && <div className="space-y-6">
                        {cosmicHighlights ? <>
                            <div>
                                <h2 className="text-xl font-bold text-amber-300 mb-2">{uiStrings.pronounced}</h2>
                                <div className="flex overflow-x-auto gap-4 py-2">
                                    {cosmicHighlights.mostPronouncedNodes.map(highlight => (
                                        <div key={highlight.name} className="flex-shrink-0 w-11/12 sm:w-1/2 md:w-5/12 lg:w-1/3">
                                            <HighlightCard 
                                                title={highlight.name}
                                                context={attributeDefinitions[highlight.name]?.description || ''}
                                                label={getValueLabel(highlight.value)}
                                                labelColor={getAttributeColor(highlight.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-amber-300 mb-2">{uiStrings.balanced}</h2>
                                <div className="flex overflow-x-auto gap-4 py-2">
                                    {cosmicHighlights.mostBalancedNodes.map(highlight => (
                                        <div key={highlight.name} className="flex-shrink-0 w-11/12 sm:w-1/2 md:w-5/12 lg:w-1/3">
                                            <HighlightCard
                                                title={highlight.name}
                                                context={attributeDefinitions[highlight.name]?.description || ''}
                                                label={getValueLabel(highlight.value)}
                                                labelColor={getAttributeColor(highlight.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h2 className="text-xl font-bold text-amber-300 mb-2">{uiStrings.dynamic}</h2>
                                 <div className="flex overflow-x-auto gap-4 py-2">
                                   {cosmicHighlights.mostComplexDomains.map(highlight => (
                                        <div key={highlight.name} className="flex-shrink-0 w-11/12 sm:w-1/2 md:w-5/12 lg:w-1/3">
                                            <HighlightCard
                                                title={highlight.name}
                                                context={domains.find(d => d.name === highlight.name)?.description || ''}
                                                label="High Complexity"
                                                labelColor={'#a78bfa'}
                                            />
                                        </div>
                                   ))}
                                   {cosmicHighlights.mostHarmoniousDomains.map(highlight => (
                                        <div key={highlight.name} className="flex-shrink-0 w-11/12 sm:w-1/2 md:w-5/12 lg:w-1/3">
                                            <HighlightCard
                                                title={highlight.name}
                                                context={domains.find(d => d.name === highlight.name)?.description || ''}
                                                label="High Harmony"
                                                labelColor={'#a78bfa'}
                                            />
                                        </div>
                                   ))}
                                </div>
                            </div>
                        </> : <p className="text-slate-400">Define more energies to see your highlights.</p>}
                    </div>}
                </div>
            )}

            {/* --- PULSE READING (INQUIRY) CONTENT --- */}
            {viewMode === 'reading' && (
                <div className="flex flex-col h-full relative animate-fade-in">
                    {!inquiryData && !loading && (
                        <div className="text-center m-auto">
                            <h2 className="text-xl font-bold text-amber-300">{uiStrings.atlasIntro}</h2>
                            <p className="text-slate-400 mt-2 max-w-md mx-auto">{uiStrings.atlasIntroSub}</p>
                            <div className="flex gap-2 justify-center mt-6">
                                <button onClick={handleGenerateReading} className="px-6 py-2.5 bg-white/10 border border-white/20 rounded-full text-white/80 tracking-widest uppercase text-sm hover:bg-white/20 hover:text-white transition-all">{uiStrings.generateReading}</button>
                                <button onClick={handleCopyPrompt} className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs hover:bg-white/10 hover:text-white transition-all">{copyButtonText}</button>
                            </div>
                        </div>
                    )}
                    {loading && <div className="text-center m-auto text-slate-400 animate-pulse">{uiStrings.mapping}</div>}
                    {error && <div className="text-center m-auto text-red-400">{error}</div>}
                    
                    {inquiryData && (
                        <div className="flex flex-col h-full">
                            <div className="flex-shrink-0 mb-4">
                                <nav className="flex items-center gap-1 border border-white/10 bg-black/20 p-1 rounded-full overflow-x-auto w-full">
                                    {INQUIRY_TABS.map(tab => (
                                        <button key={tab.id} onClick={() => setActiveInquiryTab(tab.id as ActiveInquiryTab)} className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-colors whitespace-nowrap flex-1 sm:flex-none ${activeInquiryTab === tab.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}>{tab.label}</button>
                                    ))}
                                </nav>
                            </div>
                            {showPrompt && <div className="flex-shrink-0 bg-black/30 p-3 mb-4 rounded-md border border-white/10 text-xs text-slate-400 overflow-auto max-h-48"><pre className="whitespace-pre-wrap font-mono">{lastPromptRef.current}</pre></div>}
                            <div 
                                className="flex-grow bg-black/20 p-4 rounded-lg border border-white/5 text-slate-300 leading-relaxed overflow-y-auto min-h-0 pb-20 transition-all duration-300"
                                style={{ fontSize: `${textSizeMultiplier * 0.875}rem` }} // 0.875rem is Tailwind 'text-sm' base
                            >
                                {activeInquiryTab === 'summary' && <RichTextViewer text={inquiryData.summary} />}
                                {activeInquiryTab === 'strengths' && <div><h4 className="font-bold text-amber-300 mb-2">{inquiryData.strengths.title}</h4><RichTextViewer text={inquiryData.strengths.text} /></div>}
                                {activeInquiryTab === 'shadows' && <div><h4 className="font-bold text-amber-300 mb-2">{inquiryData.shadows.title}</h4><RichTextViewer text={inquiryData.shadows.text} /></div>}
                                {activeInquiryTab === 'archetypes' && <div className="space-y-4">{inquiryData.archetypes.map(arch => <div key={arch.name}><h4 className="font-bold text-amber-300"><RichTextViewer text={arch.name} /></h4><div className="mt-1"><RichTextViewer text={arch.description} /></div><p className="mt-2 italic text-slate-400">"{arch.mantra || 'Wisdom in silence.'}"</p></div>)}</div>}
                                {activeInquiryTab === 'balancingPractices' && <div className="space-y-4"><div><h4 className="font-bold text-amber-300">Doing & Being Balance</h4><RichTextViewer text={inquiryData.balancingPractices.masculineFeminine} /></div><div><h4 className="font-bold text-amber-300">Seeing & Feeling Balance</h4><RichTextViewer text={inquiryData.balancingPractices.lightDark} /></div></div>}
            
                                {/* Deepen the Inquiry Section */}
                                <div className="mt-8 border-t border-white/10 pt-6">
                                    <h4 className="text-amber-200 font-bold mb-3">{uiStrings.deepenInquiry}</h4>
                                    {!followUpResponse && !followUpLoading && (
                                        <div className="flex flex-wrap gap-2">
                                            {inquiryData.followUpPaths?.map((topic, i) => (
                                                <button 
                                                    key={i}
                                                    onClick={() => handleGenerateFollowUp(topic)}
                                                    className="text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-slate-300 hover:text-white transition-all"
                                                >
                                                    {topic}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {followUpLoading && <div className="text-slate-400 italic animate-pulse">Consulting the chart...</div>}
                                    {followUpResponse && (
                                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 mt-2 animate-fade-in">
                                            <h5 className="text-white font-bold mb-2">{activeFollowUpQuestion}</h5>
                                            <RichTextViewer text={followUpResponse} />
                                            <button onClick={() => setFollowUpResponse(null)} className="mt-4 text-xs text-amber-300 hover:underline">{uiStrings.explorePath}</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Utility Bar */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-xs shadow-xl z-20">
                                <button onClick={handleExportReading} className="px-3 py-1 text-slate-300 hover:bg-white/10 hover:text-white rounded-full transition-colors whitespace-nowrap">{uiStrings.exportReading}</button>
                                <div className="w-px h-4 bg-white/20"></div>
                                <button onClick={handleCopyPrompt} className="px-3 py-1 text-slate-300 hover:bg-white/10 hover:text-white rounded-full transition-colors whitespace-nowrap">{copyButtonText}</button>
                                <div className="w-px h-4 bg-white/20"></div>
                                <button onClick={() => setShowPrompt(p => !p)} className="px-3 py-1 text-slate-300 hover:bg-white/10 hover:text-white rounded-full transition-colors whitespace-nowrap">{showPrompt ? uiStrings.hidePrompt : uiStrings.showPrompt}</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default SoulAtlasView;