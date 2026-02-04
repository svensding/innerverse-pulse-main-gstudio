
import { Domain, AttributeDefinition, UIStrings } from './types';
import { DOMAINS_DATA as DOMAINS_DATA_EN } from './constants';

export const UI_STRINGS_ES: UIStrings = {
  pulse: "Pulso",
  begin: "Comenzar",
  skip: "Saltar",
  explore: "Explorar",
  overview: "Resumen",
  lenses: "Lentes",
  energies: "Energías",
  highlights: "Destacados",
  atlasReading: "Lectura de Pulso",
  generateReading: "Generar Lectura",
  exportReading: "Exportar Lectura",
  showPrompt: "Mostrar Prompt",
  hidePrompt: "Ocultar Prompt",
  copyPrompt: "Copiar Prompt",
  copied: "Copiado",
  shareInnerverse: "Compartir Innerverse",
  saveProgress: "Guardar Progreso",
  copyLink: "Copiar Enlace",
  restart: "Reiniciar",
  viewing: "Viendo",
  mapYourOwn: "Mapea el Tuyo",
  domainAwakens: "Dominio Despierta",
  continue: "Continuar",
  restartTitle: "Reiniciar",
  restartConfirm: "¿Estás seguro de que quieres reiniciar?",
  cancel: "Cancelar",
  confirm: "Confirmar",
  pronounced: "Pronunciado",
  balanced: "Equilibrado",
  dynamic: "Dinámico",
  harmonious: "Armonioso",
  atlasIntro: "Lectura de Pulso",
  atlasIntroSub: "Genera una lectura de tu paisaje interior.",
  deepenInquiry: "Profundizar la Indagación",
  explorePath: "Explorar este camino",
  mapping: "Mapeando...",
  error: "Error al generar la lectura",
  linkCopied: "Enlace copiado al portapapeles",
  linkSaved: "Progreso guardado en el enlace",
  defined: "definido",
  openAtlas: "Verificar Pulso",
  keepAwake: "Mantener Pantalla",
  balancedExpression: "expresión equilibrada",
  sliderLabels: {
      lacking: "expresión deficiente",
      low: "expresión baja",
      balanced: "expresión equilibrada",
      high: "expresión alta",
      excess: "expresión excesiva",
  },
  axis: {
    doing: "Hacer",
    being: "Ser",
    seeing: "Ver",
    feeling: "Sentir",
    doingDef: "Acción y Externalización",
    beingDef: "Presencia e Internalización",
    seeingDef: "Visión y Percepción",
    feelingDef: "Emoción e Intuición",
  },
  lensesTitles: {
    ego: "Ego",
    soul: "Alma",
    spirit: "Espíritu",
    egoSub: "Forma y Estructura",
    soulSub: "Esencia y Flujo",
    spiritSub: "Resonancia y Conexión",
  },
  energiesTitles: {
    doing: "Hacer",
    being: "Ser",
    seeing: "Ver",
    feeling: "Sentir",
    doingSub: "Acción",
    beingSub: "Presencia",
    seeingSub: "Visión",
    feelingSub: "Emoción",
  },
  onboardingSeeds: {
    direction: "Dirección",
    rhythm: "Ritme",
    focus: "Enfoque",
    reception: "Recepción",
    empathy: "Empatía",
    exchange: "Intercambio",
    sensation: "Sensación",
    grounding: "Arraigo",
    alchemy: "Alquimia",
    spark: "Chispa",
    ascent: "Ascenso",
    quest: "Búsqueda",
  },
};

