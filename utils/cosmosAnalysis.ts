import { Domain, MandalaData, LensData, PrimaryEnergyData, PersonalSpectrum, CosmicHighlights, Node, AnalysisData } from '../types';

const calculateStats = (values: number[]): { mean: number; stdDev: number } => {
  if (values.length === 0) {
    return { mean: 0, stdDev: 0 };
  }

  const mean = values.reduce((acc, val) => acc + val, 0) / values.length;

  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const avgSquaredDiff = squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
  const stdDev = Math.sqrt(avgSquaredDiff);

  return { mean, stdDev };
};

export const calculateMandalaData = (domains: Domain[]): MandalaData => {
  const mandalaData: MandalaData = {};

  domains.forEach(domain => {
    const definedAttributeValues = domain.nodes
      .flatMap(node => node.attributes)
      .filter(attr => attr.value !== null)
      .map(attr => attr.value as number);

    const { mean, stdDev } = calculateStats(definedAttributeValues);
    
    mandalaData[domain.id] = {
      equilibrium: mean,
      flux: stdDev,
    };
  });

  return mandalaData;
};

export const calculateLensData = (domains: Domain[]): LensData => {
  const allAttributes = domains.flatMap(d => d.nodes).flatMap(n => n.attributes);
  
  const egoValues = allAttributes.filter(a => a.name === 'Ego' && a.value !== null).map(a => a.value as number);
  const soulValues = allAttributes.filter(a => a.name === 'Soul' && a.value !== null).map(a => a.value as number);
  const spiritValues = allAttributes.filter(a => a.name === 'Spirit' && a.value !== null).map(a => a.value as number);

  const egoStats = calculateStats(egoValues);
  const soulStats = calculateStats(soulValues);
  const spiritStats = calculateStats(spiritValues);
  
  return {
    ego: { equilibrium: egoStats.mean, flux: egoStats.stdDev },
    soul: { equilibrium: soulStats.mean, flux: soulStats.stdDev },
    spirit: { equilibrium: spiritStats.mean, flux: spiritStats.stdDev },
  };
};

export const calculatePrimaryEnergyData = (domains: Domain[]): PrimaryEnergyData => {
  const getValues = (domainIds: string[]): number[] => {
    return domains
      .filter(d => domainIds.includes(d.id))
      .flatMap(d => d.nodes)
      .flatMap(n => n.attributes)
      .filter(a => a.value !== null)
      .map(a => a.value as number);
  };
  
  const doingValues = getValues(['d1', 'd2']); // External Structure + Inner Drive
  const beingValues = getValues(['d3', 'd4']); // Interconnection + Deep Presence
  const seeingValues = getValues(['d1', 'd3']); // External Structure + Interconnection
  const feelingValues = getValues(['d2', 'd4']); // Inner Drive + Deep Presence
  
  const doingStats = calculateStats(doingValues);
  const beingStats = calculateStats(beingValues);
  const seeingStats = calculateStats(seeingValues);
  const feelingStats = calculateStats(feelingValues);

  return {
    doing: { equilibrium: doingStats.mean, flux: doingStats.stdDev },
    being: { equilibrium: beingStats.mean, flux: beingStats.stdDev },
    seeing: { equilibrium: seeingStats.mean, flux: seeingStats.stdDev },
    feeling: { equilibrium: feelingStats.mean, flux: feelingStats.stdDev },
  };
};

export const calculatePersonalSpectrum = (domains: Domain[]): PersonalSpectrum => {
  const allValues = domains
    .flatMap(d => d.nodes)
    .flatMap(n => n.attributes)
    .map(a => a.value)
    .filter((v): v is number => v !== null);

  if (allValues.length === 0) {
    return { min: -100, max: 100 };
  }

  return {
    min: Math.min(...allValues),
    max: Math.max(...allValues),
  };
};

