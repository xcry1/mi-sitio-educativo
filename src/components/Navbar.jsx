import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Inicio' },
    { path: '/sobre-nosotros', icon: '👥', label: 'Sobre Nosotros' },
    { path: '/cursos', icon: '📚', label: 'Cursos' }
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Aprendamos Juntos</h2>
      </div>
      <ul className="sidebar-menu">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`sidebar-button ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span role="img" aria-label={item.label}>{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;