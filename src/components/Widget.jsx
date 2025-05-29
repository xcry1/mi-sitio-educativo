import React, { useState } from 'react';
import '../styles/Widget.css';

const defaultTips = [
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
  const [tips] = useState(defaultTips);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  if (!isVisible) return null;

  return (
    <div className={`widget widget-animate`}>
      <button className="widget-close" onClick={() => setIsVisible(false)} aria-label="Cerrar">
        ×
      </button>
      <div className="widget-header">
        <span role="img" aria-label="ayuda" className="widget-icon">💡</span>
        <span className="widget-title">Consejo del día</span>
      </div>
      <p className="widget-main-text">{text}</p>
      <div className="widget-tip-box">
        <p className="widget-tip">
          <strong>Consejo:</strong> <span className="widget-tip-text">{tips[currentTip]}</span>
        </p>
        <div className="widget-tip-nav">
          <button className="widget-nav-btn" onClick={prevTip} title="Anterior consejo" aria-label="Anterior consejo">◀</button>
          <span className="widget-tip-count">{currentTip + 1}/{tips.length}</span>
          <button className="widget-nav-btn" onClick={nextTip} title="Siguiente consejo" aria-label="Siguiente consejo">▶</button>
        </div>
      </div>
    </div>
  );
}

export default Widget;