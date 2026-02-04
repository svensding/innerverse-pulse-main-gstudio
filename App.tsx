
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Domain, Node, InquiryData, Language, LensData, PrimaryEnergyData, MandalaData, PersonalSpectrum } from './types';
import { DOMAINS_DATA, UI_STRINGS, ONBOARDING_STEPS, ATTRIBUTE_DEFINITIONS } from './constants';
import { DOMAINS_DATA_ES, UI_STRINGS_ES, ONBOARDING_STEPS_ES, ATTRIBUTE_DEFINITIONS_ES } from './constants_es';
import { DOMAINS_DATA_NL, UI_STRINGS_NL, ONBOARDING_STEPS_NL, ATTRIBUTE_DEFINITIONS_NL } from './constants_nl';
import { calculateMandalaData, calculateLensData, calculatePrimaryEnergyData, calculatePersonalSpectrum } from './utils/cosmosAnalysis';

import Background from './components/Background';
import SkyMap from './components/SkyMap';
import StarDetailView from './components/StarDetailView';
import SoulAtlasView from './components/SoulAtlasView';
import Onboarding from './components/Onboarding';
import Modal from './components/Modal';
import IntroTextOverlay from './components/IntroTextOverlay';
import ConstellationInsight from './components/ConstellationInsight';
import InsightReadyIndicator from './components/InsightReadyIndicator';

import PulseLogo from './components/icons/PulseLogo';
import BackIcon from './components/icons/BackIcon';
import MenuIcon from './components/icons/MenuIcon';
import ShareIcon from './components/icons/ShareIcon';
import SaveIcon from './components/icons/SaveIcon';
import LinkIcon from './components/icons/LinkIcon';
import RestartIcon from './components/icons/RestartIcon';
import CloseIcon from './components/icons/CloseIcon';

const glassPanelStyle = "bg-black/20 backdrop-blur-xl border border-white/10 shadow-xl";

