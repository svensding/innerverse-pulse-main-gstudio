
import React, { useState, useCallback, useEffect, useMemo, useRef, Suspense } from 'react';
import { Domain, Node, Language, InquiryData } from './types';
import { DOMAINS_DATA, ONBOARDING_STEPS, UI_STRINGS, ATTRIBUTE_DEFINITIONS } from './constants';
import { DOMAINS_DATA_ES, ONBOARDING_STEPS_ES, UI_STRINGS_ES, ATTRIBUTE_DEFINITIONS_ES } from './constants_es';
import { DOMAINS_DATA_NL, ONBOARDING_STEPS_NL, UI_STRINGS_NL, ATTRIBUTE_DEFINITIONS_NL } from './constants_nl';
import { calculateMandalaData, calculateLensData, calculatePrimaryEnergyData, calculatePersonalSpectrum } from './utils/cosmosAnalysis';
import SkyMap from './components/SkyMap';
import StarDetailView from './components/StarDetailView';
import Onboarding from './components/Onboarding';
import Modal from './components/Modal';
import IntroTextOverlay from './components/IntroTextOverlay';
import Background from './components/Background';
import PulseLogo from './components/icons/PulseLogo';
import EnterFullscreenIcon from './components/icons/EnterFullscreenIcon';
import ExitFullscreenIcon from './components/icons/ExitFullscreenIcon';
import MenuIcon from './components/icons/MenuIcon';
import ShareIcon from './components/icons/ShareIcon';
import SaveIcon from './components/icons/SaveIcon';
import LinkIcon from './components/icons/LinkIcon';
import RestartIcon from './components/icons/RestartIcon';
import ZoomInIcon from './components/icons/ZoomInIcon';
import ZoomOutIcon from './components/icons/ZoomOutIcon';
import BackIcon from './components/icons/BackIcon';

// Optimization: Lazy load the heavy Atlas view so it isn't in main bundle
const SoulAtlasView = React.lazy(() => import('./components/SoulAtlasView'));

const serializeDomains = (domainsData: Domain[]): string => {
  return domainsData
    .map(d =>
      d.nodes
        .map(n => n.attributes.map(a => (a.value === null ? '_' : a.value)).join(','))
        .join(';')
    )
    .join('|');
};

