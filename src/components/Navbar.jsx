import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

// Lista de categorías (ajusta según tus datos reales)
const categories = [
  { slug: 'tecnologia', name: 'Tecnología' },
  { slug: 'redes-sociales', name: 'Redes Sociales' },
  { slug: 'inteligencia-artificial', name: 'IA' },
  { slug: 'programacion', name: 'Programación' },
  { slug: 'edicion-video', name: 'Edición de Video' },
  { slug: 'fotografia', name: 'Fotografía' },
  { slug: 'diseno-grafico', name: 'Diseño Gráfico' },
  { slug: 'youtube', name: 'YouTube' },
  { slug: 'streaming', name: 'Streaming' },
  { slug: 'podcasting', name: 'Podcasting' },
  { slug: 'herramientas-ia', name: 'Herramientas IA' },
  { slug: 'escritura', name: 'Escritura' },
];

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="modern-sidebar">
      <div className="sidebar-logo">
        <Link to="/" className="sidebar-brand" title="Inicio">
          <span className="sidebar-logo-icon">🧑‍💻</span>
        </Link>
      </div>
      <div className="sidebar-divider" />
      <ul className="sidebar-links">
        <li>
          <Link to="/cursos" className={`sidebar-link${location.pathname.startsWith('/cursos') ? ' active' : ''}`}>
            <span className="sidebar-link-icon">📚</span> Cursos
          </Link>
        </li>
        <li>
          <Link to="/sobre-nosotros" className={`sidebar-link${location.pathname === '/sobre-nosotros' ? ' active' : ''}`}>
            <span className="sidebar-link-icon">ℹ️</span> Sobre Nosotros
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/perfil" className={`sidebar-link${location.pathname === '/perfil' ? ' active' : ''}`}>
              <span className="sidebar-link-icon">👤</span> Perfil
            </Link>
          </li>
        )}
      </ul>
      <div className="sidebar-divider" />
      <div className="sidebar-categories-title">Categorías</div>
      <ul className="sidebar-categories">
        {categories.map(cat => (
          <li key={cat.slug}>
            <Link
              to={`/cursos?categoria=${cat.slug}`}
              className={`sidebar-category-link${location.search.includes(cat.slug) ? ' active' : ''}`}
            >
              <span className="sidebar-category-dot" /> {cat.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="sidebar-divider" />
      <div className="sidebar-actions">
        {!user ? (
          <>
            <Link to="/login" className="sidebar-btn sidebar-btn-outline">Iniciar sesión</Link>
            <Link to="/registro" className="sidebar-btn sidebar-btn-primary">Registrarse</Link>
          </>
        ) : (
          <button className="sidebar-btn sidebar-btn-logout" onClick={handleLogout}>
            <span className="sidebar-btn-logout-icon">⏻</span> Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;