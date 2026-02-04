
// utils/colors.ts

/**
 * A utility function to parse a hex color string into an RGB object.
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * A utility function to linearly interpolate between two values.
 */
const lerp = (a: number, b: number, t: number): number => {
  return a * (1 - t) + b * t;
};

/**
 * Interpolates between two hex colors.
 * @param color1 The starting hex color.
 * @param color2 The ending hex color.
 * @param factor The interpolation factor (0 to 1).
 * @returns The interpolated hex color string.
 */
const interpolateColors = (color1: string, color2: string, factor: number): string => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return color1; // Fallback to the first color
  }

  const r = Math.round(lerp(rgb1.r, rgb2.r, factor));
  const g = Math.round(lerp(rgb1.g, rgb2.g, factor));
  const b = Math.round(lerp(rgb1.b, rgb2.b, factor));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0')}`;
};


// --- New Richer Color Palette (Natural / Deep) ---
const COLOR_LACK = '#1e1b4b';      // Deepest Midnight (Ink)
const COLOR_BALANCED = '#d97706';  // Rich Amber/Gold
const COLOR_EXCESS = '#881337';    // Deep Blood/Wine (Reactive)
const COLOR_UNDEFINED = '#64748b'; // Slate 500

/**
 * Calculates the color for a star or attribute based on its value.
 * The spectrum flows from Indigo (-100) -> Gold (0) -> Red (100).
 * Used for the Atlas visualizations where comparing domains matters.
 * @param value The attribute value from -100 to 100.
 * @returns A hex color string.
 */
export const getAttributeColor = (value: number | null): string => {
  if (value === null) {
    return COLOR_UNDEFINED;
  }
  
  if (value < 0) {
    // Interpolate from LACK (-100) to BALANCED (0)
    // As value goes from -100 to 0, factor goes from 0 to 1
    const factor = (value + 100) / 100;
    return interpolateColors(COLOR_LACK, COLOR_BALANCED, factor);
  } else {
    // Interpolate from BALANCED (0) to EXCESS (100)
    // As value goes from 0 to 100, factor goes from 0 to 1
    const factor = value / 100;
    return interpolateColors(COLOR_BALANCED, COLOR_EXCESS, factor);
  }
};

/**
 * Adjusts a Domain's base Ink Color based on the node's value.
 * Preserves the Hue (Domain Identity) but shifts Lightness/Saturation.
 * 
 * @param baseColor The domain's specific ink color (e.g. Cyan, Rose).
 * @param value The attribute value (-100 to 100).
 */
export const adjustInkColor = (baseColor: string, value: number | null): string => {
    if (value === null) return baseColor; // Use base color, opacity handles the rest

    // Dormant (-100): Darker, Muted (Add Black/Grey)
    if (value < -20) {
        // Mix with Dark Deep Slate to simulate "receding into shadow"
        const factor = Math.abs(value) / 130; 
        return interpolateColors(baseColor, '#0f172a', factor);
    }
    
    // Volatile (+100): Brighter, but NOT White (Add Lightness but keep saturation)
    if (value > 20) {
        // Mix with a lighter, slightly desaturated version of the color
        const factor = value / 200; 
        return interpolateColors(baseColor, '#e2e8f0', factor);
    }

    // Balanced: Pure Color
    return baseColor;
};