const deserializeDomains = (hash: string, baseData: Domain[]): Domain[] | null => {
  if (!hash) return null;
  try {
    // Decode the hash to handle browser-encoded characters (like %7C for |)
    const rawHash = window.location.hash.substring(1);
    const hash = decodeURIComponent(rawHash);
    
    const newDomains: Domain[] = JSON.parse(JSON.stringify(baseData));
    const domainParts = hash.split('|');

    if (domainParts.length !== newDomains.length) return null;

    for (let i = 0; i < domainParts.length; i++) {
      const nodeParts = domainParts[i].split(';');
      if (nodeParts.length !== newDomains[i].nodes.length) return null;

      for (let j = 0; j < nodeParts.length; j++) {
        const attrParts = nodeParts[j].split(',');
        if (attrParts.length !== newDomains[i].nodes[j].attributes.length) return null;

        for (let k = 0; k < attrParts.length; k++) {
          const value = attrParts[k];
          if (value === '_') {
            newDomains[i].nodes[j].attributes[k].value = null;
          } else {
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
              newDomains[i].nodes[j].attributes[k].value = numValue;
            } else {
              newDomains[i].nodes[j].attributes[k].value = null; 
            }
          }
        }
      }
    }
    return newDomains;
  } catch (e) {
    console.error('[State Deserialization] Failed:', e);
    return null;
  }
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Computed constants based on language
  const currentConstants = useMemo(() => {
      if (language === 'es') {
          return { domains: DOMAINS_DATA_ES, steps: ONBOARDING_STEPS_ES, ui: UI_STRINGS_ES, attributes: ATTRIBUTE_DEFINITIONS_ES };
      } else if (language === 'nl') {
          return { domains: DOMAINS_DATA_NL, steps: ONBOARDING_STEPS_NL, ui: UI_STRINGS_NL, attributes: ATTRIBUTE_DEFINITIONS_NL };
      } else {
          return { domains: DOMAINS_DATA, steps: ONBOARDING_STEPS, ui: UI_STRINGS, attributes: ATTRIBUTE_DEFINITIONS };
      }
  }, [language]);

  // Initial State Logic
  const getInitialState = () => {
    try {
      // Decode the hash to handle browser-encoded characters (like %7C for |)
      const rawHash = window.location.hash.substring(1);
      const hash = decodeURIComponent(rawHash);
      
      const searchParams = new URLSearchParams(window.location.search);
      const sharedName = searchParams.get('name');
      const langParam = searchParams.get('lang');
      
      // Determine language (Default EN)
      let initialLang: Language = 'en';
      if (langParam === 'es') initialLang = 'es';
      if (langParam === 'nl') initialLang = 'nl';
      
      // Select base data based on initial language
      let baseData = DOMAINS_DATA;
      if (initialLang === 'es') baseData = DOMAINS_DATA_ES;
      else if (initialLang === 'nl') baseData = DOMAINS_DATA_NL;

      const defaultState = { initialDomains: baseData, initialCompleted: {}, isReadOnly: false, viewingName: null, lang: initialLang };

      if (!hash) return defaultState;
      const deserialized = deserializeDomains(hash, baseData);

      if (deserialized) {
        const initialCompleted: Record<string, boolean> = {};
        deserialized.forEach(d => {
          const isComplete = d.nodes.every(n => n.attributes.every(a => a.value !== null));
          if (isComplete) initialCompleted[d.id] = true;
        });
        return { initialDomains: deserialized, initialCompleted, isReadOnly: !!sharedName, viewingName: sharedName, lang: initialLang };
      }
      return defaultState;
    } catch (e) {
      console.error("[State Init] Critical error", e);
      return { initialDomains: DOMAINS_DATA, initialCompleted: {}, isReadOnly: false, viewingName: null, lang: 'en' as Language };
    }
  };

  const [initialState] = useState(() => getInitialState());
  
  // Sync initial language state
  useEffect(() => {
      if (initialState.lang !== language) setLanguage(initialState.lang);
  }, []); // Run once

  const [domains, setDomains] = useState<Domain[]>(initialState.initialDomains);
  const [activeDomain, setActiveDomain] = useState<Domain | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [completedDomains, setCompletedDomains] = useState<Record<string, boolean>>(initialState.initialCompleted);
  const [awakenedNodeId, setAwakenedNodeId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAtlasViewActive, setIsAtlasViewActive] = useState(false);
  
  const [isReadOnly, setIsReadOnly] = useState(initialState.isReadOnly);
  const [viewingName, setViewingName] = useState<string | null>(initialState.viewingName);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareName, setShareName] = useState('');

  // Lifted state for the Reading, so it persists across view toggles
  const [inquiryData, setInquiryData] = useState<InquiryData | null>(null);

  const skyMapRef = useRef<{ zoomIn: () => void; zoomOut: () => void; reset: () => void }>(null);

  const definedNodesCount = useMemo(() => {
    return domains.flatMap(d => d.nodes).filter(n => n.attributes.every(a => a.value !== null)).length;
  }, [domains]);

  const [showInitialOnboarding, setShowInitialOnboarding] = useState(definedNodesCount < 24 && !initialState.isReadOnly && !window.location.hash);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [firstCompletionDomain, setFirstCompletionDomain] = useState<Domain | null>(null);
  const [hasSeenDomainGuide, setHasSeenDomainGuide] = useState(false);
  const [domainIntro, setDomainIntro] = useState<{ texts: string[], step: number } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // --- WAKE LOCK LOGIC ---
  const [shouldKeepAwake, setShouldKeepAwake] = useState(false);
  const wakeLockRef = useRef<any>(null);

  const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
      try {
        // @ts-ignore
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        console.log('Screen Wake Lock acquired');
      } catch (err) {
        console.error(`Wake Lock Error: ${err}`);
      }
    }
  };

  const releaseWakeLock = async () => {
      if(wakeLockRef.current) {
          try {
              await wakeLockRef.current.release();
              wakeLockRef.current = null;
              console.log('Screen Wake Lock released');
          } catch(err) { console.error(err); }
      }
  };

  // Re-acquire if visibility changes and we want it kept awake
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (shouldKeepAwake && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [shouldKeepAwake]);

  const toggleWakeLock = async () => {
      if (!shouldKeepAwake) {
          setShouldKeepAwake(true);
          await requestWakeLock();
      } else {
          setShouldKeepAwake(false);
          await releaseWakeLock();
      }
  };

  // --- VIEWPORT HEIGHT FIX FOR MOBILE ---
  useEffect(() => {
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    
    setAppHeight();
    window.addEventListener('resize', setAppHeight);
    
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  // --- LANGUAGE SWITCHING LOGIC ---
  const handleLanguageChange = (newLang: Language) => {
      setLanguage(newLang);
      
      let targetBaseData;
      if (newLang === 'es') targetBaseData = DOMAINS_DATA_ES;
      else if (newLang === 'nl') targetBaseData = DOMAINS_DATA_NL;
      else targetBaseData = DOMAINS_DATA;
      
      // Migrate current values to new language structure
      setDomains(prevDomains => {
          return targetBaseData.map((d, dIdx) => ({
              ...d,
              nodes: d.nodes.map((n, nIdx) => ({
                  ...n,
                  // Copy values from previous state
                  attributes: n.attributes.map((a, aIdx) => ({
                      ...a,
                      value: prevDomains[dIdx]?.nodes[nIdx]?.attributes[aIdx]?.value ?? null
                  }))
              }))
          }));
      });
      
      // Migrate Active Domain
      if (activeDomain) {
          const newActive = targetBaseData.find(d => d.id === activeDomain.id);
          if (newActive) setActiveDomain(newActive);
      }
      // Migrate Selected Node
      if (selectedNode) {
           const dId = selectedNode.id.split('-')[0];
           // Find matching node in target data by ID (ID is consistent across languages)
           const newDomain = targetBaseData.find(d => d.id === dId);
           const newNode = newDomain?.nodes.find(n => n.id === selectedNode.id);
           
           if (newNode) {
               // Must attach current values
               const currentValues = selectedNode.attributes.map(a => a.value);
               const updatedNode = {
                   ...newNode,
                   attributes: newNode.attributes.map((a, i) => ({ ...a, value: currentValues[i] }))
               };
               setSelectedNode(updatedNode);
           }
      }
  };

  const { mandalaData, lensData, primaryEnergyData, personalSpectrum } = useMemo(() => {
    const mandalaData = calculateMandalaData(domains);
    const lensData = calculateLensData(domains);
    const primaryEnergyData = calculatePrimaryEnergyData(domains);
    const personalSpectrum = calculatePersonalSpectrum(domains);
    return { mandalaData, lensData, primaryEnergyData, personalSpectrum };
  }, [domains]);

  useEffect(() => {
    const hasData = domains.some(d => d.nodes.some(n => n.attributes.some(a => a.value !== null)));
    try {
      const protocol = window.location.protocol;
      const isRestrictedEnv = protocol === 'blob:' || protocol === 'file:';

      if (hasData) {
        const serializedData = serializeDomains(domains);
        const newHash = '#' + serializedData;
        
        // Also update URL param for lang
        let url;
        try {
            url = new URL(window.location.href);
        } catch(e) {
            // If URL parsing fails, just update hash and return
            if (window.location.hash !== newHash) {
                window.location.hash = newHash;
            }
            return;
        }

        if (language === 'es') url.searchParams.set('lang', 'es');
        else if (language === 'nl') url.searchParams.set('lang', 'nl');
        else url.searchParams.delete('lang');
        
        // We decode current hash to compare properly (avoid %7C vs | mismatches)
        const currentHashDecoded = decodeURIComponent(window.location.hash);
        
        const hashChanged = currentHashDecoded !== newHash;
        const searchChanged = url.search !== window.location.search;

        if (hashChanged || searchChanged) {
             if (isRestrictedEnv) {
                 // In restricted environments, we prioritize the hash (data state) and skip replaceState
                 if (hashChanged) {
                     window.location.hash = newHash;
                 }
             } else {
                 const newUrl = url.pathname + url.search + newHash;
                 window.history.replaceState(null, '', newUrl);
             }
        }
      } else {
        const url = new URL(window.location.href);
        if (language === 'es') url.searchParams.set('lang', 'es');
        else if (language === 'nl') url.searchParams.set('lang', 'nl');
        else url.searchParams.delete('lang');
        
        // If we want to clear the hash when no data
        if (window.location.hash || url.search !== window.location.search) {
             if (isRestrictedEnv) {
                 if (window.location.hash) window.location.hash = '';
             } else {
                 window.history.replaceState(null, '', url.pathname + url.search);
             }
        }
      }
    } catch (e) { 
        // Ignore errors in constrained environments
        if (window.location.protocol !== 'blob:' && window.location.protocol !== 'file:') {
            console.warn("State Sync Error", e); 
        }
    }
  }, [domains, isReadOnly, language]);
  
  useEffect(() => {
    if (!domainIntro) return;
    const timer = setTimeout(() => {
        if (domainIntro.step < domainIntro.texts.length - 1) {
            setDomainIntro(q => q ? { ...q, step: q.step + 1 } : null);
        } else {
            setDomainIntro(null);
        }
    }, 4000);
    return () => clearTimeout(timer);
  }, [domainIntro]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleOnboardingComplete = () => {
    setShowInitialOnboarding(false);
    setOnboardingStep(99); // Ensure we jump to "Complete" state
  };
  
  const handleBack = useCallback(() => {
      if (selectedNode) setSelectedNode(null);
      else if (activeDomain) setActiveDomain(null);
      else if (isAtlasViewActive) setIsAtlasViewActive(false);
  }, [selectedNode, activeDomain, isAtlasViewActive]);

  const handleGoHome = useCallback(() => {
    setActiveDomain(null);
    setSelectedNode(null);
    setIsAtlasViewActive(false);
  }, []);

  const handleSelectDomain = useCallback((domain: Domain) => {
    const hasDefinedNodes = domain.nodes.some(n => n.attributes.some(a => a.value !== null));
    if (!hasSeenDomainGuide && !showInitialOnboarding && !hasDefinedNodes && !isReadOnly) {
        // Need to localize this dynamic guide too
        let t1 = `You've entered the <strong>${domain.name}</strong> realm, a space of <strong>${domain.subName}</strong>.`;
        let t2 = `Select a node to begin defining its flow.`;
        
        if (language === 'es') {
            t1 = `Has entrado en el reino de <strong>${domain.name}</strong>, un espacio de <strong>${domain.subName}</strong>.`;
            t2 = `Selecciona un nodo para comenzar a definir su flujo.`;
        } else if (language === 'nl') {
            t1 = `Je hebt het domein van <strong>${domain.name}</strong> betreden, een ruimte van <strong>${domain.subName}</strong>.`;
            t2 = `Selecteer een knooppunt om de stroom te definiëren.`;
        }
        
        setDomainIntro({
            texts: [t1, t2],
            step: 0
        });
        setHasSeenDomainGuide(true);
    }
    setActiveDomain(domain);
    setSelectedNode(null);
  }, [hasSeenDomainGuide, showInitialOnboarding, isReadOnly, language]);

  const handleSelectNode = useCallback((node: Node) => {
    setSelectedNode(node);
  }, []);
  
  const handleCloseDetailPanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleAttributeChange = useCallback((nodeId: string, attributeId: string, value: number) => {
    if (isReadOnly) return;
    
    setDomains(prevDomains => prevDomains.map(d => {
        if (!d.nodes.some(n => n.id === nodeId)) return d;
        return {
            ...d,
            nodes: d.nodes.map(n => {
                if (n.id === nodeId) {
                    return { ...n, attributes: n.attributes.map(a => a.id === attributeId ? { ...a, value } : a) };
                }
                return n;
            }),
        };
    }));
    
    if (selectedNode && selectedNode.id === nodeId) {
        setSelectedNode(prev => prev ? { ...prev, attributes: prev.attributes.map(a => a.id === attributeId ? { ...a, value } : a) } : null);
    }
  }, [selectedNode, isReadOnly]);
  
  const allNodes = useMemo(() => domains.flatMap(d => d.nodes), [domains]);
  const currentNodeIndex = selectedNode ? allNodes.findIndex(n => n.id === selectedNode.id) : -1;
  const isMapComplete = definedNodesCount === 24;
  const isLastGlobalNode = currentNodeIndex === allNodes.length - 1;
  
  const handleRequestReset = useCallback(() => {
    setShowResetConfirm(true);
    setShowMenu(false);
  }, []);

  const handleConfirmReset = useCallback(() => {
    setDomains(JSON.parse(JSON.stringify(currentConstants.domains)));
    setCompletedDomains({});
    setActiveDomain(null);
    setSelectedNode(null);
    setIsAtlasViewActive(false);
    setShowInitialOnboarding(true);
    setOnboardingStep(0);
    setShowResetConfirm(false);
    setIsReadOnly(false);
    setViewingName(null);
    setInquiryData(null); // Clear reading
    window.location.hash = '';
    const url = new URL(window.location.href);
    window.history.replaceState({}, document.title, url.pathname + url.search);
  }, [currentConstants]);

  const handleNavigateNode = (direction: 'next' | 'prev') => {
      if (currentNodeIndex === -1) return;
      
      // If Map is complete, the "Next" button behaves as "Finish" (Check)
      if (direction === 'next' && isMapComplete) {
          handleCloseDetailPanel();
          handleGoHome(); 
          return;
      }

      let nextIndex;
      if (direction === 'next') {
          nextIndex = (currentNodeIndex + 1) % allNodes.length;
      } else {
          nextIndex = (currentNodeIndex - 1 + allNodes.length) % allNodes.length;
      }

      const nextNode = allNodes[nextIndex];
      const nextNodeDomain = domains.find(d => d.nodes.some(n => n.id === nextNode.id));
      if (nextNodeDomain) {
          if (activeDomain?.id !== nextNodeDomain.id) setActiveDomain(nextNodeDomain);
          setSelectedNode(nextNode);
      }
  };

  const showDetailPanel = !!selectedNode;
  const handleEnterAtlasView = useCallback(() => { if (definedNodesCount > 0) { setIsAtlasViewActive(true); setActiveDomain(null); setSelectedNode(null); } }, [definedNodesCount]);
  
  // Disable zoom buttons during onboarding, EXCEPT at step 24 (Expressions pause)
  const canZoom = !showInitialOnboarding || onboardingStep === 24;
  const handleZoomIn = () => { if(canZoom) skyMapRef.current?.zoomIn(); };
  const handleZoomOut = () => { if(canZoom) skyMapRef.current?.zoomOut(); };

  const handleToggleFullscreen = useCallback(async () => { 
      if (!document.fullscreenElement) { 
          await document.documentElement.requestFullscreen().catch(() => {});
          if (!shouldKeepAwake) {
              setShouldKeepAwake(true);
              requestWakeLock();
          }
      } else { 
          if (document.exitFullscreen) document.exitFullscreen(); 
      } 
  }, [shouldKeepAwake]);

  const handleShare = () => { if (shareName.trim()) { 
      const langParam = language === 'es' ? '&lang=es' : (language === 'nl' ? '&lang=nl' : '');
      const url = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(shareName)}${langParam}${window.location.hash}`; 
      navigator.clipboard.writeText(url).then(() => { alert(`${currentConstants.ui.linkCopied}`); setShowShareModal(false); setShowMenu(false); }); 
  } };
  const handleSave = () => { const url = window.location.href; navigator.clipboard.writeText(url).then(() => { alert(currentConstants.ui.linkSaved); setShowMenu(false); }); };
  
  // Clean glass style without blur for better performance
  const glassPanelStyle = "bg-black/40 border border-white/10 shadow-2xl transition-all duration-300";

  return (
    <main 
      data-name="main-app-container" 
      className="fixed top-0 left-0 w-full text-slate-200 font-light overflow-hidden bg-slate-950"
      style={{ height: 'var(--app-height, 100vh)' }}
    >
      
      {/* 1. Global Background Atmosphere */}
      <Background onboardingStep={showInitialOnboarding ? onboardingStep : 99} />
      
      {/* 2. Onboarding UI Layer */}
      {showInitialOnboarding && (
          <Onboarding 
            onComplete={handleOnboardingComplete} 
            onStepChange={setOnboardingStep} 
            steps={currentConstants.steps} 
            uiStrings={currentConstants.ui} 
            language={language} 
            onLanguageChange={handleLanguageChange}
            toggleWakeLock={toggleWakeLock}
            isWakeLockActive={shouldKeepAwake}
          />
      )}
      <IntroTextOverlay text={domainIntro ? domainIntro.texts[domainIntro.step] : null} />
      
      {/* 3. Pulse Reading View (Atlas) - LAZY LOADED WITH SUSPENSE */}
      {isAtlasViewActive && (
        <Suspense fallback={<div className="fixed inset-0 z-[60] bg-slate-950/90 flex items-center justify-center text-amber-300 animate-pulse font-light tracking-widest text-sm">Opening Reading...</div>}>
            <SoulAtlasView 
                domains={domains} 
                mandalaData={mandalaData} 
                lensData={lensData} 
                primaryEnergyData={primaryEnergyData} 
                personalSpectrum={personalSpectrum} 
                onClose={handleGoHome} 
                uiStrings={currentConstants.ui} 
                attributeDefinitions={currentConstants.attributes} 
                language={language} 
                inquiryData={inquiryData}
                setInquiryData={setInquiryData}
            />
        </Suspense>
      )}

      {/* Share Modal */}
      <Modal show={showShareModal} title={currentConstants.ui.shareInnerverse} onClose={() => setShowShareModal(false)}>
          <div className="text-left space-y-4">
              <p className="text-slate-300">
                  {language === 'es' ? "Ingresa tu nombre para personalizar el enlace." : 
                   language === 'nl' ? "Vul je naam in om de link te personaliseren." :
                   "Enter your name to personalize the link."}
              </p>
              <input type="text" placeholder={language === 'es' ? "Tu Nombre" : language === 'nl' ? "Jouw Naam" : "Your Name"} value={shareName} onChange={e => setShareName(e.target.value)} className="w-full bg-black/30 border border-white/20 rounded p-2 text-white outline-none focus:border-amber-400" />
              <button onClick={handleShare} className="w-full py-2 bg-amber-600/20 hover:bg-amber-600/40 text-amber-200 border border-amber-500/30 rounded tracking-widest text-xs transition-colors">{currentConstants.ui.copyLink}</button>
          </div>
      </Modal>

      <Modal show={!!firstCompletionDomain} title={currentConstants.ui.domainAwakens} onClose={() => setFirstCompletionDomain(null)}>
        <p className="text-slate-300 mb-6">
            {language === 'es' ? `Has despertado el dominio de **${firstCompletionDomain?.name}**!` : 
             language === 'nl' ? `Je hebt het domein van **${firstCompletionDomain?.name}** ontwaakt!` :
             `You have awakened the **${firstCompletionDomain?.name}** domain!`}
        </p>
        <button onClick={() => setFirstCompletionDomain(null)} className="px-6 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm hover:text-white">{currentConstants.ui.continue}</button>
      </Modal>

      <Modal show={showResetConfirm} title={currentConstants.ui.restartTitle} onClose={() => setShowResetConfirm(false)}>
        <p className="text-slate-300 mb-6">{currentConstants.ui.restartConfirm}</p>
        <div className="flex justify-center gap-4">
            <button onClick={() => setShowResetConfirm(false)} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs hover:text-white">{currentConstants.ui.cancel}</button>
            <button onClick={handleConfirmReset} className="px-6 py-2 bg-orange-500/20 border border-orange-500/40 rounded-full text-orange-200 text-xs hover:text-white">{currentConstants.ui.confirm}</button>
        </div>
      </Modal>

      <div data-name="app-layout-grid" className={`relative z-10 w-full h-full flex flex-col md:flex-row`}>
        <div data-name="map-column" className={`relative w-full transition-all duration-1000 ease-in-out ${showDetailPanel ? 'h-1/3 md:h-full md:w-2/3 cursor-pointer' : 'h-full'}`} onClick={showDetailPanel ? handleCloseDetailPanel : undefined}>
          <SkyMap ref={skyMapRef} domains={domains} activeDomain={activeDomain} selectedNode={selectedNode} completedDomains={completedDomains} awakenedNodeId={awakenedNodeId} onSelectDomain={handleSelectDomain} onSelectNode={handleSelectNode} onboardingStep={showInitialOnboarding ? onboardingStep : 99} lensData={lensData} primaryEnergyData={primaryEnergyData} onEnterAtlas={handleEnterAtlasView} onDeselect={handleBack} definedNodesCount={definedNodesCount} uiStrings={currentConstants.ui} />
        </div>
        
        {/* Detail Panel - Clean Glass Style */}
        <aside 
            data-name="detail-panel" 
            className={`
                border-t md:border-t-0 md:border-l border-white/10 
                transition-all duration-1000 ease-in-out 
                ${showDetailPanel ? 'h-2/3 md:h-full md:w-1/3' : 'h-0 md:h-full md:w-0' } 
                overflow-y-auto
                bg-black/40 shadow-2xl
            `}
        >
           {selectedNode && <StarDetailView 
                key={selectedNode.id} 
                star={selectedNode} 
                isAwakening={awakenedNodeId === selectedNode.id} 
                onAttributeChange={handleAttributeChange} 
                onSelectNext={() => handleNavigateNode('next')} 
                onSelectPrev={() => handleNavigateNode('prev')} 
                hasNext={true} 
                hasPrev={true} 
                readOnly={isReadOnly} 
                attributeDefinitions={currentConstants.attributes} 
                isMapComplete={isMapComplete}
                isLastGlobalNode={isLastGlobalNode}
                uiStrings={currentConstants.ui}
            />}
        </aside>
      </div>

      <div data-name="header-logo-area" className="absolute top-0 left-0 p-4 md:p-8 z-30 pointer-events-none">
          <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-4 pointer-events-auto">
                  {/* Pulse Logo - Always visible in Map View unless in Atlas */}
                  {!isAtlasViewActive && <button onClick={handleGoHome}><PulseLogo label={currentConstants.ui.pulse} /></button>}
              </div>
              
              {/* Domain Info - Row 2 */}
              {activeDomain && (
                  <div className="flex items-start gap-4 animate-fade-in pointer-events-none">
                      {/* Back Icon - Row 2 */}
                      {!isAtlasViewActive && (
                          <button onClick={handleBack} className="text-white/70 hover:text-white transition-colors mt-1 pointer-events-auto">
                              <BackIcon />
                          </button>
                      )}
                      <div className="text-white/80 transition-opacity duration-500 animate-fade-in">
                          <h2 className="text-xl md:text-2xl font-bold">{activeDomain.name} <span className="hidden md:inline font-light">: {activeDomain.subName}</span></h2>
                          <p className={`text-sm md:text-base max-w-sm transition-all duration-500 overflow-hidden ${showDetailPanel ? 'opacity-0 max-h-0' : 'opacity-100 max-h-40'}`}>{activeDomain.description}</p>
                      </div>
                  </div>
              )}
          </div>
      </div>

      <div data-name="header-menu-area" className={`absolute top-0 right-0 p-4 md:p-8 z-30 flex items-center gap-4 transition-all duration-1000 ease-in-out ${showDetailPanel ? 'md:right-1/3' : ''} pointer-events-none`}>
        {/* Count removed from top-right, moved to bottom-left */}
        <div className="relative pointer-events-auto">
            <button onClick={() => setShowMenu(p => !p)} className={`p-3 rounded-full text-white/70 hover:text-white ${glassPanelStyle}`}><MenuIcon /></button>
            {/* Menu Dropdown - Clean Glass Style */}
            {showMenu && <div className={`absolute top-full right-0 mt-2 w-48 rounded-xl overflow-hidden animate-fade-in flex flex-col py-1 ${glassPanelStyle}`}>
                    
                    {/* Menu Lang Toggle */}
                    <div className="flex border-b border-white/5">
                        <button onClick={() => handleLanguageChange('en')} className={`flex-1 py-2 text-xs font-bold ${language==='en' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>EN</button>
                        <div className="w-px bg-white/10"></div>
                        <button onClick={() => handleLanguageChange('es')} className={`flex-1 py-2 text-xs font-bold ${language==='es' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>ES</button>
                        <div className="w-px bg-white/10"></div>
                        <button onClick={() => handleLanguageChange('nl')} className={`flex-1 py-2 text-xs font-bold ${language==='nl' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>NL</button>
                    </div>

                    {!isReadOnly && <><button onClick={() => setShowShareModal(true)} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 text-left"><ShareIcon /> {currentConstants.ui.shareInnerverse}</button><button onClick={handleSave} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 text-left border-b border-white/5"><SaveIcon /> {currentConstants.ui.saveProgress}</button></>}
                    {isReadOnly && <button onClick={handleSave} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 text-left border-b border-white/5"><LinkIcon /> {currentConstants.ui.copyLink}</button>}
                    <button onClick={handleRequestReset} className="flex items-center gap-3 px-4 py-3 text-sm text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 text-left"><RestartIcon /> {currentConstants.ui.restart}</button>
                </div>}
        </div>
      </div>

      {isReadOnly && <div data-name="readonly-banner" className={`absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-full flex items-center gap-4 animate-fade-in ${glassPanelStyle}`}><span className="text-sm text-indigo-200">{currentConstants.ui.viewing} <strong>{viewingName || 'Shared'}</strong></span><button onClick={handleConfirmReset} className="px-4 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs uppercase tracking-widest text-white transition-colors">{currentConstants.ui.mapYourOwn}</button></div>}

      {/* 
         BOTTOM LEFT CONTROLS: Counter + Atlas Button 
         - HIDE DURING ONBOARDING
      */}
      {!isAtlasViewActive && !isReadOnly && !showInitialOnboarding && (
        <div 
          data-name="bottom-controls-left" 
          className={`absolute left-0 p-4 md:p-8 z-30 transition-all duration-1000 ease-in-out pointer-events-none flex flex-col items-start gap-4 ${showDetailPanel ? 'bottom-2/3 md:bottom-0 mb-2 md:mb-0' : 'bottom-0'}`}
        >
             {/* Progress Counter */}
             <span className="text-sm text-white/60 tracking-wider pointer-events-auto pl-2">
                {definedNodesCount} / 24 {currentConstants.ui.defined}
             </span>

             {/* Check Pulse Button - Only shows when map is complete (24/24) */}
             {isMapComplete && (
                <div className="animate-fade-in pointer-events-auto">
                    <button 
                        onClick={handleEnterAtlasView} 
                        className={`
                            px-6 py-3 rounded-full text-white/90 text-sm tracking-widest uppercase 
                            hover:text-white hover:scale-105 transition-all duration-300
                            ${glassPanelStyle} animate-fade-in-up
                        `}
                        style={{ animationDuration: '1s' }}
                    >
                        <div className="flex items-center gap-2">
                            {currentConstants.ui.openAtlas}
                        </div>
                    </button>
                </div>
             )}
        </div>
      )}

      {/* ZOOM CONTROLS (Bottom Right) - High Z-Index to allow Fullscreen click on first screen */}
      <div 
          data-name="zoom-controls-area" 
          className={`absolute right-0 p-4 md:p-8 z-[60] transition-all duration-1000 ease-in-out pointer-events-none ${showDetailPanel ? 'hidden md:flex md:right-1/3 md:bottom-0 md:mb-0' : 'bottom-0'}`}
      >
        {!isAtlasViewActive && (
            <div className="flex flex-col gap-3 items-end">
                 {/* Zoom Controls - Conditional Opacity & Vertical Stack */}
                 <div className={`flex flex-col items-center rounded-full text-white/70 py-1 transition-all duration-500 pointer-events-auto ${!canZoom ? 'opacity-0 h-0 overflow-hidden' : 'opacity-30 hover:opacity-100'} ${glassPanelStyle}`}>
                    <button onClick={handleZoomIn} className={`px-3 py-2 text-xl transition-colors hover:text-white`}><ZoomInIcon /></button>
                    <div className="h-px w-4 bg-white/20"></div>
                    <button onClick={handleZoomOut} className={`px-3 py-2 text-xl transition-colors hover:text-white`}><ZoomOutIcon /></button>
                </div>

                {/* Fullscreen - Always visible */}
                <button onClick={handleToggleFullscreen} className={`px-4 py-4 hover:text-white transition-colors rounded-full text-white/70 pointer-events-auto ${glassPanelStyle}`}>
                    {isFullscreen ? <ExitFullscreenIcon /> : <EnterFullscreenIcon />}
                </button>
            </div>
        )}
      </div>
    </main>
  );
};

export default App;