export const ONBOARDING_STEPS_ES = [
  // Chapter 1: Intro
  { id: 0, text: "Me gustaría presentarte el <strong>Interverso</strong>", chapter: 1 },
  { id: 1, text: "Una amiga me presentó una vez este paisaje dentro de nosotros.", chapter: 1 },
  { id: 2, text: "Me dijo que hay 4 energías de las que extraemos nuestro comportamiento.", chapter: 1 },
  { id: 3, text: "Este es mi intento de presentarlas.", chapter: 1 },
  
  // Chapter 2: Energies Reveal
  { id: 4, text: "De un lado está la energía <strong>HACER</strong>, que nos conecta<br/>con nuestra relación con la acción y el movimiento.", chapter: 2 },
  { id: 5, text: "Y del otro lado está la energía <strong>SER</strong>, que nos muestra<br/>nuestra relación con la presencia y la receptividad.", chapter: 2 },
  { id: 6, text: "Arriba de ellas está la energía <strong>VER</strong>, aquí está nuestra<br/>interacción con lo explícito y visible.", chapter: 2 },
  { id: 7, text: "Y debajo de ellas está la energía <strong>SENTIR</strong>, lo que percibimos<br/>desde adentro, lo implícito y encarnado.", chapter: 2 },
  
  // PAUSE 1
  { id: 8, text: "Estas fuerzas crean un paisaje.<br/><strong>Acción vs Presencia. Visión vs Emoción.</strong>", chapter: 2 },
  { id: 9, text: "Te invito a tomar un momento para imaginar estas fuerzas opuestas,<br/>y cómo te relacionas con cada una de ellas.", chapter: 2, isInteractive: true },

  // Chapter 3: Domains Reveal
  { id: 10, text: "Se pone interesante donde estas energías se encuentran.", chapter: 3 },
  
  // D1
  { id: 11, text: "Donde Hacer se encuentra con Ver...<br/>lo llamo <strong>Estructura Externa</strong>.", chapter: 3 },
  { id: 12, text: "Es esa sensación tangible de planificar y obtener resultados.", chapter: 3 },
  
  // D3
  { id: 13, text: "Donde Ser se encuentra con Ver...<br/>se convierte en <strong>Flujo Relacional</strong>.", chapter: 3 },
  { id: 14, text: "Aquí es donde la energía parece moverse entre nosotros y los demás.", chapter: 3 },
  
  // D4
  { id: 15, text: "Donde Ser se encuentra con Sentir...<br/>encontramos la <strong>Conexión Raíz</strong>.", chapter: 3 },
  { id: 16, text: "Esto se siente como seguridad, intuición y sabiduría interna.", chapter: 3 },
  
  // D2
  { id: 17, text: "Y donde Hacer se encuentra con Sentir...<br/>yace el <strong>Impulso Interior</strong>.", chapter: 3 },
  { id: 18, text: "Ese surgimiento de motivación y poder que viene desde las entrañas.", chapter: 3 },

  // PAUSE 2
  { id: 19, text: "Los mapas no son el territorio, pero nos ayudan a navegar.<br/>Puede que ya sientas que habitas algunos reinos más que otros.", chapter: 3, isInteractive: true },
  
  // Chapter 4: Expressions
  { id: 20, text: "Por un tiempo, solo usé este mapa simple.", chapter: 4 },
  { id: 21, text: "Pero me di cuenta de que simplemente saber sobre un 'Reino' era demasiado amplio.", chapter: 4 },
  
  // ZOOM TO REALM (D1)
  { id: 22, text: "Así que miré más de cerca. Intenté identificar las expresiones únicas que viven dentro de estas regiones.", chapter: 4 },
  
  // REVEAL STARS
  { id: 23, text: "Encontré <strong>6 puntos</strong> dentro de cada reino que ayudaron a aclarar las cosas.", chapter: 4 },

  // PAUSE 3
  { id: 24, text: "Hacer zoom así me ayudó a relacionarme aún mejor con el paisaje.<br/>Adelante, echa un vistazo.", chapter: 4, isInteractive: true },
  
  // Chapter 5: Lenses
  { id: 25, text: "Sin embargo, también quería mapear mi equilibrio interno.", chapter: 5 },
  { id: 26, text: "Necesitaba una forma de observar los matices.<br/>Así que imaginé <strong>3 lentes</strong> para ayudar a ver con claridad.", chapter: 5 },
  
  // Lens 1
  { id: 27, text: "Una lente observa nuestra <strong>Forma</strong>—<br/>cómo definimos las cosas y a nosotros mismos.", chapter: 5 },
  // Lens 2
  { id: 28, text: "Otra lente ve nuestra <strong>Esencia</strong>—<br/>con qué claridad encontramos nuestra guía natural.", chapter: 5 },
  // Lens 3
  { id: 29, text: "La lente final reflexiona sobre nuestra <strong>Resonancia</strong>—<br/>qué tan conectados nos sentimos más allá de nosotros mismos.", chapter: 5 },
  
  // Chapter 6: Final
  { id: 30, text: "A través de estas lentes, creo que podemos ver<br/>los diversos aspectos de nosotros mismos de manera justa.", chapter: 6 },
  { id: 31, text: "Hasta ahora, este es el Interverso que he cartografiado.", chapter: 6 },
  { id: 99, text: "Y ahora te invito a explorar tus propias energías dentro de él.<br/>Adelante, visita las 24 expresiones y traza tu propio mapa.", chapter: 6 }
];

