export const PrimerosPasos = {
  title: 'Primeros Pasos en Informática',
  slug: 'primeros-pasos',
  image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3',
  duration: '4 semanas',
  level: 'Básico',
  fullDescription:
    'Este curso te lleva de la mano desde cero en el mundo digital. Aprenderás a usar una computadora, navegar seguro por internet, enviar correos electrónicos, hacer videollamadas y usar redes sociales como Facebook. Con explicaciones simples, ejercicios prácticos, quizzes y un proyecto final, estarás listo para usar la tecnología en tu día a día.',
  topics: [
    'Introducción a la computadora',
    'Navegación web segura',
    'Correo electrónico y videollamadas',
    'Redes sociales y ciudadanía digital'
  ],
  contents: [
    {
      title: 'Semana 1: Introducción a la Computadora',
      lessons: [
        {
          title: 'Lección 1: ¿Qué es una computadora?',
          duration: '5',
          description: 'Una computadora es una máquina que nos ayuda a hacer muchas cosas, como escribir, ver fotos o buscar información. Aprenderás qué es y cómo empezar a usarla.',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
          glossary: [
            { term: 'Computadora', definition: 'Una máquina que nos ayuda a hacer muchas cosas, como escribir o ver videos.' },
            { term: 'Pantalla', definition: 'La parte donde vemos imágenes y videos.' },
            { term: 'Teclado', definition: 'Donde escribimos letras y números.' },
            { term: 'Ratón', definition: 'Un objeto que movemos para señalar cosas en la pantalla.' }
          ],
          instructions: [
            { text: 'Mira tu computadora y encuentra la pantalla, el teclado y el ratón.', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80' },
            { text: 'Busca el botón de encendido y presiónalo para encender la computadora.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
            { text: 'Mueve el ratón y mira cómo se mueve la flechita en la pantalla.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80' },
            { text: 'Toca los dibujos en la pantalla con el ratón para abrir programas.' }
          ],
          exercise: {
            type: 'image-selection',
            question: '¿Cuál de estas imágenes muestra un teclado?',
            options: [
              { image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80', isCorrect: false },
              { image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=100&q=80', isCorrect: true },
              { image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=100&q=80', isCorrect: false }
            ],
            expectedResult: 'Seleccionar la imagen del teclado.'
          },
          quiz: [
            { question: '¿Qué es una computadora?', options: ['Un teléfono', 'Una máquina para hacer muchas cosas', 'Una televisión'], correctAnswer: 'Una máquina para hacer muchas cosas' },
            { question: '¿Qué usas para escribir en la computadora?', options: ['Pantalla', 'Teclado', 'Ratón'], correctAnswer: 'Teclado' }
          ],
          resources: [
            { text: 'Video: Partes de una computadora', url: 'https://www.youtube.com/watch?v=example' }
          ]
        },
        {
          title: 'Lección 2: Navegación en el sistema operativo',
          duration: '5',
          description: 'Conoce cómo moverte en tu computadora, ya sea Windows, macOS o Linux.',
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
          glossary: [
            { term: 'Escritorio', definition: 'La pantalla principal donde ves los dibujos de los programas.' },
            { term: 'Icono', definition: 'Un dibujo pequeño que abre un programa cuando lo tocas.' }
          ],
          instructions: [
            { text: 'Mira el escritorio: es la pantalla que aparece al encender tu computadora.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
            { text: 'En Windows, toca el botón de inicio (abajo a la izquierda). En macOS, usa el "Finder" (cara sonriente).', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
            { text: 'Busca un programa como "Calculadora" y ábrelo tocando su dibujo.' }
          ],
          exercise: {
            objective: 'Abrir la Calculadora.',
            steps: [
              'Toca el botón de inicio (Windows) o Finder (macOS).',
              'Busca "Calculadora" escribiendo con el teclado.',
              'Tócala con el ratón para abrirla.'
            ],
            expectedResult: 'Ver la Calculadora abierta en tu pantalla.'
          },
          quiz: [
            { question: '¿Qué ves en el escritorio?', options: ['Dibujos de programas', 'Una carta', 'Un video'], correctAnswer: 'Dibujos de programas' }
          ]
        }
      ]
    },
    {
      title: 'Semana 2: Navegación Web Segura',
      lessons: [
        {
          title: 'Lección 1: ¿Qué es internet?',
          duration: '5',
          description: 'Internet es como una gran biblioteca mundial. Aprende cómo usarlo para buscar información.',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
          glossary: [
            { term: 'Internet', definition: 'Una red que conecta computadoras en todo el mundo.' },
            { term: 'Navegador', definition: 'Un programa para ver páginas en internet, como Chrome.' }
          ],
          instructions: [
            { text: 'Abre un navegador como Google Chrome o Microsoft Edge tocando su dibujo.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80' },
            { text: 'Escribe "www.google.com" en la barra de arriba y presiona Enter.', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80' },
            { text: 'Busca algo que te guste, como "recetas fáciles".' }
          ],
          exercise: {
            objective: 'Buscar una receta.',
            steps: [
              'Abre el navegador.',
              'Ve a google.com.',
              'Escribe "receta de pollo fácil" y presiona Enter.',
              'Toca un resultado para leerlo.'
            ],
            expectedResult: 'Leer una receta de pollo en la pantalla.'
          },
          quiz: [
            { question: '¿Qué es internet?', options: ['Un juego', 'Una red mundial', 'Un programa'], correctAnswer: 'Una red mundial' }
          ]
        },
        {
          title: 'Lección 2: Seguridad en línea',
          duration: '7',
          description: 'Aprende a protegerte mientras usas internet con consejos prácticos.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
          glossary: [
            { term: 'HTTPS', definition: 'Una señal de que un sitio web es seguro.' },
            { term: 'Phishing', definition: 'Correos falsos que intentan robar tu información.' }
          ],
          instructions: [
            { text: 'Mira si la página dice "https://" y tiene un candado antes de poner datos personales.', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80' },
            { text: 'No toques enlaces en correos extraños que te piden contraseñas.' },
            { text: 'Usa contraseñas fuertes, como "Sol123Luna".' }
          ],
          exercise: {
            objective: 'Crear una contraseña fuerte.',
            steps: [
              'Piensa en dos palabras que te gusten, como "Sol" y "Luna".',
              'Añade números, como "123".',
              'Combínalos: "Sol123Luna".'
            ],
            expectedResult: 'Tener una contraseña fuerte escrita.'
          },
          quiz: [
            { question: '¿Qué significa el candado en una página web?', options: ['Es segura', 'Es lenta', 'Es un juego'], correctAnswer: 'Es segura' }
          ],
          resources: [
            { text: 'Microsoft Digital Literacy: Seguridad', url: 'https://www.microsoft.com/es-es/digital-literacy' }
          ]
        },
        {
          title: 'Lección 3: Búsqueda en internet y evaluación de fuentes',
          duration: '6',
          description: 'Descubre cómo encontrar información confiable en internet.',
          image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
          instructions: [
            { text: 'Busca en Google algo como "noticias locales".', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80' },
            { text: 'Mira quién escribió la página: ¿es un periódico conocido o un sitio extraño?' },
            { text: 'Revisa que la información sea reciente.' }
          ],
          exercise: {
            objective: 'Encontrar una noticia confiable.',
            steps: [
              'Abre Google.',
              'Escribe "noticias de hoy [tu ciudad]".',
              'Elige una página de un periódico conocido.',
              'Lee una noticia.'
            ],
            expectedResult: 'Leer una noticia confiable.'
          },
          quiz: [
            { question: '¿Qué debes revisar en una página web?', options: ['Si es bonita', 'Si es confiable', 'Si tiene juegos'], correctAnswer: 'Si es confiable' }
          ]
        }
      ]
    },
    {
      title: 'Semana 3: Correo y Videollamadas',
      lessons: [
        {
          title: 'Lección 1: Correo electrónico',
          duration: '4',
          description: 'El correo electrónico es como enviar cartas por internet. Aprende a usarlo.',
          image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
          glossary: [
            { term: 'Correo electrónico', definition: 'Mensajes que envías por internet.' },
            { term: 'Asunto', definition: 'El título corto de tu mensaje.' }
          ],
          instructions: [
            { text: 'Ve a <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">Gmail</a> y toca "Crear cuenta".', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80' },
            { text: 'Escribe tu nombre, apellido, un usuario (como "juan123") y una contraseña fuerte.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
            { text: 'Para enviar un correo, toca "Redactar", escribe a quién va, un asunto y tu mensaje, luego toca "Enviar".' }
          ],
          exercise: {
            objective: 'Enviar un correo con una foto.',
            steps: [
              'Abre Gmail.',
              'Toca "Redactar".',
              'Escribe tu correo en "Para".',
              'Añade un asunto como "Hola".',
              'Toca el clip y adjunta una foto.',
              'Toca "Enviar".'
            ],
            expectedResult: 'Enviar un correo con una foto adjunta.'
          },
          quiz: [
            { question: '¿Para qué sirve el asunto?', options: ['Decir de qué trata el correo', 'Escribir el mensaje', 'Adjuntar fotos'], correctAnswer: 'Decir de qué trata el correo' }
          ]
        },
        {
          title: 'Lección 2: Videollamadas básicas',
          duration: '3',
          description: 'Habla y mira a tus seres queridos por internet con videollamadas.',
          image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
          glossary: [
            { term: 'Videollamada', definition: 'Una llamada donde ves y hablas con alguien por internet.' }
          ],
          instructions: [
            { text: 'Ve a <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer">Google Meet</a>.', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80' },
            { text: 'Inicia sesión con tu cuenta de Gmail y toca "Nueva reunión".', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80' },
            { text: 'Comparte el enlace con alguien y permite usar tu cámara y micrófono.' }
          ],
          exercise: {
            objective: 'Hacer una videollamada.',
            steps: [
              'Abre Google Meet.',
              'Toca "Nueva reunión".',
              'Copia el enlace y envíalo a un amigo.',
              'Activa tu cámara y micrófono.'
            ],
            expectedResult: 'Hablar con alguien por videollamada.'
          },
          quiz: [
            { question: '¿Qué necesitas para una videollamada?', options: ['Cámara y micrófono', 'Solo un teléfono', 'Una carta'], correctAnswer: 'Cámara y micrófono' }
          ]
        }
      ]
    },
    {
      title: 'Semana 4: Redes Sociales y Ciudadanía Digital',
      lessons: [
        {
          title: 'Lección 1: Redes sociales',
          duration: '4',
          description: 'Conecta con amigos y familia usando redes sociales como Facebook.',
          image: 'https://images.unsplash.com/photo-1517260911205-8c6f6fa6c24c?auto=format&fit=crop&w=600&q=80',
          glossary: [
            { term: 'Redes sociales', definition: 'Sitios en internet para compartir con otros, como Facebook.' }
          ],
          instructions: [
            { text: 'Ve a <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> y toca "Crear cuenta nueva".', image: 'https://images.unsplash.com/photo-1517260911205-8c6f6fa6c24c?auto=format&fit=crop&w=600&q=80' },
            { text: 'Escribe tu nombre, correo o teléfono, contraseña y fecha de nacimiento.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
            { text: 'Añade una foto y busca amigos para conectarte.' }
          ],
          exercise: {
            objective: 'Crear una publicación en Facebook.',
            steps: [
              'Abre Facebook.',
              'Toca "Crear publicación".',
              'Escribe algo como "¡Hola amigos!".',
              'Toca "Publicar".'
            ],
            expectedResult: 'Ver tu publicación en Facebook.'
          },
          quiz: [
            { question: '¿Qué puedes hacer en Facebook?', options: ['Enviar correos', 'Compartir con amigos', 'Ver televisión'], correctAnswer: 'Compartir con amigos' }
          ],
          resources: [
            { text: 'Otras redes: WhatsApp e Instagram también son populares.', url: 'https://www.whatsapp.com/?lang=es' }
          ]
        },
        {
          title: 'Lección 2: Privacidad y huella digital',
          duration: '5',
          description: 'Aprende a proteger tu información y entender qué dejas en internet.',
          image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
          glossary: [
            { term: 'Privacidad', definition: 'Mantener tu información segura.' },
            { term: 'Huella digital', definition: 'Lo que dejas en internet, como fotos o mensajes.' }
          ],
          instructions: [
            { text: 'En Facebook, ve a "Configuración" y elige quién ve tus publicaciones.', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80' },
            { text: 'No compartas datos como tu dirección o teléfono en público.' },
            { text: 'Piensa antes de publicar: ¿quieres que todos vean esto?' }
          ],
          exercise: {
            objective: 'Configurar la privacidad en Facebook.',
            steps: [
              'Abre Facebook.',
              'Ve a "Configuración".',
              'Toca "Privacidad".',
              'Elige "Solo amigos" para tus publicaciones.'
            ],
            expectedResult: 'Tus publicaciones solo las ven tus amigos.'
          },
          quiz: [
            { question: '¿Qué es la huella digital?', options: ['Un dibujo', 'Lo que dejas en internet', 'Una contraseña'], correctAnswer: 'Lo que dejas en internet' }
          ]
        },
        {
          title: 'Lección 3: Ciudadanía digital',
          duration: '4',
          description: 'Sé un buen usuario de internet respetando a otros.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
          instructions: [
            { text: 'No escribas cosas feas o falsas sobre otros en internet.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
            { text: 'Ayuda a otros compartiendo cosas útiles.' },
            { text: 'Reporta mensajes malos en redes sociales.' }
          ],
          exercise: {
            objective: 'Escribir un mensaje positivo.',
            steps: [
              'Abre Facebook.',
              'Escribe un mensaje como "¡Me encanta aprender cosas nuevas!".',
              'Publícalo.'
            ],
            expectedResult: 'Compartir un mensaje positivo.'
          },
          quiz: [
            { question: '¿Qué significa ser buen ciudadano digital?', options: ['Jugar mucho', 'Respetar a otros', 'Escribir rápido'], correctAnswer: 'Respetar a otros' }
          ]
        }
      ]
    }
  ],
  finalProject: {
    title: 'Crear una página de Facebook para un negocio ficticio',
    description: 'Crea una página en Facebook para un negocio imaginario, como una panadería o una tienda.',
    steps: [
      'Piensa en un nombre para tu negocio, como "Panadería Dulce".',
      'Ve a Facebook y toca "Crear página".',
      'Añade una foto de perfil (puedes buscar una imagen gratis en Google).',
      'Escribe una publicación como "¡Bienvenidos a mi panadería!".',
      'Configura la privacidad para que solo tus amigos la vean.'
    ],
    expectedResult: 'Tener una página de Facebook con foto, publicación y privacidad configurada.'
  },
  additionalResources: [
    { text: 'Microsoft Digital Literacy (en español)', url: 'https://www.microsoft.com/es-es/digital-literacy' },
    { text: 'Alison: Habilidades Digitales', url: 'https://alison.com/es/curso/global-digital-literacy' },
    { text: 'LearnMyWay: Internet Básico', url: 'https://www.learnmyway.com/es' }
  ],
  updateNote: 'Este curso se revisa cada año para mantenerlo actualizado. Sigue aprendiendo con recursos como cuentas de tecnología en X.'
};