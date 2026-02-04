

export interface Attribute {
  id: string;
  name: string;
  value: number | null;
}

export interface Node {
  id: string;
  name: string;
  position: { x: number; y: number }; // percentage-based position
  attributes: Attribute[];
}

export interface Domain {
  id: string;
  name: string; // e.g., "External Structure"
  subName: string; // e.g., "Do & See"
  description: string;
  nebula: {
    color1: string;
    color2: string;
    position: string; 
  };
  gradient: {
    start: string;
    end: string;
    direction: string;
  };
  nodes: Node[];
  inkColor: string;
}

export interface AttributeSpectrum {
  ego: [string, string, string, string, string];
  soul: [string, string, string, string, string];
  spirit: [string, string, string, string, string];
}

export interface AttributeDefinition {
  description: string;
  prompt: {
    ego: string;
    soul: string;
    spirit: string;
  };
  spectrum: AttributeSpectrum;
}

export interface ConstellationStory {
  name: string;
  summary: string;
  story: string;
  wisdom: string;
}

export interface AnalysisData {
  equilibrium: number;
  flux: number;
}

export type MandalaData = Record<string, AnalysisData>;
export type LensData = Record<'ego' | 'soul' | 'spirit', AnalysisData>;
export type PrimaryEnergyData = Record<'doing' | 'being' | 'seeing' | 'feeling', AnalysisData>;

export interface Archetype {
  name: string;
  description: string;
  mantra: string;
}

export interface PersonalSpectrum {
  min: number;
  max: number;
}

export interface BalancingPractices {
  masculineFeminine: string;
  lightDark: string;
}

export interface StrengthsShadows {
  title: string;
  text: string;
}

export interface CosmicHighlight {
    name: string;
    value: number;
    description: string;
}

export interface CosmicHighlights {
    mostPronouncedNodes: CosmicHighlight[];
    mostBalancedNodes: CosmicHighlight[];
    mostComplexDomains: CosmicHighlight[];
    mostHarmoniousDomains: CosmicHighlight[];
}

export interface InquiryData {
  summary: string;
  strengths: StrengthsShadows;
  shadows: StrengthsShadows;
  archetypes: Archetype[];
  balancingPractices: BalancingPractices;
  followUpPaths: string[]; // Suggested exploration buttons
}

export type Language = 'en' | 'es' | 'nl';

export interface OnboardingStep {
  id: number;
  text: string;
  chapter: number;
  isInteractive?: boolean; // If true, pauses for user exploration
  interactiveLabel?: string; // Label for the continue button (e.g. "Continue")
}

export interface UIStrings {
  pulse: string;
  begin: string;
  skip: string;
  explore: string;
  overview: string;
  lenses: string;
  energies: string;
  highlights: string;
  atlasReading: string;
  generateReading: string;
  exportReading: string;
  showPrompt: string;
  hidePrompt: string;
  copyPrompt: string;
  copied: string;
  shareInnerverse: string;
  saveProgress: string;
  copyLink: string;
  restart: string;
  viewing: string;
  mapYourOwn: string;
  domainAwakens: string;
  continue: string;
  restartTitle: string;
  restartConfirm: string;
  cancel: string;
  confirm: string;
  pronounced: string;
  balanced: string;
  dynamic: string;
  harmonious: string;
  atlasIntro: string;
  atlasIntroSub: string;
  deepenInquiry: string;
  explorePath: string;
  mapping: string;
  error: string;
  linkCopied: string;
  linkSaved: string;
  defined: string;
  openAtlas: string;
  keepAwake: string;
  balancedExpression: string; // Keep for fallback
  sliderLabels: {
      lacking: string;
      low: string;
      balanced: string;
      high: string;
      excess: string;
  };
  axis: {
    doing: string;
    being: string;
    seeing: string;
    feeling: string;
    doingDef: string;
    beingDef: string;
    seeingDef: string;
    feelingDef: string;
  };
  lensesTitles: {
    ego: string;
    soul: string;
    spirit: string;
    egoSub: string;
    soulSub: string;
    spiritSub: string;
  };
  energiesTitles: {
    doing: string;
    being: string;
    seeing: string;
    feeling: string;
    doingSub: string;
    beingSub: string;
    seeingSub: string;
    feelingSub: string;
  };
  onboardingSeeds: {
    direction: string;
    rhythm: string;
    focus: string;
    reception: string;
    empathy: string;
    exchange: string;
    sensation: string;
    grounding: string;
    alchemy: string;
    spark: string;
    ascent: string;
    quest: string;
  };
}