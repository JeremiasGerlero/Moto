// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // ➜ 1. Lee usuario de localStorage al arrancar
    const saved = localStorage.getItem('yamahaUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ➜ 2. Escucha cambios de Firebase/localStorage y los guarda
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setCurrentUser(data.user);
            localStorage.setItem('yamahaUser', JSON.stringify(data.user));
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('yamahaUser');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');

    // ➜ 3. Guarda token y usuario en localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('yamahaUser', JSON.stringify(data.user));
    setCurrentUser(data.user);
  };

  const logout = () => {
    // ➜ 4. Limpia localStorage al cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('yamahaUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};