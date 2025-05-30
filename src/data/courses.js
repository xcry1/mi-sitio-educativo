export const categories = [
  { key: 'tecnologia', name: 'Tecnología' },
  { key: 'redes-sociales', name: 'Redes Sociales' },
  { key: 'inteligencia-artificial', name: 'Inteligencia Artificial' },
  { key: 'programacion', name: 'Programación' },
  { key: 'edicion-video', name: 'Edición de Video' },
  { key: 'fotografia', name: 'Fotografía Digital' },
  { key: 'diseno-grafico', name: 'Diseño Gráfico' },
  { key: 'youtube', name: 'Contenido para YouTube' },
  { key: 'streaming', name: 'Streaming y Twitch' },
  { key: 'podcasting', name: 'Podcasting' },
  { key: 'herramientas-ia', name: 'Herramientas de IA' },
  { key: 'escritura', name: 'Escritura y Storytelling Digital' },
];

export const courses = [
  // Existentes
  {
    id: 1,
    name: 'Primeros Pasos',
    slug: 'primeros-pasos',
    description: 'Aprende los básicos de la informática, desde navegar en internet hasta enviar correos electrónicos.',
    duration: '4 semanas',
    level: 'Básico',
    category: 'tecnologia',
    topics: [
      'Introducción a la computadora',
      'Navegación web segura',
      'Correo electrónico',
      'Videollamadas básicas'
    ],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3'
  },
  {
    id: 2,
    name: 'Excel',
    slug: 'excel',
    description: 'Domina las hojas de cálculo para organizar datos y realizar cálculos.',
    duration: '6 semanas',
    level: 'Intermedio',
    category: 'tecnologia',
    topics: [
      'Fórmulas y funciones',
      'Formato de celdas',
      'Gráficos y tablas dinámicas',
      'Macros básicas'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 3,
    name: 'PowerPoint',
    slug: 'powerpoint',
    description: 'Crea presentaciones impactantes con diapositivas profesionales.',
    duration: '5 semanas',
    level: 'Básico',
    category: 'tecnologia',
    topics: [
      'Diseño de diapositivas',
      'Transiciones y animaciones',
      'Inserción de multimedia',
      'Presentación efectiva'
    ],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3'
  },
  // Templates por categoría
  // Redes Sociales
  {
    id: 101,
    name: 'Introducción a Instagram',
    slug: 'intro-instagram',
    description: 'Aprende a usar Instagram desde cero.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'redes-sociales',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 102,
    name: 'Facebook Avanzado',
    slug: 'facebook-avanzado',
    description: 'Trucos y consejos para aprovechar Facebook.',
    duration: '3 semanas',
    level: 'Intermedio',
    category: 'redes-sociales',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1517260911205-8c6f6fa6c24c?auto=format&fit=crop&w=600&q=80'
  },
  // Inteligencia Artificial
  {
    id: 201,
    name: 'IA para Principiantes',
    slug: 'ia-principiantes',
    description: 'Descubre qué es la inteligencia artificial.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'inteligencia-artificial',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 202,
    name: 'Chatbots con IA',
    slug: 'chatbots-ia',
    description: 'Crea tu primer chatbot usando IA.',
    duration: '3 semanas',
    level: 'Intermedio',
    category: 'inteligencia-artificial',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  },
  // Programación
  {
    id: 301,
    name: 'Programación desde Cero',
    slug: 'programacion-cero',
    description: 'Aprende los fundamentos de la programación.',
    duration: '4 semanas',
    level: 'Básico',
    category: 'programacion',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 302,
    name: 'JavaScript Básico',
    slug: 'javascript-basico',
    description: 'Primeros pasos con JavaScript.',
    duration: '4 semanas',
    level: 'Básico',
    category: 'programacion',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80'
  },
  // Edición de Video
  {
    id: 401,
    name: 'Edición de Video para Principiantes',
    slug: 'edicion-video-principiantes',
    description: 'Edita tus primeros videos fácilmente.',
    duration: '3 semanas',
    level: 'Básico',
    category: 'edicion-video',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 402,
    name: 'Efectos Especiales Básicos',
    slug: 'efectos-especiales-basicos',
    description: 'Agrega efectos a tus videos.',
    duration: '2 semanas',
    level: 'Intermedio',
    category: 'edicion-video',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80'
  },
  // Fotografía Digital
  {
    id: 501,
    name: 'Fotografía Digital Básica',
    slug: 'fotografia-digital-basica',
    description: 'Aprende a tomar mejores fotos.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'fotografia',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1517260911205-8c6f6fa6c24c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 502,
    name: 'Edición de Fotos con el Celular',
    slug: 'edicion-fotos-celular',
    description: 'Edita tus fotos desde el móvil.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'fotografia',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
  },
  // Diseño Gráfico
  {
    id: 601,
    name: 'Diseño Gráfico para Todos',
    slug: 'diseno-grafico-todos',
    description: 'Crea imágenes y gráficos fácilmente.',
    duration: '3 semanas',
    level: 'Básico',
    category: 'diseno-grafico',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 602,
    name: 'Canva desde Cero',
    slug: 'canva-desde-cero',
    description: 'Aprende a usar Canva para tus diseños.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'diseno-grafico',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80'
  },
  // Contenido para YouTube
  {
    id: 701,
    name: 'Crea tu Canal de YouTube',
    slug: 'crea-canal-youtube',
    description: 'Primeros pasos para ser youtuber.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'youtube',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 702,
    name: 'Miniaturas que Atraen',
    slug: 'miniaturas-atraen',
    description: 'Diseña miniaturas efectivas para tus videos.',
    duration: '1 semana',
    level: 'Básico',
    category: 'youtube',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1517260911205-8c6f6fa6c24c?auto=format&fit=crop&w=600&q=80'
  },
  // Streaming y Twitch
  {
    id: 801,
    name: 'Streaming Básico',
    slug: 'streaming-basico',
    description: 'Comienza a transmitir en vivo.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'streaming',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 802,
    name: 'Twitch para Principiantes',
    slug: 'twitch-principiantes',
    description: 'Aprende a usar Twitch desde cero.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'streaming',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80'
  },
  // Podcasting
  {
    id: 901,
    name: 'Podcasting Fácil',
    slug: 'podcasting-facil',
    description: 'Crea y publica tu primer podcast.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'podcasting',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 902,
    name: 'Edición de Audio para Podcast',
    slug: 'edicion-audio-podcast',
    description: 'Edita el audio de tus podcasts fácilmente.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'podcasting',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80'
  },
  // Herramientas de IA
  {
    id: 1001,
    name: 'Herramientas de IA para Todos',
    slug: 'herramientas-ia-todos',
    description: 'Descubre herramientas de IA útiles.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'herramientas-ia',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1517260911205-8c6f6fa6c24c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 1002,
    name: 'Automatiza con IA',
    slug: 'automatiza-ia',
    description: 'Automatiza tareas usando IA.',
    duration: '2 semanas',
    level: 'Intermedio',
    category: 'herramientas-ia',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
  },
  // Escritura y Storytelling Digital
  {
    id: 1101,
    name: 'Storytelling Digital',
    slug: 'storytelling-digital',
    description: 'Aprende a contar historias en internet.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'escritura',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 1102,
    name: 'Escritura Creativa Online',
    slug: 'escritura-creativa-online',
    description: 'Desarrolla tu creatividad escribiendo en digital.',
    duration: '2 semanas',
    level: 'Básico',
    category: 'escritura',
    topics: ['Placeholder'],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80'
  },
];