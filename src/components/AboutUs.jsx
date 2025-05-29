import React from 'react';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div>
      <div className="about-hero-banner">
        <div className="about-hero-banner-bg">
          <div className="about-hero-banner-content">
            <h1>
              La educación es
              <span className="about-hero-highlight">GRATIS</span>
              .
            </h1>
            <p style={{ fontSize: '1.25rem', margin: '0 auto', maxWidth: 600, color: '#eafaf1', textShadow: '0 1px 8px rgba(0,0,0,0.10)' }}>
              Un espacio para aprender tecnología sin barreras, sin costo y con solidaridad.
            </p>
          </div>
        </div>
      </div>
      <div className="about-container">
        <div className="about-content">
          <div className="about-author">
            <div className="about-avatar" aria-label="Avatar" title="Francisco Cornet D'Hunval">
              <span role="img" aria-label="Persona">👨‍🏫</span>
            </div>
            <div>
              <h2>Francisco Cornet D'Hunval</h2>
              <p className="about-location">Merlo, San Luis</p>
            </div>
          </div>
          <div className="about-text">
            <blockquote className="about-quote">
              "Aprendamos Juntos nació de una idea simple, pero profunda: acercar el conocimiento a quienes más lo necesitan."
            </blockquote>
            <p>
              En <strong>Aprendamos Juntos</strong> creemos que el acceso al conocimiento no debe depender de tu bolsillo. Por eso, todos nuestros cursos son <span className="about-free">100% gratuitos</span>. No hay letras chicas, no hay cobros ocultos, no hay suscripciones: solo ganas de compartir y ayudar.
            </p>
            <p>
              Sabemos lo que se siente querer aprender y no poder pagar. Por eso, nuestro mayor objetivo es llegar a quienes más lo necesitan, a quienes alguna vez se sintieron excluidos por no poder comprar un curso. Aquí, nadie se queda afuera.
            </p>
            <h3>¿Por qué este proyecto?</h3>
            <p>
              Vivimos en una época donde aprender por internet debería ser un derecho accesible para todos, pero la realidad es otra. Muchos cursos tienen precios elevados que muchas personas no pueden pagar. Yo mismo pasé por eso. Por eso decidí crear este espacio: un lugar donde el aprendizaje no esté atado a lo económico, sino impulsado por la solidaridad, el compromiso y las ganas de superarse.
            </p>
            <h3>Nuestra misión</h3>
            <p>
              "Aprendamos Juntos" ofrece cursos básicos y avanzados pensados para quienes buscan una oportunidad. Ya sea que estés dando tus primeros pasos o que quieras mejorar tus habilidades, aquí vas a encontrar un lugar donde aprender con respeto, sin prejuicios, y con el apoyo de alguien que entiende por lo que estás pasando.
            </p>
            <div className="about-highlight">
              <p>
                Este proyecto está en constante crecimiento, y mi mayor recompensa es ver que cada persona que accede a un curso aquí, encuentra una puerta abierta hacia un futuro mejor.
              </p>
            </div>
            <p className="about-thanks">
              Gracias por estar acá. Gracias por creer en que aprender juntos es posible.<br />
              <span className="about-free">La educación es gratis. Y siempre lo será aquí.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
