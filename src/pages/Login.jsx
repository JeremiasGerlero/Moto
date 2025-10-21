import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:5000/api/auth'; // ← tu backend MongoDB

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Credenciales inválidas');

      // Guardar token o sesión (opcional)
      localStorage.setItem('token', data.token);

      navigate('/admin');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ↓ todo tu JSX igual, sin cambios visuales
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black via-yamaha-dark-900 to-yamaha-blue-900 flex items-center justify-center relative overflow-hidden">
      {/* ... (todo tu JSX previo sin cambios) ... */}
    </div>
  );
};

export default Login;