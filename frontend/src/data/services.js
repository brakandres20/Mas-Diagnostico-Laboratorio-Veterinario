export const VALUE_PROPS = [
  {
    icon: '⚙',
    title: 'Tecnología',
    text: 'Equipos especializados y procesos orientados a resultados confiables.',
  },
  {
    icon: '✓',
    title: 'Experiencia',
    text: 'Personal con experiencia en el área veterinaria y orientación al cliente.',
  },
  {
    icon: '◎',
    title: 'Cobertura',
    text: 'Recolección de muestras en Medellín y el área metropolitana.',
  },
  {
    icon: '↻',
    title: 'Trazabilidad',
    text: 'Uso de sistemas de interfase para reducir errores de transcripción.',
  },
];

export const SERVICES = [
  {
    tag: 'Quimioluminiscencia',
    title: 'Hormonas y pruebas especiales',
    equipment: 'Equipo: MAGLUMI 600',
    premium: false,
    chips: [
      'Vitamina B12',
      'Ácido fólico',
      'T4 libre',
      'T4 total',
      'Progesterona',
      'Cortisol',
      'Insulina',
      'Aldosterona',
      'Testosterona',
      'TSH específica',
      'T3 libre',
      'Toxoplasma IgG/IgM',
    ],
  },
  {
    tag: 'Química automatizada',
    title: 'Química clínica',
    equipment: 'Equipo: BIOSSAY 240 Plus',
    premium: false,
    chips: [
      'ALT · AST',
      'Creatinina',
      'Glucosa',
      'Urea · BUN',
      'Colesterol',
      'Triglicéridos',
      'Fosfatasa alcalina',
      'Albúmina',
      'GGT',
      'Bilirrubina total',
      'Fructosamina',
      'Bilirrubina directa',
      'Lipasa pancreática',
      'Calcio',
      'Amilasa pancreática',
      'Fósforo',
    ],
  },
  {
    tag: 'Analizador de 5 partes',
    title: 'Hematología veterinaria',
    equipment: 'Equipo: VH50',
    premium: false,
    chips: ['Diferencial', 'Histogramas', 'Dispersogramas'],
  },
  {
    tag: 'Inmunología veterinaria',
    title: 'Bionote Vcheck V200',
    equipment: 'Resultados rápidos junto al paciente',
    premium: true,
    chips: [
      'Lipasa canina/felina',
      'T4 total canina/felina',
      'SDMA',
      'TSH canina',
      'PCR canina',
    ],
  },
  {
    tag: 'Inmunocromatografía',
    title: 'Pruebas rápidas cuantitativas',
    equipment: 'Equipo: Finecare FIA Meter Plus',
    premium: false,
    chips: ['Dímero D', 'Hemoglobina glicosilada', 'Vitamina D', 'Ferritina'],
  },
  {
    tag: 'Microbiología',
    title: 'Cultivo y antibiograma',
    equipment: 'Equipo: MicroScan Microbiology Systems',
    premium: false,
    chips: ['Urocultivo', 'Hemocultivo', 'Cultivo y antibiograma', 'Coprocultivo'],
  },
];

export const EQUIPMENT = [
  {
    tag: 'Quimioluminiscencia',
    title: 'Maglumi 600',
    spec: 'Hormonas y pruebas especiales',
    desc: 'Hormonas y pruebas especiales con alta sensibilidad analítica.',
    image: '/images/equipo-maglumi-600.webp',
    chips: ['T4 · T3', 'Cortisol', 'Insulina'],
    featured: false,
  },
  {
    tag: 'Química automatizada',
    title: 'Biossay 240 Plus',
    spec: 'Química clínica automatizada',
    desc: 'Perfiles bioquímicos completos para función renal, hepática y metabólica.',
    image: '/images/equipo-biossays-240-plus.webp',
    chips: ['ALT · AST', 'Glucosa'],
    featured: false,
  },
  {
    tag: 'Hematología 5 partes',
    title: 'VH50',
    spec: 'Analizador de hematología veterinaria',
    desc: 'Diferencial leucocitario, histogramas y dispersogramas por muestra.',
    image: '/images/equipo-vh50.webp',
    chips: ['Hemograma'],
    featured: false,
  },
  {
    tag: 'Inmunología veterinaria',
    title: 'Bionote Vcheck V200',
    spec: 'Equipo destacado',
    desc: 'Diagnóstico rápido específico para especies canina y felina.',
    image: '/images/equipo-bionote-vcheck-v200.webp',
    chips: ['SDMA', 'PCR canina'],
    featured: true,
  },
  {
    tag: 'Inmunocromatografía',
    title: 'Finecare FIA Meter Plus',
    spec: 'Pruebas rápidas cuantitativas',
    desc: 'Pruebas rápidas cuantitativas para marcadores clínicos clave.',
    image: '/images/equipo-finecare-fia-meter-plus.webp',
    chips: ['Dímero D', 'Ferritina'],
    featured: false,
  },
  {
    tag: 'Microbiología',
    title: 'MicroScan',
    spec: 'Microbiología',
    desc: 'Identificación y antibiograma para orientar la terapia antimicrobiana.',
    image: '/images/equipo-microscan.webp',
    chips: ['Urocultivo', 'Hemocultivo'],
    featured: false,
  },
];

export const BENEFITS = [
  {
    icon: '🎓',
    title: 'Capacitación',
    text: 'Capacitaciones dirigidas al personal de las clínicas y profesionales.',
  },
  {
    icon: '🔬',
    title: 'Análisis de ambiente',
    text: 'Análisis de ambiente en el área de quirófano.',
  },
  {
    icon: '❤',
    title: 'Jornadas de salud',
    text: 'Jornadas de salud para el personal de las clínicas.',
  },
  {
    icon: '↻',
    title: 'Actualización',
    text: 'Actualizaciones relacionadas con laboratorio y pruebas especiales.',
  },
];

export const INSTITUTION_TYPES = [
  'Clínica veterinaria',
  'Hospital veterinario',
  'Profesional independiente',
  'Otro',
];

export const SERVICE_OPTIONS = [
  'Química clínica',
  'Hematología',
  'Hormonas y pruebas especiales',
  'Inmunología (Vcheck V200)',
  'Microbiología',
  'Varios servicios',
];