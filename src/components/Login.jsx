import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(username, password);
    if (res.success) {
      setMsg('');
      navigate('/');
    } else {
      setMsg(res.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="auth-input"
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="auth-input"
          autoComplete="current-password"
        />
        <button type="submit" className="auth-btn">Ingresar</button>
        {msg && <div className="auth-msg auth-error">{msg}</div>}
        <div className="auth-link">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
