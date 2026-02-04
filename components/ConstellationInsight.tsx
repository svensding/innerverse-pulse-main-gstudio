import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Domain, ConstellationStory } from '../types';
import { ATTRIBUTE_DEFINITIONS } from '../constants';
import GeneratedConstellationImage from './GeneratedConstellationImage';

interface ConstellationInsightProps {
  quadrant: Domain;
}

const ConstellationInsight: React.FC<ConstellationInsightProps> = ({ quadrant }) => {
  const [insight, setInsight] = useState<ConstellationStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const generateInsight = async () => {
      setLoading(true);
      setError('');
      console.info(`[Insight Generation] Starting for domain: "${quadrant.name}"`);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const userNodeData = quadrant.nodes.map(node => {
            const getQuality = (lens: 'ego' | 'soul' | 'spirit', value: number): string => {
                const spectrum = ATTRIBUTE_DEFINITIONS[node.name].spectrum[lens];
                if (value < -60) return spectrum[0];
                if (value < -20) return spectrum[1];
                if (value <= 20) return spectrum[2];
                if (value <= 60) return spectrum[3];
                return spectrum[4];
            };
            const egoValue = node.attributes[0].value ?? 0;
            const soulValue = node.attributes[1].value ?? 0;
            const spiritValue = node.attributes[2].value ?? 0;

            const egoSpectrum = ATTRIBUTE_DEFINITIONS[node.name].spectrum.ego;
            const soulSpectrum = ATTRIBUTE_DEFINITIONS[node.name].spectrum.soul;
            const spiritSpectrum = ATTRIBUTE_DEFINITIONS[node.name].spectrum.spirit;

            return `- ${node.name}:
  - Ego: '${getQuality('ego', egoValue)}' (Value: ${egoValue} on a scale of -100 to 100. Spectrum: [${egoSpectrum.join(", ")}]).
  - Soul: '${getQuality('soul', soulValue)}' (Value: ${soulValue} on a scale of -100 to 100. Spectrum: [${soulSpectrum.join(", ")}]).
  - Spirit: '${getQuality('spirit', spiritValue)}' (Value: ${spiritValue} on a scale of -100 to 100. Spectrum: [${spiritSpectrum.join(", ")}]).`;
        }).join('\n');

        const prompt = `
          You are a Cartographer of the Inner Landscape.
          The user has mapped their energy in the Domain of "${quadrant.name}", representing: "${quadrant.description}".
          The user has defined their energetic signature with the following values on a scale of -100 (Dormant) to 100 (Volatile), with 0 being Balanced.
          Here is the raw data and the full spectrum for each node:
          ${userNodeData}

          Based on this nuanced data, generate a JSON object with the following structure: { "name": string, "summary": string, "story": string, "wisdom": string }.
          - "name": A creative, evocative name for this unique energy network (e.g., "The Web of Resilient Trust", "The Ridge of Decisive Action").
          - "summary": A single, concise sentence that captures the core essence of this network.
          - "story": A short, poetic description (2 paragraphs) of this terrain. Speak directly to the user ("Your landscape here..."). Weave the user's defined qualities into a cohesive narrative.
            **GUIDANCE:** Focus on the "residence" and "weather".
            - Balanced (near 0): "Flowing, fertile, clear."
            - Volatile (> 60): "Stormy, flooding, intense heat."
            - Dormant (< -60): "Frozen, dry, quiet."
          - "wisdom": A final, reflective paragraph that offers a route for movement or a question for the user to ponder.
        `;
        
        console.log("[Insight Generation] Sending prompt to Gemini API...");
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                summary: { type: Type.STRING },
                story: { type: Type.STRING },
                wisdom: { type: Type.STRING },
              },
              required: ["name", "summary", "story", "wisdom"]
            },
          },
        });
        
        console.log("[Insight Generation] Received response from API.");
        const parsedInsight: ConstellationStory = JSON.parse(response.text);
        setInsight(parsedInsight);
        console.log("[Insight Generation] Successfully parsed and set insight story.");

      } catch (e) {
        console.error("Error generating insight:", e);
        setError("The cosmos is quiet right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    generateInsight();
  }, [quadrant]);

  return (
    <div className="p-6 md:p-8 text-white animate-fade-in h-full flex flex-col" onClick={e => e.stopPropagation()}>
      <div className="flex-shrink-0">
        <div className="w-full aspect-square p-4 my-4 rounded-xl bg-black/20">
            {quadrant && <GeneratedConstellationImage stars={quadrant.nodes} />}
        </div>
        
        {loading && (
          <div className="text-center animate-pulse">
            <h3 className="text-2xl font-bold h-8 bg-white/10 rounded w-3/4 mx-auto"></h3>
            <p className="mt-2 h-4 bg-white/10 rounded w-full mx-auto"></p>
          </div>
        )}
        {error && <p className="text-red-400 text-center">{error}</p>}
        {insight && (
            <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold tracking-wide text-amber-300">{insight.name}</h3>
                <p className="text-gray-300 mt-2 italic">{insight.summary}</p>
            </div>
        )}
      </div>
      
      <div className="my-6 border-t border-white/10 flex-shrink-0" />

      <div className="flex-grow overflow-y-auto pr-2 pt-8 space-y-4 font-light leading-snug text-gray-300">
        {loading && (
            <>
                <div className="h-4 bg-white/10 rounded w-full"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
                <div className="h-4 bg-white/10 rounded w-full"></div>
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
            </>
        )}
        {insight && (
            <>
              <p>{insight.story}</p>
              <p className="italic text-gray-400">{insight.wisdom}</p>
            </>
        )}
      </div>
    </div>
  );
};

export default ConstellationInsight;