import { Link } from 'react-router-dom';
import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Bienvenido a Aprendamos Juntos</h1>
        <p>Tu viaje hacia el conocimiento digital comienza aquí. Aprende a tu ritmo, sin costo y con todo nuestro apoyo.</p>
        <Link to="/cursos" className="cta-button" aria-label="Explorar cursos disponibles">
          Explora los cursos
        </Link>
      </div>
    </section>
  );
}

export default Hero;