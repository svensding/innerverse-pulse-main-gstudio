

import React from 'react';

// Reusable glyph components to avoid duplication
const SystematicDesign = () => <path d="M2 2h12v12H2zm3 3h6v6H5z" />;
const DecisiveAction = () => <path d="M2 14h12M8 2v12" />;
const AppliedVision = () => <path d="M8 11a5 5 0 000-10 5 5 0 000 10zm0-3a2 2 0 110-4 2 2 0 010 4zM2 14h12" />;
const LucidCommunication = () => <path d="M2 8h12M5 5l3 3 3-3M5 11l3-3 3 3" />;
const SustainedDiscipline = () => <path d="M3 3v10h10" />;
const StructuralSupport = () => <path d="M8 2v3m0 6v3M2 8h3m6 0h3m-5-5l2 2m-6 6l2 2m-2-6l-2 2m8-2l-2 2" />;

const AssertivePresence = () => <path d="M2 14l6-12 6 12H2z" />;
const Competence = () => <path d="M8 2l-6 6 6 6 6-6-6-6z" />;
const Resilience = () => <path d="M4 14 C4 10, 12 10, 12 14 S 4 10, 4 6 C4 2, 12 2, 12 6" />;
const InnerCompass = () => <path d="M8 2l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" />;
const CoreSovereignty = () => <path d="M8 5a3 3 0 100 6 3 3 0 000-6zM2 8h12" />;
const Loyalty = () => <path d="M2 8h12v4H2z" />;

const SocialSynergy = () => <path d="M3 3l10 10M3 13L13 3" />;
const ActiveHarmony = () => <path d="M2 8h12M5 4l3 4 3-4M5 12l3-4 3 4" />;
const ReflectiveListening = () => <path d="M2 8a6 6 0 016-6v12a6 6 0 01-6-6z" />;
const AuthenticNarrative = () => <path d="M2 8h3v5M8 3v10m3-10v5" />;
const Mentorship = () => <path d="M8 14a6 6 0 01-6-6 6 6 0 1112 0 6 6 0 01-6 6zM8 8a2 2 0 100-4 2 2 0 000 4z" />;
const RadicalOpenness = () => <path d="M2 8a6 6 0 1112 0" />;

const SomaticEmbodiment = () => <path d="M2 2h12v12H2z" />;
const EmpathicResonance = () => <path d="M2 8c2-4 6-4 8 0s-6 4-8 0z" />;
const Trust = () => <path d="M2 8h6l4 4V4L8 8" />;
const IntuitiveKnowing = () => <path d="M8 14a6 6 0 100-12 6 6 0 000 12z M8 5 v6" />;
const DistilledWisdom = () => <path d="M2 8h12M8 2v12" />;
const InnerStillness = () => <path d="M2 8h12M2 12h12" />;
const Dreaming = () => <path d="M2 8c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6zm6-4a4 4 0 100 8 4 4 0 000-8z" />;


const GLYPHS: Record<string, React.FC> = {
  // --- D1: External Structure ---
  "Systematic Design": SystematicDesign,
  "Diseño Sistemático": SystematicDesign,
  "Systematisch Ontwerp": SystematicDesign,

  "Decisive Action": DecisiveAction,
  "Acción Decisiva": DecisiveAction,
  "Daadkrachtige Actie": DecisiveAction,

  "Applied Vision": AppliedVision,
  "Visión Aplicada": AppliedVision,
  "Toegepaste Visie": AppliedVision,

  "Lucid Communication": LucidCommunication,
  "Comunicación Lúcida": LucidCommunication,
  "Heldere Communicatie": LucidCommunication,

  "Sustained Discipline": SustainedDiscipline,
  "Disciplina Sostenida": SustainedDiscipline,
  "Duurzame Discipline": SustainedDiscipline,

  "Structural Support": StructuralSupport,
  "Soporte Estructural": StructuralSupport,
  "Structurele Ondersteuning": StructuralSupport,


  // --- D2: Inner Drive ---
  "Assertive Presence": AssertivePresence,
  "Presencia Asertiva": AssertivePresence,
  "Assertieve Aanwezigheid": AssertivePresence,

  "Competence": Competence,
  "Competencia": Competence,
  "Competentie": Competence,

  "Resilience": Resilience,
  "Resiliencia": Resilience,
  "Veerkracht": Resilience,

  "Inner Compass": InnerCompass,
  "Brújula Interior": InnerCompass,
  "Innerlijk Kompas": InnerCompass,

  "Core Sovereignty": CoreSovereignty,
  "Soberanía Central": CoreSovereignty,
  "Kernsoevereiniteit": CoreSovereignty,

  "Loyalty": Loyalty,
  "Lealtad": Loyalty,
  "Loyaliteit": Loyalty,


  // --- D3: Relational Flow ---
  "Social Synergy": SocialSynergy,
  "Sinergia Social": SocialSynergy,
  "Sociale Synergie": SocialSynergy,

  "Active Harmony": ActiveHarmony,
  "Armonía Activa": ActiveHarmony,
  "Actieve Harmonie": ActiveHarmony,

  "Reflective Listening": ReflectiveListening,
  "Escucha Reflexiva": ReflectiveListening,
  "Reflectief Luisteren": ReflectiveListening,

  "Authentic Narrative": AuthenticNarrative,
  "Narrativa Auténtica": AuthenticNarrative,
  "Authentiek Verhaal": AuthenticNarrative,

  "Mentorship": Mentorship,
  "Mentoría": Mentorship,
  "Mentorschap": Mentorship,

  "Radical Openness": RadicalOpenness,
  "Apertura Radical": RadicalOpenness,
  "Radicale Openheid": RadicalOpenness,


  // --- D4: Root Connection ---
  "Somatic Embodiment": SomaticEmbodiment,
  "Encarnación Somática": SomaticEmbodiment,
  "Somatische Belichaming": SomaticEmbodiment,

  "Empathic Resonance": EmpathicResonance,
  "Resonancia Empática": EmpathicResonance,
  "Empathische Resonantie": EmpathicResonance,

  "Trust": Trust,
  "Confianza": Trust,
  "Vertrouwen": Trust,

  "Intuitive Knowing": IntuitiveKnowing,
  "Saber Intuitivo": IntuitiveKnowing,
  "Intuïtief Weten": IntuitiveKnowing,

  "Distilled Wisdom": DistilledWisdom,
  "Sabiduría Destilada": DistilledWisdom,
  "Gedistilleerde Wijsheid": DistilledWisdom,
  
  "Inner Stillness": InnerStillness, // Legacy

  "Dreaming": Dreaming,
  "Soñar": Dreaming,
  "Dromen": Dreaming,
};

const DefaultGlyph: React.FC = () => <path d="M8 8m-4 0a4 4 0 108 0 4 4 0 10-8 0" />;

const StarGlyphs: React.FC<{ name: string }> = ({ name }) => {
  const GlyphComponent = GLYPHS[name] || DefaultGlyph;
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GlyphComponent />
    </svg>
  );
};

export default StarGlyphs;
