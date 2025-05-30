import React from 'react';
import Hero from './Hero';
import CourseList from './CourseList';
import { courses } from '../data/courses';
import '../styles/Home.css';

function Home() {
  // Ejemplo: destacados = primeros 3, nuevos = últimos 3
  const destacados = courses.slice(0, 3);
  const nuevos = courses.slice(-3);

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
      <section className="featured-courses-section">
        <h2 className="section-title">🎯 Cursos Destacados</h2>
        <div className="course-grid">
          {destacados.map(course => (
            <CourseList.Card key={course.id} {...course} />
          ))}
        </div>
      </section>
      <section className="new-courses-section">
        <h2 className="section-title">🆕 Nuevos Cursos</h2>
        <div className="course-grid">
          {nuevos.map(course => (
            <CourseList.Card key={course.id} {...course} />
          ))}
        </div>
      </section>
      <CourseList />
    </div>
  );
}

export default Home;
