import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('aj_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Guardar usuario en localStorage al cambiar
  useEffect(() => {
    if (user) {
      localStorage.setItem('aj_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aj_user');
    }
  }, [user]);

  // Registro: guarda usuario en localStorage (hay que expandir backend para persistencia real)
  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem('aj_users') || '{}');
    if (users[username]) {
      return { success: false, message: 'El usuario ya existe.' };
    }
    users[username] = { username, password };
    localStorage.setItem('aj_users', JSON.stringify(users));
    setUser({ username });
    return { success: true };
  };

  // Login: verifica usuario en localStorage (hay que expandir backend para persistencia real)
  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('aj_users') || '{}');
    if (users[username] && users[username].password === password) {
      setUser({ username });
      return { success: true };
    }
    return { success: false, message: 'Usuario o contraseña incorrectos.' };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
