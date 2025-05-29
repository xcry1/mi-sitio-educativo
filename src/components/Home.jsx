import React from 'react';
import Hero from './Hero';
import CourseList from './CourseList';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <Hero />
      <div className="welcome-section">
        <p className="welcome-text">
          Este es un espacio diseñado para que todos puedan aprender tecnología de forma 
          gratuita y accesible. Aquí encontrarás cursos prácticos que te ayudarán a 
          desenvolverte mejor en el mundo digital, sin importar tu nivel de experiencia.
        </p>
        <p className="welcome-text">
          Nuestros cursos están diseñados pensando en personas que, como tú, buscan 
          mejorar sus habilidades digitales en un ambiente amigable y sin presiones.
        </p>
      </div>
      <CourseList />
    </div>
  );
}

export default Home;