// Clone EN structure for ES
export const DOMAINS_DATA_ES: Domain[] = JSON.parse(JSON.stringify(DOMAINS_DATA_EN));

// Add Spanish translations for Domains
// Note: English indices are now: 0=ExternalStructure, 1=RelationalFlow, 2=InnerDrive, 3=RootConnection

DOMAINS_DATA_ES[0].name = "Estructura Externa";
DOMAINS_DATA_ES[0].description = "El reino de la acción tangible y los sistemas visibles.";
DOMAINS_DATA_ES[0].inkColor = "#ea580c"; // Override to Orange
DOMAINS_DATA_ES[0].nodes[0].name = "Diseño Sistemático";
DOMAINS_DATA_ES[0].nodes[1].name = "Acción Decisiva";
DOMAINS_DATA_ES[0].nodes[2].name = "Visión Aplicada";
DOMAINS_DATA_ES[0].nodes[3].name = "Comunicación Lúcida";
DOMAINS_DATA_ES[0].nodes[4].name = "Disciplina Sostenida";
DOMAINS_DATA_ES[0].nodes[5].name = "Soporte Estructural";


DOMAINS_DATA_ES[1].name = "Flujo Relacional";
DOMAINS_DATA_ES[1].description = "La red de relaciones y percepción compartida.";
DOMAINS_DATA_ES[1].nodes[0].name = "Sinergia Social";
DOMAINS_DATA_ES[1].nodes[1].name = "Armonía Activa";
DOMAINS_DATA_ES[1].nodes[2].name = "Escucha Reflexiva";
DOMAINS_DATA_ES[1].nodes[3].name = "Narrativa Auténtica";
DOMAINS_DATA_ES[1].nodes[4].name = "Mentoría";
DOMAINS_DATA_ES[1].nodes[5].name = "Apertura Radical";

DOMAINS_DATA_ES[2].name = "Impulso Interior";
DOMAINS_DATA_ES[2].description = "El motor de la voluntad y la propulsión emocional.";
DOMAINS_DATA_ES[2].nodes[0].name = "Presencia Asertiva";
DOMAINS_DATA_ES[2].nodes[1].name = "Competencia";
DOMAINS_DATA_ES[2].nodes[2].name = "Resiliencia";
DOMAINS_DATA_ES[2].nodes[3].name = "Brújula Interior";
DOMAINS_DATA_ES[2].nodes[4].name = "Soberanía Central";
DOMAINS_DATA_ES[2].nodes[5].name = "Lealtad";

DOMAINS_DATA_ES[3].name = "Conexión Raíz";
DOMAINS_DATA_ES[3].description = "El océano de quietud y sentido sentido.";
DOMAINS_DATA_ES[3].nodes[0].name = "Encarnación Somática";
DOMAINS_DATA_ES[3].nodes[1].name = "Resonancia Empática";
DOMAINS_DATA_ES[3].nodes[2].name = "Confianza";
DOMAINS_DATA_ES[3].nodes[3].name = "Saber Intuitivo";
DOMAINS_DATA_ES[3].nodes[4].name = "Sabiduría Destilada";
DOMAINS_DATA_ES[3].nodes[5].name = "Soñar";

