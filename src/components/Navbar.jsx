import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { courses } from '../data/courses';

function Navbar() {
  const location = useLocation();
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
      </div>

      <div className="menu">
        <div className="menu-header">Aprendamos Juntos</div>
        <Link to="/" className={`menu-button ${isCurrentPath('/') ? 'active' : ''}`}>
          <span className="menu-icon">🏠</span>
          Inicio
        </Link>

        <div className="menu-item">
          <button 
            className={`menu-button ${location.pathname.includes('/curso/') || location.pathname === '/cursos' ? 'active' : ''}`}
            onClick={() => setIsCoursesOpen(!isCoursesOpen)}
            aria-expanded={isCoursesOpen}
          >
            <span className="menu-icon">📚</span>
            Cursos
            <span className="menu-suffix">▼</span>
          </button>
          <div className={`sub-menu ${isCoursesOpen ? 'open' : ''}`}>
            <Link 
              to="/cursos"
              className={`sub-menu-item ${isCurrentPath('/cursos') ? 'active' : ''}`}
            >
              Ver todos los cursos
            </Link>
            {courses.map(course => (
              <Link 
                key={course.slug}
                to={`/curso/${course.slug}`}
                className={`sub-menu-item ${isCurrentPath(`/curso/${course.slug}`) ? 'active' : ''}`}
              >
                {course.name}
              </Link>
            ))}
          </div>
        </div>

        <Link 
          to="/sobre-nosotros" 
          className={`menu-button ${isCurrentPath('/sobre-nosotros') ? 'active' : ''}`}
        >
          <span className="menu-icon">👥</span>
          Sobre Nosotros
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;