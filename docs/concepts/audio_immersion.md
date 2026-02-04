
# Concept: Cinematic Audio & Sonic Atmosphere

*This document captures a vision for a future phase focused on auditory immersion. It proposes using generative audio to create a "Sonic Landscape" that reacts to the user's journey, similar to how the visual landscape reacts.*

---

## 1. Core Philosophy: The Pulse of the Innerverse

Just as the visual aesthetic is shifting towards "Deep Liquid," the audio experience should feel organic, submerged, and responsive. It shouldn't just be a background track; it should be a **procedural soundscape** that evolves based on:
1.  **The Phase:** (Onboarding vs. Mapping vs. Reading).
2.  **The Region:** (Different sonic textures for the 4 Domains/Realms).
3.  **The Balance:** (Harmonic consonance for balanced states, subtle dissonance or "rumble" for high flux/tension).

## 2. Technical Approach: Generative Audio (Tone.js)

Instead of playing static MP3 files, we propose using **Tone.js** to synthesize audio in real-time. This allows for:
*   **Seamless Transitions:** No hard cuts between tracks.
*   **Data-Driven Sound:** We can map user attributes (e.g., "Soul" value) directly to audio parameters (e.g., Reverb Decay or Filter Frequency).
*   **Interaction SFX:** Procedural generation of UI sounds (clicks, hovers, reveals) that are musically tuned to the current chord progression.

---

## 3. Reference Implementation (Prototype)

The following code demonstrates a React component structure for a "Music Lab" / Cinematic Experience. This serves as the architectural blueprint for the future `AudioEngine` component.

### Key Features in Reference:
*   **Thematic Presets:** `organic`, `cosmic`, `minimal` (Maps to our visual styles).
*   **Mixer State:** Granular control over stems (Music, Warmth, Melody, Atmosphere).
*   **Scripted SFX:** Metadata in the narrative (`sfx: 'reveal'`, `sfx: 'deep'`) triggers specific sonic events.
*   **Audio Graph:** Uses `PolySynth`, `MembraneSynth` (Heartbeat), and `Noise` (Atmosphere) routed through Reverb and Compression.

```tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import { 
  Play, ChevronRight, ChevronLeft, 
  Volume2, VolumeX, Sparkles, Wind, 
  Waves, Zap, Heart, Sliders, X, Music,
  Pause, Globe, Radio, Feather
} from 'lucide-react';

// --- THEME DEFINITIONS ---
const THEMES = {
  organic: {
    name: "Organic",
    icon: <Feather className="w-3 h-3"/>,
    bpm: 55,
    chordOsc: "fattriangle",
    warmthOsc: "sawtooth",
    atmosType: "pink",
    atmosFilter: 300,
    reverbWet: 0.5,
    chordAttack: 2
  },
  cosmic: {
    name: "Cosmic",
    icon: <Globe className="w-3 h-3"/>,
    bpm: 45,
    chordOsc: "fatsawtooth", // Richer, buzzier
    warmthOsc: "sine", // Deep sub drone
    atmosType: "brown", // Deeper rumble
    atmosFilter: 100,
    reverbWet: 0.8, // Massive space
    chordAttack: 4 // Slower swell
  },
  minimal: {
    name: "Minimal",
    icon: <Radio className="w-3 h-3"/>,
    bpm: 65,
    chordOsc: "sine", // Pure
    warmthOsc: "triangle",
    atmosType: "white", // Airy
    atmosFilter: 800,
    reverbWet: 0.2, // Dry/Intimate
    chordAttack: 0.5 // Faster response
  }
};

const Innerverse = () => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showMixer, setShowMixer] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('organic');
  
  // --- MIXER STATE ---
  const [volumes, setVolumes] = useState({
    music: -8,       
    warmth: -12,     
    melody: -12,     
    atmosphere: -25, 
    sfx: -5,         
    kick: -12        
  });

  // --- AUDIO REFS ---
  const masterVol = useRef(null);
  const reverbRef = useRef(null);
  const chordSynth = useRef(null);   
  const warmthSynth = useRef(null);  
  const rhodesSynth = useRef(null);  
  const sfxSynth = useRef(null);     
  const ambience = useRef(null);     
  const atmosFilterRef = useRef(null);
  const kickDrum = useRef(null);     
  
  const chordLoop = useRef(null);
  const warmthLoop = useRef(null);   
  const arpPattern = useRef(null);

  // --- SCRIPT WITH SFX METADATA ---
  // sfx: 'none' | 'step' (subtle) | 'reveal' (important) | 'deep' | 'lens'
  const script = [
    {
      chapter: "Chapter 1: The Origin",
      lines: [
        { text: "I would like to introduce you to the Innerverse.", sfx: "step" },
        { text: "A friend once introduced me to this landscape inside of us.", sfx: "none" },
        { text: "She described four distinct energies that seem to drive how we move through the world.", sfx: "step" },
        { text: "I’ve been trying to visualize them ever since.", sfx: "none" }
      ],
      state: "void"
    },
    // ... (Remainder of script)
  ];

  // ... (Audio Initialization and Graph Building logic from prototype)
  
  // ... (Sequencer logic)

  return (
    // ... (UI Render logic)
    <div>Reference UI</div>
  );
};
```

## 4. Integration Strategy for Pulse

To adapt this prototype into the current `Pulse` app:

1.  **Global Audio Context:** Create a `AudioContext.tsx` or a singleton `AudioManager` class. This prevents audio re-initialization when React components re-render.
2.  **State Mapping:**
    *   Map `onboardingStep` (Pulse) to `currentStep` (Audio).
    *   Map `activeDomain` (Pulse) to the Chord Progression (e.g., D1 = Major Key, D4 = Minor/Mysterious).
    *   Map `flux` (Pulse) to `detune` or `distortion` effects.
3.  **User Control:** Add a global Mute/Unmute toggle in the Header (next to Fullscreen).
4.  **Performance:** Ensure Tone.js signals are disposed of correctly on unmount to prevent memory leaks, especially on mobile.