export const calculateCosmicHighlights = (domains: Domain[], mandalaData: MandalaData): CosmicHighlights | null => {
  const allNodes = domains.flatMap(d => d.nodes).filter(n => n.attributes.every(a => a.value !== null));
  if (allNodes.length < 3) return null;

  const nodeAverages = allNodes.map(node => ({
    name: node.name,
    avg: node.attributes.reduce((acc, attr) => acc + (attr.value ?? 0), 0) / 3,
  }));

  const mostPronouncedNodes = [...nodeAverages].sort((a, b) => Math.abs(b.avg) - Math.abs(a.avg)).slice(0, 3);
  const mostBalancedNodes = [...nodeAverages].sort((a, b) => Math.abs(a.avg) - Math.abs(b.avg)).slice(0, 3);

  const realms = Object.entries(mandalaData).map(([id, data]) => {
      const domain = domains.find(d => d.id === id);
      return {
          name: domain?.name || 'Unknown Realm',
          flux: data.flux,
      };
  }).filter(r => r.flux > 0);
  
  if (realms.length === 0) return null;

  const mostComplexDomains = [...realms].sort((a, b) => b.flux - a.flux).slice(0, 2);
  const mostHarmoniousDomains = [...realms].sort((a, b) => a.flux - b.flux).slice(0, 2);

  return {
    mostPronouncedNodes: mostPronouncedNodes.map(s => ({ name: s.name, value: s.avg, description: 'An energy with strong expression.' })),
    mostBalancedNodes: mostBalancedNodes.map(s => ({ name: s.name, value: s.avg, description: 'An energy in a balanced flow state.' })),
    mostComplexDomains: mostComplexDomains.map(r => ({ name: r.name, value: r.flux, description: 'A domain with high internal tension and complexity.' })),
    mostHarmoniousDomains: mostHarmoniousDomains.map(r => ({ name: r.name, value: r.flux, description: 'A domain with stable and consistent energy.' })),
  };
};

export const calculateAllNodeAverages = (domains: Domain[]): Record<string, AnalysisData> => {
    const allNodeData: Record<string, AnalysisData> = {};
    domains.flatMap(d => d.nodes).forEach(node => {
        const definedValues = node.attributes.filter(a => a.value !== null).map(a => a.value as number);
        const { mean, stdDev } = calculateStats(definedValues);
        allNodeData[node.name] = { equilibrium: mean, flux: stdDev };
    });
    return allNodeData;
};

export const calculateNodeAverages = (nodes: Node[]): Record<string, AnalysisData> => {
    const nodeData: Record<string, AnalysisData> = {};
    nodes.forEach(node => {
        const definedValues = node.attributes.filter(a => a.value !== null).map(a => a.value as number);
        const { mean, stdDev } = calculateStats(definedValues);
        nodeData[node.name] = { equilibrium: mean, flux: stdDev };
    });
    return nodeData;
};

export const getNodesForEnergy = (energy: 'doing'|'being'|'seeing'|'feeling', domains: Domain[]): Node[] => {
    const domainMap = {
        doing: ['d1', 'd2'],
        being: ['d3', 'd4'],
        seeing: ['d1', 'd3'],
        feeling: ['d2', 'd4'],
    };
    const relevantDomainIds = domainMap[energy];
    return domains
        .filter(d => relevantDomainIds.includes(d.id))
        .flatMap(d => d.nodes)
        .filter(n => n.attributes.every(a => a.value !== null));
};

export const calculateLensDataByDomain = (domains: Domain[]): {
    ego: MandalaData;
    soul: MandalaData;
    spirit: MandalaData;
} => {
    const egoData: MandalaData = {};
    const soulData: MandalaData = {};
    const spiritData: MandalaData = {};

    domains.forEach(d => {
        const allAttrs = d.nodes.flatMap(n => n.attributes);
        const egoValues = allAttrs.filter(a => a.name === 'Ego' && a.value !== null).map(a => a.value as number);
        const soulValues = allAttrs.filter(a => a.name === 'Soul' && a.value !== null).map(a => a.value as number);
        const spiritValues = allAttrs.filter(a => a.name === 'Spirit' && a.value !== null).map(a => a.value as number);

        egoData[d.id] = { equilibrium: calculateStats(egoValues).mean, flux: calculateStats(egoValues).stdDev };
        soulData[d.id] = { equilibrium: calculateStats(soulValues).mean, flux: calculateStats(soulValues).stdDev };
        spiritData[d.id] = { equilibrium: calculateStats(spiritValues).mean, flux: calculateStats(spiritValues).stdDev };
    });

    return { ego: egoData, soul: soulData, spirit: spiritData };
};