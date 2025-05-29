import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = register(username, password);
    if (res.success) {
      setMsg('Registro exitoso. Ahora puedes iniciar sesión.');
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1800);
    } else {
      setMsg(res.message);
      setSuccess(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Registrarse</h2>
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
          autoComplete="new-password"
        />
        <button type="submit" className="auth-btn">Registrarse</button>
        {msg && (
          <div className={`auth-msg ${success ? 'auth-success' : 'auth-error'}`}>
            {msg}
          </div>
        )}
        <div className="auth-link">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
