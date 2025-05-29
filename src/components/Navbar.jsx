import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { courses } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const { user, logout } = useAuth();

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

        {/* Auth links */}
        {!user && (
          <>
            <Link to="/login" className={`menu-button ${isCurrentPath('/login') ? 'active' : ''}`}>
              <span className="menu-icon">🔑</span>
              Iniciar sesión
            </Link>
            <Link to="/registro" className={`menu-button ${isCurrentPath('/registro') ? 'active' : ''}`}>
              <span className="menu-icon">📝</span>
              Registrarse
            </Link>
          </>
        )}
        {user && (
          <>
            <Link to="/perfil" className={`menu-button ${isCurrentPath('/perfil') ? 'active' : ''}`}>
              <span className="menu-icon">🙍‍♂️</span>
              Perfil
            </Link>
            <button className="menu-button" onClick={logout} style={{ marginTop: 12 }}>
              <span className="menu-icon">🚪</span>
              Cerrar sesión ({user.username})
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;