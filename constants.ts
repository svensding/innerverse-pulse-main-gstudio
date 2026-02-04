
import { Domain, AttributeDefinition, UIStrings, OnboardingStep } from './types';

export const UI_STRINGS: UIStrings = {
  pulse: "Pulse",
  begin: "Begin",
  skip: "Skip",
  explore: "Explore",
  overview: "Overview",
  lenses: "Lenses",
  energies: "Energies",
  highlights: "Highlights",
  atlasReading: "Pulse Reading",
  generateReading: "Generate Reading",
  exportReading: "Export Reading",
  showPrompt: "Show Prompt",
  hidePrompt: "Hide Prompt",
  copyPrompt: "Copy Prompt",
  copied: "Copied",
  shareInnerverse: "Share Innerverse",
  saveProgress: "Save Progress",
  copyLink: "Copy Link",
  restart: "Restart",
  viewing: "Viewing",
  mapYourOwn: "Map Your Own",
  domainAwakens: "Domain Awakens",
  continue: "Continue",
  restartTitle: "Restart",
  restartConfirm: "Are you sure you want to restart?",
  cancel: "Cancel",
  confirm: "Confirm",
  pronounced: "Pronounced",
  balanced: "Balanced",
  dynamic: "Dynamic",
  harmonious: "Harmonious",
  atlasIntro: "Pulse Reading",
  atlasIntroSub: "Generate a reading of your inner landscape.",
  deepenInquiry: "Deepen the Inquiry",
  explorePath: "Explore this path",
  mapping: "Mapping...",
  error: "Error generating reading",
  linkCopied: "Link copied to clipboard",
  linkSaved: "Progress saved to link",
  defined: "defined",
  openAtlas: "Check Pulse",
  keepAwake: "Keep Awake",
  balancedExpression: "balanced expression",
  sliderLabels: {
      lacking: "lacking expression",
      low: "low expression",
      balanced: "balanced expression",
      high: "high expression",
      excess: "excess expression",
  },
  axis: {
    doing: "Doing",
    being: "Being",
    seeing: "Seeing",
    feeling: "Feeling",
    doingDef: "Action & Externalization",
    beingDef: "Presence & Internalization",
    seeingDef: "Vision & Perception",
    feelingDef: "Emotion & Intuition",
  },
  lensesTitles: {
    ego: "Ego",
    soul: "Soul",
    spirit: "Spirit",
    egoSub: "Form & Structure",
    soulSub: "Essence & Flow",
    spiritSub: "Resonance & Connection",
  },
  energiesTitles: {
    doing: "Doing",
    being: "Being",
    seeing: "Seeing",
    feeling: "Feeling",
    doingSub: "Action",
    beingSub: "Presence",
    seeingSub: "Vision",
    feelingSub: "Emotion",
  },
  onboardingSeeds: {
    direction: "Direction",
    rhythm: "Rhythm",
    focus: "Focus",
    reception: "Reception",
    empathy: "Empathie",
    exchange: "Exchange",
    sensation: "Sensation",
    grounding: "Grounding",
    alchemy: "Alchemy",
    spark: "Spark",
    ascent: "Ascent",
    quest: "Quest",
  },
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  // Chapter 1: Intro
  { id: 0, text: "I would like to introduce you to the <strong>Innerverse</strong>", chapter: 1 },
  { id: 1, text: "A friend once introduced me to this landscape inside of us.", chapter: 1 },
  { id: 2, text: "She described four distinct energies that seem to drive<br/>how we move through the world.", chapter: 1 },
  { id: 3, text: "I’ve been trying to visualize them ever since.", chapter: 1 },
  
  // Chapter 2: Energies Reveal (Slower, Distinct)
  // Step 4: DO
  { id: 4, text: "On one side, there’s this pull towards action.<br/>I call this the <strong>DO</strong> energy.", chapter: 2 }, 
  // Step 5: BE
  { id: 5, text: "On the other side, there is a sense of presence.<br/>The <strong>BE</strong> energy.", chapter: 2 }, 
  // Step 6: SEE (Distinct)
  { id: 6, text: "Above, there is the rising energy.<br/>The <strong>SEE</strong> energy.", chapter: 2 },
  // Step 7: FEEL (Distinct)
  { id: 7, text: "And finally, the energy that deepens.<br/>The <strong>FEEL</strong> energy.", chapter: 2 },
  
  // PAUSE 1: Explore Energies
  // Added context about the landscape
  { id: 8, text: "These forces create a landscape.<br/><strong>Action vs Presence. Vision vs Emotion.</strong>", chapter: 2 },
  { id: 9, text: "I invite you to take a moment to imagine these opposing forces,<br/>and how you relate to each of them.", chapter: 2, isInteractive: true },

  // Chapter 3: Domains Reveal
  { id: 10, text: "It gets interesting where these energies meet.", chapter: 3 },
  
  // D1: External Structure (TL)
  { id: 11, text: "Where Doing meets Seeing...<br/>I call this <strong>External Structure</strong>.", chapter: 3 },
  { id: 12, text: "It’s that tangible feeling of planning and getting results.", chapter: 3 },
  
  // D3: Relational Flow (TR)
  { id: 13, text: "Where Being meets Seeing...<br/>becomes <strong>Relational Flow</strong>.", chapter: 3 },
  { id: 14, text: "This is where energy seems to move between us and others.", chapter: 3 },
  
  // D4: Root Connection (BR)
  { id: 15, text: "Where Being meets Feeling...<br/>we find <strong>Root Connection</strong>.", chapter: 3 },
  { id: 16, text: "This feels like safety, intuition, and inner wisdom.", chapter: 3 },
  
  // D2: Inner Drive (BL)
  { id: 17, text: "And where Doing meets Feeling...<br/>lies <strong>Inner Drive</strong>.", chapter: 3 },
  { id: 18, text: "That surge of motivation and power coming from the gut.", chapter: 3 },

  // PAUSE 2: Explore Domains
  { id: 19, text: "Maps aren't the territory, but they help us navigate.<br/>You may already feel that you inhabit some realms more than others.", chapter: 3, isInteractive: true },
  
  // Chapter 4: Expressions
  { id: 20, text: "For a while, I just used this simple map.", chapter: 4 },
  { id: 21, text: "But I realized that simply knowing about a 'Realm' was a bit too broad.", chapter: 4 },
  
  // ZOOM TO REALM (D1)
  { id: 22, text: "So, I looked closer. I tried to identify the unique expressions that live within these regions.", chapter: 4 },
  
  // REVEAL STARS HERE (Zoomed in D1)
  { id: 23, text: "I found <strong>6 points</strong> within each realm that helped clarify things.", chapter: 4 },

  // PAUSE 3: Explore Expressions (Allow user to pan/zoom)
  { id: 24, text: "Zooming in like this helped me relate even better to the landscape.<br/>Go ahead, take a look.", chapter: 4, isInteractive: true },
  
  // Chapter 5: Lenses (Zoom to Star)
  { id: 25, text: "However, I also wanted to map my internal balance.", chapter: 5 },
  { id: 26, text: "I needed a way to observe nuance.<br/>So I imagined <strong>3 lenses</strong> to help see clearly.", chapter: 5 },
  
  // Lens 1: Ego (Refer to as Form)
  { id: 27, text: "One lens looks at our <strong>Form</strong>—<br/>how we define things and ourselves.", chapter: 5 },
  // Lens 2: Soul (Refer to as Essence)
  { id: 28, text: "Another lens views our <strong>Essence</strong>—<br/>how clearly we find our natural guidance.", chapter: 5 },
  // Lens 3: Spirit (Refer to as Resonance)
  { id: 29, text: "The final lens reflects on our <strong>Resonance</strong>—<br/>how connected we feel beyond ourselves.", chapter: 5 },
  
  // NO PAUSE HERE - Move directly to final
  
  // Chapter 6: Final
  { id: 30, text: "Through these lenses, I believe we can see<br/>the various aspects of ourselves fairly.", chapter: 6 },
  { id: 31, text: "So far, this is the Innerverse I've charted.", chapter: 6 },
  { id: 99, text: "And now I invite you to explore your own energies within it.<br/>Go ahead, visit all 24 expressions and chart your own map.", chapter: 6 }
];

