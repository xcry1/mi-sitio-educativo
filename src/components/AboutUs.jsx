import React from 'react';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>Sobre Nosotros</h1>
      </div>
      <div className="about-content">
        <div className="about-author">
          <img
            src="https://ui-avatars.com/api/?name=Francisco+Cornet+D'Hunval&background=007bff&color=fff&size=128"
            alt="Francisco Cornet D'Hunval"
            className="about-avatar"
          />
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
            Este proyecto fue desarrollado completamente por mí, con esfuerzo, dedicación y, sobre todo, con el corazón. No cuento con un gran equipo, ni con una empresa detrás; solo con las ganas de hacer una diferencia.
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
            Gracias por estar acá. Gracias por creer en que aprender juntos es posible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
