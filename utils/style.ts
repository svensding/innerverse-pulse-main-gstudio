
/**
 * Generates deterministic organic visual properties based on a string ID.
 * This ensures that a Star looks the same in the Map and in the Detail View,
 * without needing to pass down an index.
 */
export const getOrganicStyle = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const safeHash = Math.abs(hash);
  
    // Consistent random-like variations
    const hueShift = (safeHash % 40) - 20; // +/- 20deg hue shift
    const rotation = (safeHash % 360); // Full rotation
    const scaleVar = 0.9 + (safeHash % 5) / 10; // 0.9 to 1.3 scale
  
    return { hueShift, rotation, scaleVar };
  };
