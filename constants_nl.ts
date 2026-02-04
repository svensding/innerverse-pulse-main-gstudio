
import { Domain, AttributeDefinition, UIStrings } from './types';
import { DOMAINS_DATA as DOMAINS_DATA_EN } from './constants';

export const UI_STRINGS_NL: UIStrings = {
  pulse: "Puls",
  begin: "Begin",
  skip: "Overslaan",
  explore: "Verkennen",
  overview: "Overzicht",
  lenses: "Lenzen",
  energies: "Energieën",
  highlights: "Hoogtepunten",
  atlasReading: "Puls Lezing",
  generateReading: "Genereer Lezing",
  exportReading: "Exporteer Lezing",
  showPrompt: "Toon Prompt",
  hidePrompt: "Verberg Prompt",
  copyPrompt: "Kopieer Prompt",
  copied: "Gekopieerd",
  shareInnerverse: "Deel Innerverse",
  saveProgress: "Sla Voortgang Op",
  copyLink: "Kopieer Link",
  restart: "Herstarten",
  viewing: "Kijken naar",
  mapYourOwn: "Maak je eigen kaart",
  domainAwakens: "Domein Ontwaakt",
  continue: "Doorgaan",
  restartTitle: "Herstarten",
  restartConfirm: "Weet je zeker dat je wilt herstarten?",
  cancel: "Annuleren",
  confirm: "Bevestigen",
  pronounced: "Uitgesproken",
  balanced: "Gebalanceerd",
  dynamic: "Dynamisch",
  harmonious: "Harmonieus",
  atlasIntro: "Puls Lezing",
  atlasIntroSub: "Genereer een lezing van je innerlijke landschap.",
  deepenInquiry: "Verdiep het Onderzoek",
  explorePath: "Verken dit pad",
  mapping: "In kaart brengen...",
  error: "Fout bij genereren lezing",
  linkCopied: "Link gekopieerd naar klembord",
  linkSaved: "Voortgang opgeslagen in link",
  defined: "gedefinieerd",
  openAtlas: "Check Puls",
  keepAwake: "Scherm Aanhouden",
  balancedExpression: "gebalanceerde expressie",
  sliderLabels: {
      lacking: "ontbrekende expressie",
      low: "lage expressie",
      balanced: "gebalanceerde expressie",
      high: "hoge expressie",
      excess: "overmatige expressie",
  },
  axis: {
    doing: "Doen",
    being: "Zijn",
    seeing: "Zien",
    feeling: "Voelen",
    doingDef: "Actie & Externalisatie",
    beingDef: "Aanwezigheid & Internalisatie",
    seeingDef: "Visie & Perceptie",
    feelingDef: "Emotie & Intuïtie",
  },
  lensesTitles: {
    ego: "Ego",
    soul: "Ziel",
    spirit: "Geest",
    egoSub: "Vorm & Structuur",
    soulSub: "Essentie & Stroom",
    spiritSub: "Resonantie & Verbinding",
  },
  energiesTitles: {
    doing: "Doen",
    being: "Zijn",
    seeing: "Zien",
    feeling: "Voelen",
    doingSub: "Actie",
    beingSub: "Aanwezigheid",
    seeingSub: "Visie",
    feelingSub: "Emotie",
  },
  onboardingSeeds: {
    direction: "Richting",
    rhythm: "Ritme",
    focus: "Focus",
    reception: "Ontvangst",
    empathy: "Empathie",
    exchange: "Uitwisseling",
    sensation: "Sensatie",
    grounding: "Aarding",
    alchemy: "Alchemie",
    spark: "Vonk",
    ascent: "Opkomst",
    quest: "Zoektocht",
  },
};