const App: React.FC = () => {
  // --- STATE ---
  const [language, setLanguage] = useState<Language>('en');
  const [domains, setDomains] = useState<Domain[]>(DOMAINS_DATA);
  const [activeDomain, setActiveDomain] = useState<Domain | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showInitialOnboarding, setShowInitialOnboarding] = useState(true);
  const [isAtlasViewActive, setIsAtlasViewActive] = useState(false);
  const [isWakeLockActive, setIsWakeLockActive] = useState(false);
  
  // UI State
  const [showMenu, setShowMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [introText, setIntroText] = useState<string | null>(null);
  
  // Data / Persistence
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [viewingName, setViewingName] = useState<string | null>(null);
  const [inquiryData, setInquiryData] = useState<InquiryData | null>(null);
  
  // Constellation Insight State
  const [showInsight, setShowInsight] = useState(false);
  const [completedDomains, setCompletedDomains] = useState<Record<string, boolean>>({});

  const skyMapRef = useRef<{ zoomIn: () => void; zoomOut: () => void; reset: () => void }>(null);
  const wakeLockSentinel = useRef<WakeLockSentinel | null>(null);

  // --- DERIVED CONSTANTS ---
  const currentConstants = useMemo(() => {
      switch (language) {
          case 'es': return { domains: DOMAINS_DATA_ES, ui: UI_STRINGS_ES, steps: ONBOARDING_STEPS_ES, definitions: ATTRIBUTE_DEFINITIONS_ES };
          case 'nl': return { domains: DOMAINS_DATA_NL, ui: UI_STRINGS_NL, steps: ONBOARDING_STEPS_NL, definitions: ATTRIBUTE_DEFINITIONS_NL };
          default: return { domains: DOMAINS_DATA, ui: UI_STRINGS, steps: ONBOARDING_STEPS, definitions: ATTRIBUTE_DEFINITIONS };
      }
  }, [language]);

  // Merge current values into localized domains when language changes
  useEffect(() => {
    setDomains(prevDomains => {
        const newDomains = JSON.parse(JSON.stringify(currentConstants.domains));
        // Preserve values
        prevDomains.forEach((d, dIdx) => {
            d.nodes.forEach((n, nIdx) => {
                const targetNode = newDomains[dIdx]?.nodes[nIdx];
                if (targetNode) {
                    targetNode.attributes = n.attributes.map((a, aIdx) => ({
                        ...targetNode.attributes[aIdx],
                        value: a.value
                    }));
                }
            });
        });
        return newDomains;
    });
  }, [currentConstants]);

  // --- COMPUTED DATA ---
  const mandalaData: MandalaData = useMemo(() => calculateMandalaData(domains), [domains]);
  const lensData: LensData = useMemo(() => calculateLensData(domains), [domains]);
  const primaryEnergyData: PrimaryEnergyData = useMemo(() => calculatePrimaryEnergyData(domains), [domains]);
  const personalSpectrum: PersonalSpectrum = useMemo(() => calculatePersonalSpectrum(domains), [domains]);
  
  const definedNodesCount = useMemo(() => 
    domains.flatMap(d => d.nodes).filter(n => n.attributes.some(a => a.value !== null)).length, 
  [domains]);

  const showDetailPanel = !!selectedNode;
  const isMapComplete = definedNodesCount === 24;

  // --- HANDLERS ---
  
  const toggleWakeLock = async () => {
    if (!('wakeLock' in navigator)) return;
    try {
        if (!isWakeLockActive) {
            wakeLockSentinel.current = await navigator.wakeLock.request('screen');
            setIsWakeLockActive(true);
        } else {
            if (wakeLockSentinel.current) await wakeLockSentinel.current.release();
            wakeLockSentinel.current = null;
            setIsWakeLockActive(false);
        }
    } catch (err) {
        console.error('Wake Lock Error:', err);
    }
  };

  const handleLanguageChange = (lang: Language) => {
      setLanguage(lang);
      setShowMenu(false);
  };

  const handleGoHome = () => {
      setActiveDomain(null);
      setSelectedNode(null);
      setIsAtlasViewActive(false);
      setShowInsight(false);
      skyMapRef.current?.reset();
  };

  const handleBack = () => {
      if (selectedNode) {
          setSelectedNode(null);
          if (activeDomain) {
              // Zoom back to active domain
          }
      } else if (activeDomain) {
          setActiveDomain(null);
          skyMapRef.current?.reset();
      }
  };

  const handleSelectDomain = (domain: Domain) => {
      setActiveDomain(domain);
      // Intro text for domain
      setIntroText(`<span class="text-amber-300 font-bold">${domain.name}</span><br/><span class="text-sm text-slate-300">${currentConstants.ui.domainAwakens}</span>`);
  };

  const handleSelectNode = (node: Node) => {
      setSelectedNode(node);
      setIntroText(null); // Clear overlays when entering detail
  };

  const handleAttributeChange = (nodeId: string, attrId: string, value: number) => {
      setDomains(prev => {
          const next = [...prev];
          for (const d of next) {
              const n = d.nodes.find(node => node.id === nodeId);
              if (n) {
                  const a = n.attributes.find(attr => attr.id === attrId);
                  if (a) a.value = value;
                  break;
              }
          }
          return next;
      });
  };

  // --- NAVIGATION IN DETAIL VIEW ---
  const currentDomainNodes = activeDomain ? domains.find(d => d.id === activeDomain.id)?.nodes || [] : [];
  const currentNodeIndex = selectedNode ? currentDomainNodes.findIndex(n => n.id === selectedNode.id) : -1;
  const hasNext = currentNodeIndex >= 0 && currentNodeIndex < currentDomainNodes.length - 1;
  const hasPrev = currentNodeIndex > 0;

  const handleSelectNext = () => {
      if (hasNext) handleSelectNode(currentDomainNodes[currentNodeIndex + 1]);
      else if (isMapComplete) handleGoHome(); // Easy exit when complete
  };
  
  const handleSelectPrev = () => {
      if (hasPrev) handleSelectNode(currentDomainNodes[currentNodeIndex - 1]);
  };

  // --- PERSISTENCE / SAVE ---
  const handleSave = () => {
      // Mock implementation for demo
      const data = JSON.stringify(domains);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'innerverse-save.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setShowMenu(false);
  };

  const handleRequestReset = () => {
      setShowMenu(false);
      setShowResetModal(true);
  };

  const handleConfirmReset = () => {
      setDomains(JSON.parse(JSON.stringify(currentConstants.domains))); // Deep reset
      setShowResetModal(false);
      handleGoHome();
      setOnboardingStep(0);
      setShowInitialOnboarding(true);
  };
  
  const handleOnboardingComplete = () => {
      setShowInitialOnboarding(false);
      setOnboardingStep(99); // Mark complete
  };

  const handleDomainCompleteCheck = (domain: Domain) => {
     // Check if all nodes in domain are defined
     const allDefined = domain.nodes.every(n => n.attributes.every(a => a.value !== null));
     if (allDefined && !completedDomains[domain.id]) {
         setCompletedDomains(prev => ({...prev, [domain.id]: true}));
     }
  };

  // Auto-check for completions
  useEffect(() => {
      domains.forEach(d => handleDomainCompleteCheck(d));
  }, [domains]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950 text-white selection:bg-amber-500/30">
      
      {/* 1. BACKGROUND LAYER */}
      <Background onboardingStep={onboardingStep} />

      {/* 2. MAIN MAP VISUALIZATION */}
      <SkyMap 
          ref={skyMapRef}
          domains={domains}
          activeDomain={activeDomain}
          selectedNode={selectedNode}
          completedDomains={completedDomains}
          onboardingStep={onboardingStep}
          awakenedNodeId={selectedNode?.id || null}
          lensData={lensData}
          primaryEnergyData={primaryEnergyData}
          definedNodesCount={definedNodesCount}
          onSelectDomain={handleSelectDomain}
          onSelectNode={handleSelectNode}
          onEnterAtlas={() => setIsAtlasViewActive(true)}
          onDeselect={handleBack}
          uiStrings={currentConstants.ui}
      />

      {/* 3. HEADER AREA (Logo, Title, Nav) */}
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
          {/* Menu Button */}
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

                      {/* Share/Save Options - Hidden during Onboarding */}
                      {!showInitialOnboarding && (
                          <>
                              {!isReadOnly && <><button onClick={() => setShowShareModal(true)} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 text-left"><ShareIcon /> {currentConstants.ui.shareInnerverse}</button><button onClick={handleSave} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 text-left border-b border-white/5"><SaveIcon /> {currentConstants.ui.saveProgress}</button></>}
                              {isReadOnly && <button onClick={handleSave} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 text-left border-b border-white/5"><LinkIcon /> {currentConstants.ui.copyLink}</button>}
                          </>
                      )}
                      
                      <button onClick={handleRequestReset} className="flex items-center gap-3 px-4 py-3 text-sm text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 text-left"><RestartIcon /> {currentConstants.ui.restart}</button>
                  </div>}
          </div>
      </div>

      {isReadOnly && <div data-name="readonly-banner" className={`absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-full flex items-center gap-4 animate-fade-in ${glassPanelStyle}`}><span className="text-sm text-indigo-200">{currentConstants.ui.viewing} <strong>{viewingName || 'Shared'}</strong></span><button onClick={handleConfirmReset} className="px-4 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs uppercase tracking-widest text-white transition-colors">{currentConstants.ui.mapYourOwn}</button></div>}

      {/* 4. DETAIL PANEL (Side Slider) */}
      <div 
          data-name="detail-panel"
          className={`
            fixed top-0 right-0 h-full z-40 
            w-full md:w-1/3 bg-slate-950/90 backdrop-blur-2xl border-l border-white/10 
            transition-transform duration-500 ease-in-out shadow-2xl
            ${showDetailPanel ? 'translate-x-0' : 'translate-x-full'}
          `}
      >
          {selectedNode && (
            <>
                <button onClick={() => setSelectedNode(null)} className="absolute top-6 right-6 p-2 text-white/50 hover:text-white z-50">
                    <CloseIcon />
                </button>
                <StarDetailView 
                    star={selectedNode}
                    isAwakening={false}
                    onAttributeChange={handleAttributeChange}
                    onSelectNext={handleSelectNext}
                    onSelectPrev={handleSelectPrev}
                    hasNext={hasNext}
                    hasPrev={hasPrev}
                    readOnly={isReadOnly}
                    attributeDefinitions={currentConstants.definitions}
                    isMapComplete={isMapComplete}
                    uiStrings={currentConstants.ui}
                />
            </>
          )}
      </div>

      {/* 5. ATLAS VIEW (Full Screen) */}
      {isAtlasViewActive && (
          <SoulAtlasView 
              domains={domains}
              mandalaData={mandalaData}
              lensData={lensData}
              primaryEnergyData={primaryEnergyData}
              personalSpectrum={personalSpectrum}
              onClose={() => setIsAtlasViewActive(false)}
              uiStrings={currentConstants.ui}
              attributeDefinitions={currentConstants.definitions}
              language={language}
              inquiryData={inquiryData}
              setInquiryData={setInquiryData}
          />
      )}

      {/* 6. CONSTELLATION INSIGHT MODAL */}
      <Modal show={showInsight} onClose={() => setShowInsight(false)} title="Insight" showCloseButton={true}>
         {activeDomain && <ConstellationInsight quadrant={activeDomain} />}
      </Modal>

      {/* 7. INSIGHT READY INDICATOR */}
      {activeDomain && completedDomains[activeDomain.id] && !showDetailPanel && !isAtlasViewActive && !showInsight && (
          <InsightReadyIndicator onClick={() => setShowInsight(true)} />
      )}

      {/* 8. ONBOARDING OVERLAY */}
      {showInitialOnboarding && (
        <Onboarding 
            steps={currentConstants.steps}
            onComplete={handleOnboardingComplete}
            onStepChange={setOnboardingStep}
            uiStrings={currentConstants.ui}
            language={language}
            onLanguageChange={setLanguage}
            toggleWakeLock={toggleWakeLock}
            isWakeLockActive={isWakeLockActive}
        />
      )}

      {/* 9. INTRO TEXT OVERLAY */}
      <IntroTextOverlay text={introText} />

      {/* 10. MODALS */}
      <Modal show={showResetModal} onClose={() => setShowResetModal(false)} title={currentConstants.ui.restartTitle}>
          <p>{currentConstants.ui.restartConfirm}</p>
          <div className="flex gap-4 justify-center mt-6">
              <button onClick={() => setShowResetModal(false)} className="px-4 py-2 rounded-full border border-white/10 hover:bg-white/10">{currentConstants.ui.cancel}</button>
              <button onClick={handleConfirmReset} className="px-4 py-2 rounded-full bg-red-500/80 hover:bg-red-500 text-white font-bold">{currentConstants.ui.confirm}</button>
          </div>
      </Modal>
      
      <Modal show={showShareModal} onClose={() => setShowShareModal(false)} title={currentConstants.ui.shareInnerverse}>
          <p className="text-slate-300 mb-4">Sharing is disabled in this demo.</p>
          <button onClick={() => setShowShareModal(false)} className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20">Close</button>
      </Modal>

    </div>
  );
}

export default App;
