import { Link } from 'react-router-dom';
import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero hero-img-bg">
      <div className="hero-content hero-content-img">
        <h1>
          <span className="hero-title-main">Aprendamos Juntos</span>
          <span className="hero-title-highlight">Educación digital gratuita y accesible</span>
        </h1>
        <p className="hero-desc">
          Tu viaje hacia el conocimiento digital comienza aquí.<br />
          Aprende a tu ritmo, sin costo y con todo nuestro apoyo.
        </p>
        <Link to="/cursos" className="cta-button cta-button-modern" aria-label="Explorar cursos disponibles">
          Explora los cursos
        </Link>
      </div>
    </section>
  );
}

export default Hero;