export const ONBOARDING_STEPS_NL = [
  // Chapter 1: Intro
  { id: 0, text: "Ik wil je graag voorstellen aan het <strong>Innerversum</strong>", chapter: 1 },
  { id: 1, text: "Een vriendin introduceerde me ooit in dit landschap in ons.", chapter: 1 },
  { id: 2, text: "Ze beschreef vier specifieke energieën die lijken te sturen<br/>hoe we ons door de wereld bewegen.", chapter: 1 },
  { id: 3, text: "Ik probeer ze sindsdien te visualiseren.", chapter: 1 },
  
  // Chapter 2: Energies Reveal
  { id: 4, text: "Aan de ene kant is er die trek naar actie.<br/>Ik noem dit de <strong>DOEN</strong> energie.", chapter: 2 },
  { id: 5, text: "Aan de andere kant is er een gevoel van aanwezigheid.<br/>De <strong>ZIJN</strong> energie.", chapter: 2 },
  { id: 6, text: "Boven is er de stijgende energie.<br/>De <strong>ZIEN</strong> energie.", chapter: 2 },
  { id: 7, text: "En tenslotte de energie die verdiept.<br/>De <strong>VOELEN</strong> energie.", chapter: 2 },
  
  // PAUSE 1
  { id: 8, text: "Deze krachten creëren een landschap.<br/><strong>Actie vs Aanwezigheid. Visie vs Emotie.</strong>", chapter: 2 },
  { id: 9, text: "Ik nodig je uit om je deze tegengestelde krachten voor te stellen,<br/>en hoe jij je tot elk van hen verhoudt.", chapter: 2, isInteractive: true },

  // Chapter 3: Domains Reveal
  { id: 10, text: "Het wordt interessant waar deze energieën elkaar ontmoeten.", chapter: 3 },
  
  // D1
  { id: 11, text: "Waar Doen Zien ontmoet...<br/>Dat noem ik <strong>Externe Structuur</strong>.", chapter: 3 },
  { id: 12, text: "Het is dat tastbare gevoel van plannen en resultaten boeken.", chapter: 3 },
  
  // D3
  { id: 13, text: "Waar Zijn Zien ontmoet...<br/>wordt <strong>Onderlinge Verbondenheid</strong>.", chapter: 3 },
  { id: 14, text: "Dit is waar energie lijkt te bewegen tussen ons en anderen.", chapter: 3 },
  
  // D4
  { id: 15, text: "Waar Zijn Voelen ontmoet...<br/>vinden we <strong>Diepe Aanwezigheid</strong>.", chapter: 3 },
  { id: 16, text: "Dit voelt als veiligheid, intuïtie en innerlijke wijsheid.", chapter: 3 },
  
  // D2
  { id: 17, text: "En waar Doen Voelen ontmoet...<br/>ligt <strong>Innerlijke Drijfveer</strong>.", chapter: 3 },
  { id: 18, text: "Die opwelling van motivatie en kracht die uit de onderbuik komt.", chapter: 3 },

  // PAUSE 2
  { id: 19, text: "Kaarten zijn niet het gebied zelf, maar ze helpen ons navigeren.<br/>Misschien voel je al dat je sommige domeinen meer bewoont dan andere.", chapter: 3, isInteractive: true },
  
  // Chapter 4: Expressions
  { id: 20, text: "Een tijdje gebruikte ik gewoon deze simpele kaart.", chapter: 4 },
  { id: 21, text: "Maar ik realiseerde me dat alleen weten over een 'Domein' iets te breed was.", chapter: 4 },
  
  // ZOOM TO REALM (D1)
  { id: 22, text: "Dus keek ik dichterbij. Ik probeerde de unieke expressies te identificeren die in deze regio's leven.", chapter: 4 },
  
  // REVEAL STARS
  { id: 23, text: "Ik vond <strong>6 punten</strong> binnen elk domein die hielpen dingen te verhelderen.", chapter: 4 },

  // PAUSE 3
  { id: 24, text: "Zo inzoomen hielp me nog beter te verhouden tot het landschap.<br/>Ga je gang, neem een kijkje.", chapter: 4, isInteractive: true },
  
  // Chapter 5: Lenses
  { id: 25, text: "Ik wilde echter ook mijn interne balans in kaart brengen.", chapter: 5 },
  { id: 26, text: "Ik had een manier nodig om nuance te observeren.<br/>Dus stelde ik me <strong>3 lenzen</strong> voor om helder te kunnen zien.", chapter: 5 },
  
  // Lens 1
  { id: 27, text: "Eén lens kijkt naar onze <strong>Vorm</strong>—<br/>hoe we dingen en onszelf definiëren.", chapter: 5 },
  // Lens 2
  { id: 28, text: "Een andere lens bekijkt onze <strong>Essentie</strong>—<br/>hoe helder we onze natuurlijke leiding vinden.", chapter: 5 },
  // Lens 3
  { id: 29, text: "De laatste lens reflecteert op onze <strong>Resonantie</strong>—<br/>hoe verbonden we ons voelen buiten onszelf.", chapter: 5 },
  
  // Chapter 6: Final
  { id: 30, text: "Door deze lenzen geloof ik dat we de verschillende aspecten<br/>van onszelf eerlijk kunnen zien.", chapter: 6 },
  { id: 31, text: "Tot nu toe is dit het Innerversum dat ik in kaart heb gebracht.", chapter: 6 },
  { id: 99, text: "En nu nodig ik je uit om je eigen energieën erin te verkennen.<br/>Ga je gang, bezoek alle 24 expressies en breng je eigen kaart in beeld.", chapter: 6 }
];

