import React, { useState } from 'react';

const tips = [
  'Siempre usa contraseñas seguras con letras y números.',
  'No hagas clic en enlaces extraños que lleguen por correo.',
  'Guarda tus archivos importantes en una carpeta fácil de encontrar.',
  'Si te pierdes en internet, usa la barra de búsqueda para volver.',
  'Pide ayuda a alguien de confianza si algo no funciona.',
  'Actualiza tu computadora regularmente para estar seguro.',
  'Usa auriculares para videollamadas si estás en un lugar ruidoso.',
  'Escribe tus correos con calma, puedes revisarlos antes de enviar.',
  'Explora poco a poco, no hay prisa para aprender todo.',
  'Guarda tus contactos en un lugar seguro para no perderlos.'
];

function Widget({ text }) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTip, setCurrentTip] = useState(0);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  if (!isVisible) return null;

  return (
    <div className="widget">
      <button className="widget-close" onClick={() => setIsVisible(false)} aria-label="Cerrar">
        ×
      </button>
      <p>{text}</p>
      <p className="widget-tip"><strong>Consejo:</strong> {tips[currentTip]}</p>
      <button className="widget-next" onClick={nextTip}>Siguiente Consejo</button>
    </div>
  );
}

export default Widget;