export const ATTRIBUTE_DEFINITIONS_ES: Record<string, AttributeDefinition> = {
  // --- REALM 1: EXTERNAL STRUCTURE ---
  "Diseño Sistemático": {
    description: "Dirección: Planificación y Previsión.",
    prompt: {
      ego: "¿Qué tan claramente definido está tu camino a seguir?",
      soul: "¿Cómo sientes tu lógica?",
      spirit: "¿Cómo proyectas tus planes?"
    },
    spectrum: {
      ego: ["Errante", "Difuso", "Claro", "Lineal", "Fijo"],
      soul: ["Abstracta", "Improvisada", "Coherente", "Calculada", "Mecánica"],
      spirit: ["Intern", "Cauteloso", "Guía", "Directivo", "Comandante"]
    }
  },
  "Acción Decisiva": {
    description: "Finalización: Ejecución y Cierre.",
    prompt: {
      ego: "¿Qué tan definida es tu capacidad para finalizar?",
      soul: "¿Cuál es la textura de tu energía de trabajo?",
      spirit: "¿Qué tan visibles son tus resultados?"
    },
    spectrum: {
      ego: ["Abierto", "A la deriva", "Constante", "Impulsor", "Final"],
      soul: ["Pesada", "Esporádica", "Fluida", "Tensa", "Aplastante"],
      spirit: ["Sutil", "Mezclado", "Tangible", "Prominente", "Dominante"]
    }
  },
  "Disciplina Sostenida": {
    description: "Ritmo: Rutina y Sistemas.",
    prompt: {
      ego: "¿Qué tan estructurado es tu movimiento diario?",
      soul: "¿Cómo afecta tu entorno a tu orden interno?",
      spirit: "¿Cómo impactas el orden de los demás?"
    },
    spectrum: {
      ego: ["Libre", "Variable", "Rítmico", "Consistente", "Reglamentado"],
      soul: ["Permeable", "Desordenado", "Ordenado", "Curado", "Estéril"],
      spirit: ["Pasivo", "Flexible", "Estabilizador", "Correctivo", "Controlador"]
    }
  },
  "Visión Aplicada": {
    description: "Enfoque: Detalle y Análisis.",
    prompt: {
      ego: "¿Qué tan aguda es tu atención al detalle?",
      soul: "¿Cómo procesas la información?",
      spirit: "¿Cómo compartes tus observaciones?"
    },
    spectrum: {
      ego: ["Amplia", "Suave", "Aguda", "Cortante", "Microscópica"],
      soul: ["Absorbiendo", "Tamizando", "Sintetizando", "Diseccionando", "Escrutando"],
      spirit: ["Silencioso", "Reservado", "Iluminador", "Debate", "Penetrante"]
    }
  },
  "Soporte Estructural": {
    description: "Sostenimiento: Recursos y Seguridad.",
    prompt: {
      ego: "¿Qué tan definido es tu control sobre los recursos?",
      soul: "¿Cuál es tu sentimiento respecto a la abundancia?",
      spirit: "¿Cómo se mueve tu energía de recursos?"
    },
    spectrum: {
      ego: ["Suelto", "Fluctuante", "Seguro", "Apretado", "Bloqueado"],
      soul: ["Escaso", "Preocupado", "Suficiente", "Acumulador", "Compulsivo"],
      spirit: ["Goteando", "Reteniendo", "Circulando", "Transaccional", "Apalancando"]
    }
  },
  "Comunicación Lúcida": {
    description: "Postura: Responsabilidad y Decisión.",
    prompt: {
      ego: "¿Qué tan sólida es tu toma de decisiones?",
      soul: "¿Qué tan pesada sientes la responsabilidad?",
      spirit: "¿Cómo impacta tu presencia en el espacio?"
    },
    spectrum: {
      ego: ["Fluida", "Adaptable", "Asentada", "Firme", "Inamovible"],
      soul: ["Externa", "Incierta", "Soberana", "Egótica", "Absoluta"],
      spirit: ["Retraída", "Neutral", "Empoderante", "Pesada", "Abrumadora"]
    }
  },

  // --- REALM 2: RELATIONAL FLOW ---
  "Narrativa Auténtica": {
    description: "Articulación: Expresión y Verdad.",
    prompt: {
      ego: "¿Con qué autenticidad fluye tu verdad hacia los demás?",
      soul: "¿Cómo se siente tu expresión?",
      spirit: "¿Cómo aterriza tu voz en la habitación?"
    },
    spectrum: {
      ego: ["Silencioso", "Mudo", "Resonante", "Ruidoso", "Transmitiendo"],
      soul: ["Enmascarada", "Editada", "Auténtica", "Cruda", "Sin filtro"],
      spirit: ["Desvaneciendo", "Con eco", "Armónica", "Penetrante", "Ensordecedora"]
    }
  },
  "Escucha Reflexiva": {
    description: "Recepción: Escucha y Presencia.",
    prompt: {
      ego: "¿Qué tan abierto es tu espacio para los demás?",
      soul: "¿Qué tan profundamente absorbes lo que escuchas?",
      spirit: "¿Cómo reflejas a los demás?"
    },
    spectrum: {
      ego: ["Cerrado", "Selectivo", "Espacioso", "Poreoso", "Inundado"],
      soul: ["Desapegado", "Superficial", "Empático", "Saturado", "Fusionado"],
      spirit: ["En blanco", "Borroso", "Clarificador", "Magnificador", "Distorsionado"]
    }
  },
  "Armonía Activa": {
    description: "Mediación: Armonía y Navegación.",
    prompt: {
      ego: "¿Cómo armonizas la tensión?",
      soul: "¿Cómo te sientes en medio de la tensión?",
      spirit: "¿Qué energía aportas a un grupo?"
    },
    spectrum: {
      ego: ["Retirada", "Cediendo", "Navegando", "Afirmando", "Chocando"],
      soul: ["Incómodo", "Cuidadoso", "Centrado", "Calculado", "Excitable"],
      spirit: ["Invisible", "Seguidor", "Unificador", "Divisorio", "Explosivo"]
    }
  },
  "Mentoría": {
    description: "Apoyo: Enseñanza y Ayuda.",
    prompt: {
      ego: "¿Qué tan presente es tu guía?",
      soul: "¿Cuál es la fuente de tu compasión?",
      spirit: "¿Cómo se percibe tu guía?"
    },
    spectrum: {
      ego: ["Retenida", "Vaga", "Confiable", "Involucrada", "Interventora"],
      soul: ["Obligación", "Simpatía", "Compasión", "Orgullo", "Salvador"],
      spirit: ["Invisible", "Suave", "Elevadora", "Pesada", "Directiva"]
    }
  },
  "Apertura Radical": {
    description: "Cercanía: Intimidad y Confianza.",
    prompt: {
      ego: "¿Qué tan definidos son tus límites en la intimidad?",
      soul: "¿Qué tan seguro te sientes en la vulnerabilidad?",
      spirit: "¿Cómo se expresa tu devoción?"
    },
    spectrum: {
      ego: ["Disueltos", "Permeables", "Flexibles", "Protegidos", "Amurallados"],
      soul: ["Expuesto", "Cauteloso", "Abierto", "Dependiente", "Aferrado"],
      spirit: ["Fría", "Distante", "Cálida", "Intensa", "Consumidora"]
    }
  },
  "Sinergia Social": {
    description: "Intercambio: Social y Juego.",
    prompt: {
      ego: "¿Con qué facilidad te involucras en el flujo social?",
      soul: "¿Qué tan ligero es tu espíritu en compañía?",
      spirit: "¿Cómo afectas el estado de ánimo?"
    },
    spectrum: {
      ego: ["Solitario", "Vacilante", "Fluido", "Performativo", "Caótico"],
      soul: ["Pesado", "Reservado", "Boyante", "Maníaco", "Histérico"],
      spirit: ["Dempend", "Neutraal", "Vonkend", "Afleidend", "Uitputtend"]
    }
  },

  // --- REALM 3: ROOT CONNECTION ---
  "Encarnación Somática": {
    description: "Sensación: Conciencia Corporal.",
    prompt: {
      ego: "¿Qué tan conectado estás a las señales físicas?",
      soul: "¿Cómo honras las peticiones de tu cuerpo?",
      spirit: "¿Qué irradia tu presencia física?"
    },
    spectrum: {
      ego: ["Adormecido", "Distante", "Encarnado", "Sensible", "Hipersensible"],
      soul: ["Ignorando", "Mínimo", "Nutritivo", "Indulgente", "Hedonista"],
      spirit: ["Fantasmal", "Débil", "Vital", "Inquieta", "Febril"]
    }
  },
  "Confianza": {
    description: "Arraigo: Seguridad y Estabilidad.",
    prompt: {
      ego: "¿Qué tan sólido es tu sentido de hogar?",
      soul: "¿Con qué facilidad encuentras la calma?",
      spirit: "¿Cómo sostienes el espacio para ti mismo?"
    },
    spectrum: {
      ego: ["Sin raíces", "Cambiante", "Enraizado", "Anclado", "Estancado"],
      soul: ["Agitado", "Ansioso", "Asentado", "Pesado", "Inerte"],
      spirit: ["Colapsando", "Goteando", "Sosteniendo", "Protegiendo", "Aislando"]
    }
  },
  "Soñar": {
    description: "Visión: Imaginación y Subconsciente.",
    prompt: {
      ego: "¿Qué tan vívida es tu imaginería interior?",
      soul: "¿Cómo te relacionas con lo abstracto?",
      spirit: "¿Cuánto se superpone tu mundo interior a tu mundo exterior?"
    },
    spectrum: {
      ego: ["Oscura", "Brumosa", "Vívida", "Alucinatoria", "Devoradora"],
      soul: ["Evitando", "Escéptico", "Inspirado", "Escapista", "Perdido"],
      spirit: ["Separados", "Desvaneciendo", "Visionario", "Superpuesto", "Delirante"]
    }
  },
  "Saber Intuitivo": {
    description: "Saber: Intuición y Reflexión.",
    prompt: {
      ego: "¿Qué tan claramente escuchas tu intuición?",
      soul: "¿Qué tan plenamente has integrado tu pasado?",
      spirit: "¿Cómo sostienes tu verdad?"
    },
    spectrum: {
      ego: ["Silencioso", "Amortiguado", "Claro", "Fuerte", "Ensordecedor"],
      soul: ["Desapegado", "Inseguro", "Integrado", "Arrepentido", "Atormentado"],
      spirit: ["Inseguro", "Tranquilo", "Resonante", "Predicador", "Dogmático"]
    }
  },
  "Resonancia Empática": {
    description: "Alquimia: Transformación y Emoción.",
    prompt: {
      ego: "¿Qué tan permeable eres a los cambios emocionales?",
      soul: "¿Cómo procesas el dolor emocional?",
      spirit: "¿Cuál es tu relación con la sombra?"
    },
    spectrum: {
      ego: ["Frágil", "Resistente", "Adaptable", "Volátil", "Destructivo"],
      soul: ["Enterrando", "Reprimiendo", "Transmutando", "Regodeando", "Identificando"],
      spirit: ["Negación", "Proyección", "Aceptación", "Fijación", "Posesión"]
    }
  },
  "Sabiduría Destilada": {
    description: "Quietud: Descanso y Vacío.",
    prompt: {
      ego: "¿Qué tan definida es tu capacidad para detenerte?",
      soul: "¿Qué tan cómoda es la soledad para ti?",
      spirit: "¿Cómo te retiras del mundo?"
    },
    spectrum: {
      ego: ["Inexistente", "Inquieto", "Reposado", "Pesado", "Paralizado"],
      soul: ["Aterradora", "Vacía", "Pacífica", "Solitaria", "Desolada"],
      spirit: ["Corriendo", "Escondiendo", "Retirando", "Desapareciendo", "Borrando"]
    }
  },

  // --- REALM 4: INNER DRIVE ---
  "Brújula Interior": {
    description: "Chispa: Iniciación y Coraje.",
    prompt: {
      ego: "¿Qué tan rápido comienzas cosas nuevas?",
      soul: "¿Cuál es la calidad de tu emoción?",
      spirit: "¿Cómo se siente tu toma de riesgos?"
    },
    spectrum: {
      ego: ["Frozen", "Delaying", "Igniting", "Impulsive", "Reckless"],
      soul: ["Dormant", "Dull", "Electric", "Feverish", "Explosive"],
      spirit: ["Paralyzed", "Cautious", "Brave", "Dangerous", "Self-Destructive"]
    }
  },
  "Presencia Asertiva": {
    description: "Ascenso: Ambición y Crecimiento.",
    prompt: {
      ego: "¿Qué tan distinto es tu impulso de escalar?",
      soul: "¿Qué alimenta tu escalada?",
      spirit: "¿Cómo te relacionas con el logro?"
    },
    spectrum: {
      ego: ["Sin rumbo", "A la deriva", "Ascendiendo", "Aferrando", "Despiadado"],
      soul: ["Vacío", "Envidia", "Propósito", "Hambre", "Insaciabilidad"],
      spirit: ["Indigno", "Desdeñoso", "Orgulloso", "Superior", "Narcisista"]
    }
  },
  "Resiliencia": {
    description: "Defensa: Límites y Resiliencia.",
    prompt: {
      ego: "¿Qué tan fuertes son tus límites?",
      soul: "¿Cuál es tu reflejo cuando te desafían?",
      spirit: "¿Cómo usas tu poder?"
    },
    spectrum: {
      ego: ["Abiertos", "Débiles", "Escudados", "Amurallados", "Hostiles"],
      soul: ["Cediendo", "Colapsando", "Resiliente", "Endurecido", "Amargo"],
      spirit: ["Impotente", "Sumiso", "Protector", "Agrisivo", "Violento"]
    }
  },
  "Soberanía Central": {
    description: "Búsqueda: Curiosidad y Sentido.",
    prompt: {
      ego: "¿Qué tan activa es tu hambre por lo desconocido?",
      soul: "¿Cómo se siente lo desconocido para ti?",
      spirit: "¿Cómo se mueve tu curiosidad?"
    },
    spectrum: {
      ego: ["Apático", "Errante", "Buscador", "Inquieto", "Perdido"],
      soul: ["Amenazante", "Aburrido", "Maravilloso", "Obsesivo", "Locura"],
      spirit: ["Estancada", "En bucle", "En espiral", "Dispersa", "Caótica"]
    }
  },
  "Competencia": {
    description: "Autonomía: Independencia y Autenticidad.",
    prompt: {
      ego: "¿Qué tan definido es tu propio camino?",
      soul: "¿Cuánta aprobación externa necesitas?",
      spirit: "¿Cómo destacas?"
    },
    spectrum: {
      ego: ["Conforme", "Fusionado", "Distinto", "Contrario", "Alienado"],
      soul: ["Desesperada", "Complaciente", "Auto-validada", "Desafiante", "Antisocial"],
      spirit: ["Mezclando", "Gris", "Vibrante", "Discordante", "Ofensivo"]
    }
  },
  "Lealtad": {
    description: "Anhelo: Motivación y Deseo.",
    prompt: {
      ego: "¿Qué tan consistente es tu impulso?",
      soul: "¿Cuál es la fuente de tu deseo?",
      spirit: "¿Cómo impacta tu deseo en tu enfoque?"
    },
    spectrum: {
      ego: ["Plano", "Pico", "Sostenido", "Intenso", "Maníaco"],
      soul: ["Falta", "Ansia", "Pasión", "Lujuria", "Adicción"],
      spirit: ["Distraído", "Disperso", "Dirigido", "Fijado", "Consumido"]
    }
  }
};