const createAttrs = () => [
  { id: 'attr-ego', name: 'Ego', value: null },
  { id: 'attr-soul', name: 'Soul', value: null },
  { id: 'attr-spirit', name: 'Spirit', value: null },
];

// Adjusted coordinates to spread nodes slightly away from center (50,50)
export const DOMAINS_DATA: Domain[] = [
  {
    id: 'd1',
    name: 'External Structure',
    subName: 'Do & See',
    description: 'The realm of tangible action and visible systems.',
    inkColor: '#ea580c', 
    nebula: { color1: '#e11d48', color2: '#fbbf24', position: 'top-left' },
    gradient: { start: '#e11d48', end: '#fbbf24', direction: '135deg' },
    nodes: [
      // Top Left Quadrant - Push values < 50 LOWER
      { id: 'd1-n1', name: 'Systematic Design', position: { x: 15, y: 25 }, attributes: createAttrs() },
      { id: 'd1-n2', name: 'Decisive Action', position: { x: 55, y: 15 }, attributes: createAttrs() },
      { id: 'd1-n3', name: 'Applied Vision', position: { x: 75, y: 40 }, attributes: createAttrs() },
      { id: 'd1-n4', name: 'Lucid Communication', position: { x: 30, y: 55 }, attributes: createAttrs() },
      { id: 'd1-n5', name: 'Sustained Discipline', position: { x: 70, y: 70 }, attributes: createAttrs() },
      { id: 'd1-n6', name: 'Structural Support', position: { x: 10, y: 75 }, attributes: createAttrs() },
    ]
  },
  {
    id: 'd3',
    name: 'Relational Flow',
    subName: 'Be & See',
    description: 'The web of relationships and shared perception.',
    inkColor: '#10b981', // Updated to Emerald Green to distinguish from Cyan
    nebula: { color1: '#10b981', color2: '#fbbf24', position: 'top-right' },
    gradient: { start: '#10b981', end: '#3b82f6', direction: '225deg' },
    nodes: [
      // Top Right Quadrant - Push X > 50 HIGHER, Y < 50 LOWER
      { id: 'd3-n1', name: 'Social Synergy', position: { x: 30, y: 20 }, attributes: createAttrs() },
      { id: 'd3-n2', name: 'Active Harmony', position: { x: 80, y: 25 }, attributes: createAttrs() },
      { id: 'd3-n3', name: 'Reflective Listening', position: { x: 55, y: 50 }, attributes: createAttrs() },
      { id: 'd3-n4', name: 'Authentic Narrative', position: { x: 20, y: 70 }, attributes: createAttrs() },
      { id: 'd3-n5', name: 'Mentorship', position: { x: 90, y: 65 }, attributes: createAttrs() },
      { id: 'd3-n6', name: 'Radical Openness', position: { x: 50, y: 85 }, attributes: createAttrs() },
    ]
  },
  {
    id: 'd2',
    name: 'Inner Drive',
    subName: 'Do & Feel',
    description: 'The engine of will and emotional propulsion.',
    inkColor: '#9333ea',
    nebula: { color1: '#9333ea', color2: '#e11d48', position: 'bottom-left' },
    gradient: { start: '#9333ea', end: '#e11d48', direction: '45deg' },
    nodes: [
      // Bottom Left Quadrant - Push X < 50 LOWER, Y > 50 HIGHER
      { id: 'd2-n1', name: 'Assertive Presence', position: { x: 35, y: 15 }, attributes: createAttrs() },
      { id: 'd2-n2', name: 'Competence', position: { x: 85, y: 30 }, attributes: createAttrs() },
      { id: 'd2-n3', name: 'Resilience', position: { x: 60, y: 55 }, attributes: createAttrs() },
      { id: 'd2-n4', name: 'Inner Compass', position: { x: 25, y: 50 }, attributes: createAttrs() },
      { id: 'd2-n5', name: 'Core Sovereignty', position: { x: 90, y: 80 }, attributes: createAttrs() },
      { id: 'd2-n6', name: 'Loyalty', position: { x: 45, y: 85 }, attributes: createAttrs() },
    ]
  },
  {
    id: 'd4',
    name: 'Root Connection',
    subName: 'Be & Feel',
    description: 'The ocean of stillness and felt sense.',
    inkColor: '#4338ca',
    nebula: { color1: '#4338ca', color2: '#9333ea', position: 'bottom-right' },
    gradient: { start: '#4338ca', end: '#6366f1', direction: '315deg' },
    nodes: [
      // Bottom Right Quadrant - Push X > 50 HIGHER, Y > 50 HIGHER
      { id: 'd4-n1', name: 'Somatic Embodiment', position: { x: 25, y: 25 }, attributes: createAttrs() },
      { id: 'd4-n2', name: 'Empathic Resonance', position: { x: 75, y: 15 }, attributes: createAttrs() },
      { id: 'd4-n3', name: 'Trust', position: { x: 50, y: 45 }, attributes: createAttrs() },
      { id: 'd4-n4', name: 'Intuitive Knowing', position: { x: 90, y: 55 }, attributes: createAttrs() },
      { id: 'd4-n5', name: 'Distilled Wisdom', position: { x: 30, y: 80 }, attributes: createAttrs() },
      { id: 'd4-n6', name: 'Dreaming', position: { x: 70, y: 85 }, attributes: createAttrs() },
    ]
  }
];