// Clone EN structure for NL
export const DOMAINS_DATA_NL: Domain[] = JSON.parse(JSON.stringify(DOMAINS_DATA_EN));

// Add Dutch translations for Domains
// Note: English indices are now: 0=ExternalStructure, 1=RelationalFlow, 2=InnerDrive, 3=RootConnection

DOMAINS_DATA_NL[0].name = "Externe Structuur";
DOMAINS_DATA_NL[0].description = "Het domein van tastbare actie en zichtbare systemen.";
DOMAINS_DATA_NL[0].inkColor = "#ea580c"; // Override to Orange
DOMAINS_DATA_NL[0].nodes[0].name = "Systematisch Ontwerp";
DOMAINS_DATA_NL[0].nodes[1].name = "Daadkrachtige Actie";
DOMAINS_DATA_NL[0].nodes[2].name = "Toegepaste Visie";
DOMAINS_DATA_NL[0].nodes[3].name = "Heldere Communicatie";
DOMAINS_DATA_NL[0].nodes[4].name = "Duurzame Discipline";
DOMAINS_DATA_NL[0].nodes[5].name = "Structurele Ondersteuning";

DOMAINS_DATA_NL[1].name = "Onderlinge Verbondenheid";
DOMAINS_DATA_NL[1].description = "Het web van relaties en gedeelde perceptie.";
DOMAINS_DATA_NL[1].nodes[0].name = "Sociale Synergie";
DOMAINS_DATA_NL[1].nodes[1].name = "Actieve Harmonie";
DOMAINS_DATA_NL[1].nodes[2].name = "Reflectief Luisteren";
DOMAINS_DATA_NL[1].nodes[3].name = "Authentiek Verhaal";
DOMAINS_DATA_NL[1].nodes[4].name = "Mentorschap";
DOMAINS_DATA_NL[1].nodes[5].name = "Radicale Openheid";

DOMAINS_DATA_NL[2].name = "Innerlijke Drijfveer";
DOMAINS_DATA_NL[2].description = "De motor van wil en emotionele voortstuwing.";
DOMAINS_DATA_NL[2].nodes[0].name = "Assertieve Aanwezigheid";
DOMAINS_DATA_NL[2].nodes[1].name = "Competentie";
DOMAINS_DATA_NL[2].nodes[2].name = "Veerkracht";
DOMAINS_DATA_NL[2].nodes[3].name = "Innerlijk Kompas";
DOMAINS_DATA_NL[2].nodes[4].name = "Kernsoevereiniteit";
DOMAINS_DATA_NL[2].nodes[5].name = "Loyaliteit";

DOMAINS_DATA_NL[3].name = "Diepe Aanwezigheid";
DOMAINS_DATA_NL[3].description = "De oceaan van stilte en gevoeld zintuig.";
DOMAINS_DATA_NL[3].nodes[0].name = "Somatische Belichaming";
DOMAINS_DATA_NL[3].nodes[1].name = "Empathische Resonantie";
DOMAINS_DATA_NL[3].nodes[2].name = "Vertrouwen";
DOMAINS_DATA_NL[3].nodes[3].name = "Intuïtief Weten";
DOMAINS_DATA_NL[3].nodes[4].name = "Gedistilleerde Wijsheid";
DOMAINS_DATA_NL[3].nodes[5].name = "Dromen";

