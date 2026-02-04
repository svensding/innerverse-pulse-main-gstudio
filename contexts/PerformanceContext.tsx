
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PerformanceSettings {
  glass: boolean;       // Enable backdrop-filter blur
  distortion: boolean;  // Enable SVG turbulence/displacement
  glow: number;         // 0 (None) - 3 (High)
  animations: boolean;  // Enable continuous ambient animations
  parallax: boolean;    // Enable mouse-move parallax
  octaves: number;      // 1 (Fast) - 5 (Detailed)
  particles: boolean;   // Enable background particles
  blending: boolean;    // Enable mix-blend-mode (Heavy on mobile)
}

const DEFAULT_SETTINGS: PerformanceSettings = {
  glass: true,
  distortion: true,
  glow: 3,
  animations: true,
  parallax: true,
  octaves: 2,
  particles: true,
  blending: true,
};

// Low-end preset
export const LITE_SETTINGS: PerformanceSettings = {
  glass: false,
  distortion: false,
  glow: 1,
  animations: false,
  parallax: false,
  octaves: 1,
  particles: false,
  blending: false,
};

interface PerformanceContextType {
  settings: PerformanceSettings;
  updateSetting: <K extends keyof PerformanceSettings>(key: K, value: PerformanceSettings[K]) => void;
  resetToHigh: () => void;
  setToLite: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load from localStorage, else default
  const [settings, setSettings] = useState<PerformanceSettings>(() => {
      try {
          const saved = localStorage.getItem('pulse-perf-settings');
          return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
      } catch {
          return DEFAULT_SETTINGS;
      }
  });

  const updateSetting = <K extends keyof PerformanceSettings>(key: K, value: PerformanceSettings[K]) => {
    setSettings(prev => {
        const next = { ...prev, [key]: value };
        localStorage.setItem('pulse-perf-settings', JSON.stringify(next));
        return next;
    });
  };

  const resetToHigh = () => {
      setSettings(DEFAULT_SETTINGS);
      localStorage.setItem('pulse-perf-settings', JSON.stringify(DEFAULT_SETTINGS));
  };

  const setToLite = () => {
      setSettings(LITE_SETTINGS);
      localStorage.setItem('pulse-perf-settings', JSON.stringify(LITE_SETTINGS));
  };

  return (
    <PerformanceContext.Provider value={{ settings, updateSetting, resetToHigh, setToLite }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};