export const ATTRIBUTE_DEFINITIONS: Record<string, AttributeDefinition> = {
  // --- REALM 1: EXTERNAL STRUCTURE ---
  "Systematic Design": {
    description: "Planning & Foresight. The ability to structure the future.",
    prompt: {
      ego: "How clearly defined is your path forward?",
      soul: "How does your logic feel to you?",
      spirit: "How do you project your plans?"
    },
    spectrum: {
      ego: ["Wandering", "Hazy", "Clear", "Linear", "Fixed"],
      soul: ["Abstract", "Improvisational", "Coherent", "Calculated", "Mechanical"],
      spirit: ["Internal", "Guarded", "Guiding", "Directing", "Commanding"]
    }
  },
  "Decisive Action": {
    description: "Execution & Finish. The ability to bring things to completion.",
    prompt: {
      ego: "How defined is your ability to finalize?",
      soul: "What is the texture of your work energy?",
      spirit: "How visible are your results?"
    },
    spectrum: {
      ego: ["Open-Ended", "Drifting", "Steady", "Driving", "Final"],
      soul: ["Heavy", "Sporadic", "Flowing", "Strained", "Grinding"],
      spirit: ["Subtle", "Blending", "Tangible", "Prominent", "Dominating"]
    }
  },
  "Sustained Discipline": {
    description: "Routine & Systems. The rhythm of daily maintenance.",
    prompt: {
      ego: "How structured is your daily movement?",
      soul: "How does your environment affect your internal order?",
      spirit: "How do you impact the order of others?"
    },
    spectrum: {
      ego: ["Freeform", "Variable", "Rhythmic", "Consistent", "Regimented"],
      soul: ["Permeable", "Messy", "Ordered", "Curated", "Sterile"],
      spirit: ["Passive", "Flexible", "Stabilizing", "Correcting", "Controlling"]
    }
  },
  "Applied Vision": {
    description: "Detail & Analysis. The sharpness of focus.",
    prompt: {
      ego: "How sharp is your attention to detail?",
      soul: "How do you process information?",
      spirit: "How do you share your observations?"
    },
    spectrum: {
      ego: ["Broad", "Soft", "Sharp", "Cutting", "Microscopic"],
      soul: ["Absorbing", "Sifting", "Synthesizing", "Dissecting", "Scrutinizing"],
      spirit: ["Silent", "Reserved", "Illuminating", "Debating", "Piercing"]
    }
  },
  "Structural Support": {
    description: "Resources & Security. The foundation of material sustainment.",
    prompt: {
      ego: "How defined is your grasp on resources?",
      soul: "What is the feeling around abundance?",
      spirit: "How does your resource energy move?"
    },
    spectrum: {
      ego: ["Loose", "Fluctuating", "Secure", "Tight", "Locked"],
      soul: ["Sparse", "Concerned", "Sufficient", "Accumulating", "Compulsive"],
      spirit: ["Leaking", "Holding", "Circulating", "Transactional", "Leveraging"]
    }
  },
  "Lucid Communication": {
    description: "Responsibility & Decision. The weight of authority.",
    prompt: {
      ego: "How solid is your decision making?",
      soul: "How heavy does responsibility feel to you?",
      spirit: "How does your presence impact the space?"
    },
    spectrum: {
      ego: ["Fluid", "Adaptive", "Grounded", "Firm", "Immovable"],
      soul: ["External", "Uncertain", "Sovereign", "Egotistical", "Absolute"],
      spirit: ["Receding", "Neutral", "Empowering", "Weighted", "Overbearing"]
    }
  },

  // --- REALM 2: RELATIONAL FLOW ---
  "Authentic Narrative": {
    description: "Expression & Truth. The articulation of self.",
    prompt: {
      ego: "How authentically does your truth flow to others?",
      soul: "How does your expression feel?",
      spirit: "How does your voice land in the room?"
    },
    spectrum: {
      ego: ["Silent", "Muted", "Resonant", "Loud", "Broadcasting"],
      soul: ["Masked", "Edited", "Authentic", "Raw", "Unfiltered"],
      spirit: ["Fading", "Echoing", "Harmonic", "Piercing", "Overwhelming"]
    }
  },
  "Reflective Listening": {
    description: "Listening & Presence. The capacity to receive.",
    prompt: {
      ego: "How open is your space for others?",
      soul: "How deeply do you absorb what you hear?",
      spirit: "How do you reflect others back to themselves?"
    },
    spectrum: {
      ego: ["Closed", "Selected", "Spacious", "Porous", "Flooded"],
      soul: ["Detached", "Surface", "Empathetic", "Saturated", "Merged"],
      spirit: ["Blank", "Blurring", "Clarifying", "Magnifying", "Distorting"]
    }
  },
  "Active Harmony": {
    description: "Harmony & Navigation. The movement through conflict.",
    prompt: {
      ego: "How do you harmonize tension?",
      soul: "How do you feel amidst tension?",
      spirit: "What energy do you bring to a group?"
    },
    spectrum: {
      ego: ["Retreating", "Yielding", "Navigating", "Asserting", "Colliding"],
      soul: ["Uneasy", "Careful", "Centered", "Calculated", "Excitable"],
      spirit: ["Invisible", "Following", "Unifying", "Dividing", "Explosive"]
    }
  },
  "Mentorship": {
    description: "Teaching & Helping. The flow of support.",
    prompt: {
      ego: "How present is your guidance?",
      soul: "What is the source of your compassion?",
      spirit: "How is your guidance perceived?"
    },
    spectrum: {
      ego: ["Withheld", "Vague", "Reliable", "Involved", "Intervening"],
      soul: ["Obligation", "Sympathy", "Compassion", "Pride", "Savior"],
      spirit: ["Unseen", "Gentle", "Uplifting", "Heavy", "Directive"]
    }
  },
  "Radical Openness": {
    description: "Intimacy & Trust. The boundaries of connection.",
    prompt: {
      ego: "How defined are your boundaries in intimacy?",
      soul: "How safe do you feel in vulnerability?",
      spirit: "How does your devotion express itself?"
    },
    spectrum: {
      ego: ["Dissolved", "Permeable", "Flexible", "Guarded", "Walled"],
      soul: ["Exposed", "Cautious", "Open", "Dependent", "Clinging"],
      spirit: ["Cool", "Distant", "Warm", "Intense", "Consuming"]
    }
  },
  "Social Synergy": {
    description: "Social & Play. The lightness of exchange.",
    prompt: {
      ego: "How readily do you engage in social flow?",
      soul: "How light is your spirit in company?",
      spirit: "How do you affect the mood?"
    },
    spectrum: {
      ego: ["Solitary", "Hesitant", "Fluid", "Performative", "Chaotic"],
      soul: ["Heavy", "Reserved", "Buoyant", "Manic", "Hysterical"],
      spirit: ["Dampening", "Neutral", "Sparking", "Distracting", "Exhausting"]
    }
  },

  // --- REALM 3: ROOT CONNECTION ---
  "Somatic Embodiment": {
    description: "Body Awareness. The connection to the vessel.",
    prompt: {
      ego: "How connected are you to physical signals?",
      soul: "How do you honor your body's requests?",
      spirit: "What does your physical presence radiate?"
    },
    spectrum: {
      ego: ["Numb", "Distant", "Embodied", "Sensitive", "Hypersensitive"],
      soul: ["Ignoring", "Minimal", "Nourishing", "Indulgent", "Hedonistic"],
      spirit: ["Ghostly", "Faint", "Vital", "Restless", "Feverish"]
    }
  },
  "Trust": {
    description: "Safety & Stability. The sense of home.",
    prompt: {
      ego: "How solid is your sense of home?",
      soul: "How easily do you find calm?",
      spirit: "How do you hold space for yourself?"
    },
    spectrum: {
      ego: ["Rootless", "Shifting", "Rooted", "Anchored", "Stuck"],
      soul: ["Agitated", "Anxious", "Settled", "Heavy", "Inert"],
      spirit: ["Collapsing", "Leaking", "Holding", "Guarding", "Isolating"]
    }
  },
  "Dreaming": {
    description: "Imagination & Subconscious. The inner eye.",
    prompt: {
      ego: "How vivid is your inner imagery?",
      soul: "How do you relate to the abstract?",
      spirit: "How much does your inner world overlay your outer world?"
    },
    spectrum: {
      ego: ["Dark", "Hazy", "Vivid", "Hallucinatory", "All-Consuming"],
      soul: ["Avoiding", "Skeptical", "Inspired", "Escapist", "Lost"],
      spirit: ["Separate", "Fading", "Visionary", "Overlaying", "Delusional"]
    }
  },
  "Intuitive Knowing": {
    description: "Intuition & Reflection. The internal voice.",
    prompt: {
      ego: "How clearly do you hear your intuition?",
      soul: "How fully have you integrated your past?",
      spirit: "How do you hold your truth?"
    },
    spectrum: {
      ego: ["Silent", "Muffled", "Clear", "Loud", "Deafening"],
      soul: ["Detached", "Unsure", "Integrated", "Regretful", "Haunted"],
      spirit: ["Unsure", "Quiet", "Resonant", "Preachy", "Dogmatic"]
    }
  },
  "Empathic Resonance": {
    description: "Transformation & Emotion. The alchemy of feeling.",
    prompt: {
      ego: "How permeable are you to emotional shifts?",
      soul: "How do you process emotional pain?",
      spirit: "What is your relationship to shadow?"
    },
    spectrum: {
      ego: ["Brittle", "Resisting", "Adaptive", "Volatile", "Destructive"],
      soul: ["Burying", "Repressing", "Transmuting", "Wallowing", "Identifying"],
      spirit: ["Denial", "Projection", "Acceptance", "Fixation", "Possession"]
    }
  },
  "Distilled Wisdom": {
    description: "Rest & Void. The capacity to stop.",
    prompt: {
      ego: "How defined is your ability to stop?",
      soul: "How comfortable is silence to you?",
      spirit: "How do you withdraw from the world?"
    },
    spectrum: {
      ego: ["Nonexistent", "Fidgety", "Restful", "Heavy", "Paralyzed"],
      soul: ["Terrifying", "Empty", "Peaceful", "Lonely", "Desolate"],
      spirit: ["Running", "Hiding", "Retreating", "Vanishing", "Erasing"]
    }
  },

  // --- REALM 4: INNER DRIVE ---
  "Inner Compass": {
    description: "Initiation & Courage. The spark of beginning.",
    prompt: {
      ego: "How quickly do you start new things?",
      soul: "What is the quality of your excitement?",
      spirit: "How does your risk-taking feel?"
    },
    spectrum: {
      ego: ["Frozen", "Delaying", "Igniting", "Impulsive", "Reckless"],
      soul: ["Dormant", "Dull", "Electric", "Feverish", "Explosive"],
      spirit: ["Paralyzed", "Cautious", "Brave", "Dangerous", "Self-Destructive"]
    }
  },
  "Assertive Presence": {
    description: "Ambition & Growth. The ascent.",
    prompt: {
      ego: "How distinct is your urge to climb?",
      soul: "What fuels your climb?",
      spirit: "How do you relate to achievement?"
    },
    spectrum: {
      ego: ["Aimless", "Drifting", "Ascending", "Grasping", "Ruthless"],
      soul: ["Vacuum", "Envy", "Purpose", "Hunger", "Insatiability"],
      spirit: ["Unworthy", "Dismissive", "Proud", "Superior", "Narcissistic"]
    }
  },
  "Resilience": {
    description: "Boundaries & Resilience. The defense of self.",
    prompt: {
      ego: "How strong are your boundaries?",
      soul: "What is your reflex when challenged?",
      spirit: "How do you use your power?"
    },
    spectrum: {
      ego: ["Open", "Weak", "Shielded", "Walled", "Hostile"],
      soul: ["Yielding", "Collapsing", "Resilient", "Hardened", "Bitter"],
      spirit: ["Powerless", "Meek", "Protective", "Aggressive", "Violent"]
    }
  },
  "Core Sovereignty": {
    description: "Curiosity & Meaning. The quest.",
    prompt: {
      ego: "How active is your hunger for the unknown?",
      soul: "How does the unknown feel to you?",
      spirit: "How does your curiosity move?"
    },
    spectrum: {
      ego: ["Apathetic", "Wandering", "Questing", "Restless", "Lost"],
      soul: ["Threatening", "Boring", "Wondrous", "Obsessive", "Delirious"],
      spirit: ["Stagnant", "Looping", "Spiraling", "Scattered", "Chaotic"]
    }
  },
  "Competence": {
    description: "Independence & Authenticity. The autonomy.",
    prompt: {
      ego: "How defined is your own path?",
      soul: "How much external approval do you need?",
      spirit: "How do you stand out?"
    },
    spectrum: {
      ego: ["Conforming", "Merged", "Distinct", "Contrarian", "Alienated"],
      soul: ["Desperate", "Pleasing", "Self-Validated", "Defiant", "Antisocial"],
      spirit: ["Blending", "Gray", "Vibrant", "Jarring", "Offensive"]
    }
  },
  "Loyalty": {
    description: "Motivation & Desire. The yearning.",
    prompt: {
      ego: "How consistent is your drive?",
      soul: "What is the source of your want?",
      spirit: "How does your desire impact your focus?"
    },
    spectrum: {
      ego: ["Flat", "Spiking", "Sustained", "Intense", "Manic"],
      soul: ["Lack", "Craving", "Passion", "Lust", "Addiction"],
      spirit: ["Distracted", "Scattered", "Targeted", "Fixated", "Consumed"]
    }
  }
};
