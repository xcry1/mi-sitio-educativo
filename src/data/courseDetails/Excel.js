export const Excel = {
  title: 'Excel para Principiantes',
  slug: 'excel',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3',
  duration: '6 semanas',
  level: 'Intermedio',
  fullDescription:
    'Domina las hojas de cálculo con este curso práctico de Excel. Aprenderás a usar fórmulas, crear gráficos y organizar datos de manera eficiente. Cada módulo incluye explicaciones sencillas y pasos prácticos para que puedas aprender haciendo.',
  topics: [
    'Interfaz y navegación básica',
    'Fórmulas y funciones',
    'Formato de celdas',
    'Gráficos y tablas dinámicas',
    'Macros básicas'
  ],
  contents: [
    {
      title: 'Introducción a Excel',
      lessons: [
        {
          title: '¿Qué es Excel y para qué sirve?',
          duration: '5',
          description: 'Descubre qué es Excel y cómo puede ayudarte a organizar información y realizar cálculos.',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
          instructions: [
            { text: 'Abre Excel desde el menú de inicio o el escritorio.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
            { text: 'Observa la ventana principal: barra de herramientas, celdas y hojas.', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80' },
            { text: 'Haz clic en una celda y escribe tu nombre.' },
            { text: 'Guarda el archivo con el nombre "Mi primer Excel".', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' }
          ]
        },
        {
          title: 'Navegación básica',
          duration: '4',
          description: 'Aprende a moverte entre celdas, hojas y a seleccionar rangos.',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
          instructions: [
            { text: 'Usa las flechas del teclado para moverte entre celdas.' },
            { text: 'Haz clic en las pestañas inferiores para cambiar de hoja.', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80' },
            { text: 'Selecciona varias celdas manteniendo presionado el botón izquierdo del mouse.' }
          ]
        }
      ]
    },
    {
      title: 'Fórmulas y funciones',
      lessons: [
        {
          title: 'Sumar y restar en Excel',
          duration: '6',
          description: 'Realiza operaciones básicas usando fórmulas.',
          image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
          instructions: [
            { text: 'Escribe números en las celdas A1 y A2.' },
            { text: 'Selecciona la celda A3 y escribe =A1+A2 para sumar.', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80' },
            { text: 'Presiona Enter y observa el resultado.' },
            { text: 'Prueba restar usando =A1-A2.' }
          ]
        },
        {
          title: 'Función SUMA y PROMEDIO',
          duration: '5',
          description: 'Aprende a sumar y promediar varios valores fácilmente.',
          image: 'https://images.unsplash.com/photo-1517260911205-8c6f6fa6c24c?auto=format&fit=crop&w=600&q=80',
          instructions: [
            { text: 'Escribe varios números en las celdas B1 a B5.' },
            { text: 'En la celda B6, escribe =SUMA(B1:B5) y presiona Enter.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
            { text: 'En la celda B7, escribe =PROMEDIO(B1:B5) para calcular el promedio.' }
          ]
        }
      ]
    },
    {
      title: 'Formato de celdas',
      lessons: [
        {
          title: 'Dar formato a tus datos',
          duration: '4',
          description: 'Haz que tus hojas sean más claras y bonitas usando formato.',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
          instructions: [
            { text: 'Selecciona una celda y cambia el color de fondo desde la barra de herramientas.', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80' },
            { text: 'Pon en negrita los títulos de tus columnas.' },
            { text: 'Ajusta el ancho de las columnas arrastrando el borde superior.' }
          ]
        }
      ]
    },
    {
      title: 'Gráficos y visualización',
      lessons: [
        {
          title: 'Crear un gráfico básico',
          duration: '5',
          description: 'Visualiza tus datos con gráficos sencillos.',
          image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
          instructions: [
            { text: 'Escribe algunos valores en las celdas C1 a C5.' },
            { text: 'Selecciona esos valores y haz clic en "Insertar" > "Gráfico de columnas".', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80' },
            { text: 'Personaliza el gráfico cambiando el título.' }
          ]
        }
      ]
    },
    {
      title: 'Macros básicas',
      lessons: [
        {
          title: '¿Qué es una macro?',
          duration: '3',
          description: 'Descubre para qué sirven las macros y cómo grabar una sencilla.',
          image: 'https://images.unsplash.com/photo-1517260911205-8c6f6fa6c24c?auto=format&fit=crop&w=600&q=80',
          instructions: [
            { text: 'Haz clic en "Vista" > "Macros" > "Grabar macro".', image: 'https://images.unsplash.com/photo-1517260911205-8c6f6fa6c24c?auto=format&fit=crop&w=600&q=80' },
            { text: 'Ponle un nombre y realiza una acción simple, como cambiar el color de una celda.' },
            { text: 'Detén la grabación y prueba ejecutar la macro desde el menú.' }
          ]
        }
      ]
    }
  ]
};