export const ATTRIBUTE_DEFINITIONS_NL: Record<string, AttributeDefinition> = {
  // ... (rest of file remains unchanged)
  // --- REALM 1: EXTERNE STRUCTUUR ---
  "Systematisch Ontwerp": {
    description: "Richting: Planning & Vooruitzien.",
    prompt: {
      ego: "Hoe duidelijk gedefinieerd is je pad vooruit?",
      soul: "Hoe voelt jouw logica voor jou?",
      spirit: "Hoe projecteer je jouw plannen?"
    },
    spectrum: {
      ego: ["Dwalend", "Wazig", "Helder", "Lineair", "Vast"],
      soul: ["Abstract", "Improviserend", "Coherent", "Berekend", "Mechanisch"],
      spirit: ["Intern", "Afgeschermd", "Gidsend", "Sturend", "Bevelend"]
    }
  },
  "Daadkrachtige Actie": {
    description: "Voltooiing: Uitvoering & Afronding.",
    prompt: {
      ego: "Hoe gedefinieerd is je vermogen om af te ronden?",
      soul: "Wat is de textuur van je werkenergie?",
      spirit: "Hoe zichtbaar zijn je resultaten?"
    },
    spectrum: {
      ego: ["Open einde", "Drijvend", "Stabiel", "Drijvend/Stuwend", "Definitief"],
      soul: ["Zwaar", "Sporadisch", "Vloeiend", "Gespannen", "Slopend"],
      spirit: ["Subtiel", "Mengend", "Tastbaar", "Prominent", "Dominerend"]
    }
  },
  "Duurzame Discipline": {
    description: "Ritme: Routine & Systemen.",
    prompt: {
      ego: "Hoe gestructureerd is je dagelijkse beweging?",
      soul: "Hoe beïnvloedt je omgeving je innerlijke orde?",
      spirit: "Hoe beïnvloed jij de orde van anderen?"
    },
    spectrum: {
      ego: ["Vrije vorm", "Variabel", "Ritmisch", "Consistent", "Geregiementeerd"],
      soul: ["Doordringbaar", "Rommelig", "Geordend", "Gecureerd", "Steriel"],
      spirit: ["Passief", "Flexibel", "Stabiliserend", "Corrigerend", "Controlerend"]
    }
  },
  "Toegepaste Visie": {
    description: "Focus: Detail & Analyse.",
    prompt: {
      ego: "Hoe scherp is je aandacht voor detail?",
      soul: "Hoe verwerk je informatie?",
      spirit: "Hoe deel je je observaties?"
    },
    spectrum: {
      ego: ["Breed", "Zacht", "Scherp", "Snijdend", "Microscopisch"],
      soul: ["Absorberend", "Zeven/Filteren", "Synthetiserend", "Ontledend", "Bestuderend"],
      spirit: ["Stil", "Gereserveerd", "Verhelderend", "Debatterend", "Doorborend"]
    }
  },
  "Structurele Ondersteuning": {
    description: "Behoud: Middelen & Zekerheid.",
    prompt: {
      ego: "Hoe gedefinieerd is je greep op middelen?",
      soul: "Wat is je gevoel rondom overvloed?",
      spirit: "Hoe beweegt jouw energie van middelen?"
    },
    spectrum: {
      ego: ["Los", "Schommelend", "Veilig", "Strak", "Op slot"],
      soul: ["Schaars", "Bezorgd", "Voldoende", "Accumulerend", "Compulsief"],
      spirit: ["Lekkend", "Vasthoudend", "Circulerend", "Transactioneel", "Hefboomwerking"]
    }
  },
  "Heldere Communicatie": {
    description: "Houding: Verantwoordelijkheid & Besluit.",
    prompt: {
      ego: "Hoe solide is je besluitvorming?",
      soul: "Hoe zwaar voelt verantwoordelijkheid voor jou?",
      spirit: "Hoe beïnvloedt je aanwezigheid de ruimte?"
    },
    spectrum: {
      ego: ["Vloeiend", "Adaptief", "Geaard", "Ferm", "Onbeweeglijk"],
      soul: ["Extern", "Onzeker", "Soeverein", "Egoïstisch", "Absoluut"],
      spirit: ["Terugtrekkend", "Neutraal", "Bekrachtigend", "Zwaar", "Overheersend"]
    }
  },

  // --- REALM 2: RELATIONALE STROOM ---
  "Authentiek Verhaal": {
    description: "Articulatie: Expressie & Waarheid.",
    prompt: {
      ego: "Hoe authentiek stroomt jouw waarheid naar anderen?",
      soul: "Hoe voelt je expressie?",
      spirit: "Hoe landt je stem in de ruimte?"
    },
    spectrum: {
      ego: ["Stil", "Gedempt", "Resonerend", "Luid", "Uitzendend"],
      soul: ["Gemaskerd", "Bewerkt", "Authentiek", "Rauw", "Ongefilterd"],
      spirit: ["Vervagend", "Echolopend", "Harmonisch", "Doordringend", "Overweldigend"]
    }
  },
  "Reflectief Luisteren": {
    description: "Ontvangst: Luisteren & Aanwezigheid.",
    prompt: {
      ego: "Hoe open is je ruimte voor anderen?",
      soul: "Hoe diep absorbeer je wat je hoort?",
      spirit: "Hoe weerspiegel je anderen?"
    },
    spectrum: {
      ego: ["Gesloten", "Geselecteerd", "Ruimtelijk", "Poreus", "Overstroomd"],
      soul: ["Onthecht", "Oppervlakkig", "Empathisch", "Verzadigd", "Versmolten"],
      spirit: ["Blanco", "Vervagend", "Verhelderend", "Versterkend", "Vervormend"]
    }
  },
  "Actieve Harmonie": {
    description: "Bemiddeling: Harmonie & Navigatie.",
    prompt: {
      ego: "Hoe harmoniseer je spanning?",
      soul: "Hoe voel je je te midden van spanning?",
      spirit: "Welke energie breng je in een groep?"
    },
    spectrum: {
      ego: ["Terugtrekkend", "Meegevend", "Navigerend", "Opeisend", "Botsend"],
      soul: ["Ongemakkelijk", "Voorzichtig", "Gecentreerd", "Berekend", "Prikkelbaar"],
      spirit: ["Onzichtbaar", "Volgend", "Verbindend", "Verdelend", "Explosief"]
    }
  },
  "Mentorschap": {
    description: "Steun: Onderwijzen & Helpen.",
    prompt: {
      ego: "Hoe aanwezig is je begeleiding?",
      soul: "Wat is de bron van je compassie?",
      spirit: "Hoe wordt je begeleiding waargenomen?"
    },
    spectrum: {
      ego: ["Ingehouden", "Vaag", "Betrouwbaar", "Betrokken", "Ingrijpend"],
      soul: ["Verplichting", "Sympathie", "Compassie", "Trots", "Redder"],
      spirit: ["Ongezien", "Zacht", "Opbeurend", "Zwaar", "Sturend"]
    }
  },
  "Radicale Openheid": {
    description: "Nabijheid: Intimiteit & Vertrouwen.",
    prompt: {
      ego: "Hoe gedefinieerd zijn je grenzen in intimiteit?",
      soul: "Hoe veilig voel je je in kwetsbaarheid?",
      spirit: "Hoe uit je toewijding zich?"
    },
    spectrum: {
      ego: ["Opgelost", "Doordringbaar", "Flexibel", "Bewaakt", "Ommuraad"],
      soul: ["Blootgesteld", "Behoedzaam", "Open", "Afhankelijk", "Klampend"],
      spirit: ["Koel", "Afstandelijk", "Warm", "Intens", "Verterend"]
    }
  },
  "Sociale Synergie": {
    description: "Uitwisseling: Sociaal & Spel.",
    prompt: {
      ego: "Hoe gemakkelijk ga je mee in sociale stroom?",
      soul: "Hoe licht is je geest in gezelschap?",
      spirit: "Hoe beïnvloed je de sfeer?"
    },
    spectrum: {
      ego: ["Solitair", "Aarzelend", "Vloeiend", "Performatief", "Chaotisch"],
      soul: ["Zwaar", "Gereserveerd", "Lichtvoetig", "Manisch", "Hysterisch"],
      spirit: ["Dempend", "Neutraal", "Vonkend", "Afleidend", "Uitputtend"]
    }
  },

  // --- REALM 3: WORTELVERBINDING ---
  "Somatische Belichaming": {
    description: "Sensatie: Lichaamsbewustzijn.",
    prompt: {
      ego: "Hoe verbonden ben je met fysieke signalen?",
      soul: "Hoe eer je de verzoeken van je lichaam?",
      spirit: "Wat straalt je fysieke aanwezigheid uit?"
    },
    spectrum: {
      ego: ["Verdoofd", "Afstandelijk", "Belichaamd", "Sensitief", "Hypersensitief"],
      soul: ["Negerend", "Minimaal", "Voedend", "Verwenend", "Hedonistisch"],
      spirit: ["Fantasmal", "Débil", "Vital", "Rusteloos", "Koortsig"]
    }
  },
  "Vertrouwen": {
    description: "Aarding: Veiligheid & Stabiliteit.",
    prompt: {
      ego: "Hoe solide is je gevoel van thuis?",
      soul: "Hoe gemakkelijk vind je rust?",
      spirit: "Hoe houd je ruimte voor jezelf?"
    },
    spectrum: {
      ego: ["Wortelloos", "Verschuivend", "Geworteld", "Verankerd", "Vastzittend"],
      soul: ["Geagiteerd", "Angstig", "Geaard", "Zwaar", "Traag/Inert"],
      spirit: ["Instortend", "Lekkend", "Dragend", "Bewakend", "Isolerend"]
    }
  },
  "Dromen": {
    description: "Visie: Verbeelding & Onderbewustzijn.",
    prompt: {
      ego: "Hoe levendig is je interne beeldvorming?",
      soul: "Hoe verhoud je je tot het abstracte?",
      spirit: "Hoeveel overlapt je binnenwereld je buitenwereld?"
    },
    spectrum: {
      ego: ["Donker", "Wazig", "Levendig", "Hallucinair", "Allesoverheersend"],
      soul: ["Vermijdend", "Sceptisch", "Geïnspireerd", "Escapistisch", "Verdwaald"],
      spirit: ["Gescheiden", "Vervagend", "Visionair", "Overlappend", "Waanachtig"]
    }
  },
  "Intuïtief Weten": {
    description: "Weten: Intuïtie & Reflectie.",
    prompt: {
      ego: "Hoe helder hoor je je intuïtie?",
      soul: "Hoe volledig heb je je verleden geïntegreerd?",
      spirit: "Hoe draag je jouw waarheid?"
    },
    spectrum: {
      ego: ["Stil", "Gedempt", "Helder", "Luid", "Oorverdovend"],
      soul: ["Onthecht", "Onzeker", "Geïntegreerd", "Spijtig", "Achtervolgd"],
      spirit: ["Onzeker", "Stil", "Resonerend", "Prekerig", "Dogmatisch"]
    }
  },
  "Empathische Resonantie": {
    description: "Alchemie: Transformatie & Emotie.",
    prompt: {
      ego: "Hoe doorlaatbaar ben je voor emotionele verschuivingen?",
      soul: "Hoe verwerk je emotionele pijn?",
      spirit: "Wat is je relatie tot de schaduw?"
    },
    spectrum: {
      ego: ["Broos", "Weerstand biedend", "Adaptief", "Vluchtig", "Destructief"],
      soul: ["Begraven", "Onderdrukken", "Transmuteren", "Zwalgend", "Identificerend"],
      spirit: ["Ontkenning", "Projectie", "Acceptatie", "Fixatie", "Bezetenheid"]
    }
  },
  "Gedistilleerde Wijsheid": {
    description: "Verstilling: Rust & Leegte.",
    prompt: {
      ego: "Hoe gedefinieerd is je vermogen om te stoppen?",
      soul: "Hoe comfortabel is stilte voor jou?",
      spirit: "Hoe trek je je terug uit de wereld?"
    },
    spectrum: {
      ego: ["Niet-bestaand", "Friemelend", "Rustgevend", "Zwaar", "Verlamd"],
      soul: ["Angstaanjagend", "Leeg", "Vredig", "Eenzaam", "Desolaat"],
      spirit: ["Rennend", "Verbergend", "Terugtrekkend", "Verdwijnend", "Uitwissend"]
    }
  },

  // --- REALM 4: INNERLIJKE DRIJFVEER ---
  "Innerlijk Kompas": {
    description: "Vonk: Initiatie & Moed.",
    prompt: {
      ego: "Hoe snel start je nieuwe dingen?",
      soul: "Wat is de kwaliteit van je opwinding?",
      spirit: "Hoe voelt het nemen van risico's?"
    },
    spectrum: {
      ego: ["Bevroren", "Uitstellend", "Ontstekend", "Impulsief", "Roekeloos"],
      soul: ["Slapend", "Dof", "Elektrisch", "Koortsig", "Explosief"],
      spirit: ["Verlamd", "Voorzichtig", "Dapper", "Gevaarlijk", "Zelfdestructief"]
    }
  },
  "Assertieve Aanwezigheid": {
    description: "Opkomst: Ambitie & Groei.",
    prompt: {
      ego: "Hoe duidelijk is je drang om te klimmen?",
      soul: "Wat voedt je klim?",
      spirit: "Hoe verhoud je je tot prestaties?"
    },
    spectrum: {
      ego: ["Doelloos", "Drijvend", "Stijgend", "Grijpend", "Meedogenloos"],
      soul: ["Vacuüm", "Afgunst", "Doelgerichtheid", "Honger", "Onverzadigbaarheid"],
      spirit: ["Onwaardig", "Afwijzend", "Trots", "Superieur", "Narcistisch"]
    }
  },
  "Veerkracht": {
    description: "Verdediging: Grenzen & Weerbaarheid.",
    prompt: {
      ego: "Hoe sterk zijn je grenzen?",
      soul: "Wat is je reflex als je wordt uitgedaagd?",
      spirit: "Hoe gebruik je je kracht?"
    },
    spectrum: {
      ego: ["Open", "Zwak", "Beschermd", "Ommuraad", "Vijandig"],
      soul: ["Meegevend", "Instortend", "Veerkrachtig", "Verhard", "Bitter"],
      spirit: ["Machteloos", "Gedwee", "Beschermend", "Agressief", "Gewelddadig"]
    }
  },
  "Kernsoevereiniteit": {
    description: "Zoektocht: Nieuwsgierigheid & Betekenis.",
    prompt: {
      ego: "Hoe actief is je honger naar het onbekende?",
      soul: "Hoe voelt het onbekende voor jou?",
      spirit: "Hoe beweegt je nieuwsgierigheid?"
    },
    spectrum: {
      ego: ["Apathisch", "Dwalend", "Zoekend", "Rusteloos", "Verdwaald"],
      soul: ["Bedreigend", "Saai", "Wonderlijk", "Obsessief", "Waanzinnig"],
      spirit: ["Stagnerend", "In kringen", "Spiraalvormig", "Versnipperd", "Chaotisch"]
    }
  },
  "Competentie": {
    description: "Autonomie: Onafhankelijkheid & Authenticiteit.",
    prompt: {
      ego: "Hoe gedefinieerd is je eigen pad?",
      soul: "Hoeveel externe goedkeuring heb je nodig?",
      spirit: "Hoe val je op?"
    },
    spectrum: {
      ego: ["Conformerend", "Versmolten", "Onderscheidend", "Contrariaans", "Vervreemd"],
      soul: ["Wanhopig", "Behagend", "Zelf-gevalideerd", "Uitdagend", "Antisociaal"],
      spirit: ["Opgaand in de massa", "Grijs", "Levendig", "Schurend", "Aanstootgevend"]
    }
  },
  "Loyaliteit": {
    description: "Verlangen: Motivatie & Begeerte.",
    prompt: {
      ego: "Hoe consistent is je drijfveer?",
      soul: "Wat is de bron van je willen?",
      spirit: "Hoe beïnvloedt je verlangen je focus?"
    },
    spectrum: {
      ego: ["Vlak", "Piekend", "Duurzaam", "Intens", "Manisch"],
      soul: ["Gebrek", "Hunkering", "Passie", "Lust", "Verslaving"],
      spirit: ["Afgeleid", "Versnipperd", "Gericht", "Gefixeerd", "Verteerd"]
    }
  }
};
