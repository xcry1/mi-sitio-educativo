import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const DEFAULT_CATEGORIES_SHOWN = 5;

function Navbar() {
  const location = useLocation();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const { user, logout } = useAuth();

  const isCurrentPath = (path) => location.pathname === path;

  const shownCategories = showAllCategories
    ? categories
    : categories.slice(0, DEFAULT_CATEGORIES_SHOWN);

  return (
    <nav className="sidebar modern-navbar">
      <div className="sidebar-header" style={{ padding: '1.2rem 0', textAlign: 'center' }}>
        <span className="navbar-logo" style={{ fontSize: 32, fontWeight: 700, color: '#2563eb' }}>Aprendamos Juntos</span>
      </div>
      <div className="menu">
        <Link to="/" className={`menu-button ${isCurrentPath('/') ? 'active' : ''}`}>
          <span className="menu-icon" aria-hidden>🏠</span>
          <span>Inicio</span>
        </Link>
        <hr className="menu-divider" />
        {/* Categorías */}
        <div className="menu-section">
          <div className="menu-section-title">
            <span>Categorías</span>
          </div>
          <div className="menu-categories-list">
            {shownCategories.map(cat => (
              <Link
                key={cat.key}
                to={`/cursos?categoria=${cat.key}`}
                className={`sub-menu-item${location.search.includes(cat.key) ? ' active' : ''}`}
              >
                {cat.name}
              </Link>
            ))}
            {!showAllCategories && categories.length > DEFAULT_CATEGORIES_SHOWN && (
              <button
                className="sub-menu-item menu-categories-more"
                style={{ fontWeight: 600, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setShowAllCategories(true)}
              >
                Ver más categorías
              </button>
            )}
            {showAllCategories && categories.length > DEFAULT_CATEGORIES_SHOWN && (
              <button
                className="sub-menu-item menu-categories-more"
                style={{ fontWeight: 600, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setShowAllCategories(false)}
              >
                Ver menos
              </button>
            )}
          </div>
          <Link
            to="/cursos"
            className={`menu-button${isCurrentPath('/cursos') ? ' active' : ''}`}
          >
            <span className="menu-icon" aria-hidden>📚</span>
            <span>Todos los cursos</span>
          </Link>
        </div>
        <hr className="menu-divider" />
        <Link
          to="/sobre-nosotros"
          className={`menu-button ${isCurrentPath('/sobre-nosotros') ? 'active' : ''}`}
        >
          <span className="menu-icon" aria-hidden>👥</span>
          <span>Sobre Nosotros</span>
        </Link>
        <hr className="menu-divider" />
        {user && (
          <>
            <Link to="/perfil" className={`menu-button ${isCurrentPath('/perfil') ? 'active' : ''}`}>
              <span className="menu-icon" aria-hidden>🙍‍♂️</span>
              <span>Perfil</span>
            </Link>
            <button className="menu-button" onClick={logout} style={{ marginTop: 12 }}>
              <span className="menu-icon" aria-hidden>🚪</span>
              <span>Cerrar sesión ({user.username})</span>
            </button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login" className={`menu-button ${isCurrentPath('/login') ? 'active' : ''}`}>
              <span className="menu-icon" aria-hidden>🔑</span>
              <span>Iniciar sesión</span>
            </Link>
            <Link to="/registro" className={`menu-button ${isCurrentPath('/registro') ? 'active' : ''}`}>
              <span className="menu-icon" aria-hidden>📝</span>
              <span>Registrarse</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;