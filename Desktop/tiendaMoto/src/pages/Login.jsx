import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-yamaha-dark-900 via-yamaha-dark-700 to-yamaha-blue-900 flex items-center justify-center relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yamaha-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yamaha-accent/10 rounded-full blur-3xl"></div>
      
      {/* Logo de fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img 
          src="/public/logoYamahaBlanco2.png" 
          alt="Background" 
          className="h-96 w-auto"
        />
      </div>

      <div className="max-w-md w-full mx-4 relative z-10">
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-yamaha-lg p-8 border border-yamaha-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img 
                src="/yamaha-logo.png" 
                alt="Yamaha" 
                className="h-16 mx-auto mb-6"
              />
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold text-yamaha-dark-900 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Bienvenido
            </motion.h2>
            
            <motion.p 
              className="text-yamaha-dark-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Accede al panel de administración
            </motion.p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div 
              className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-yamaha-dark-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-yamaha-dark-300" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-yamaha-blue-100 rounded-lg focus:ring-2 focus:ring-yamaha-blue-400 focus:border-yamaha-blue-400 transition-all outline-none"
                  placeholder="admin@yamaha.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-yamaha-dark-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-yamaha-dark-300" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border-2 border-yamaha-blue-100 rounded-lg focus:ring-2 focus:ring-yamaha-blue-400 focus:border-yamaha-blue-400 transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-yamaha-blue-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-yamaha-dark-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-yamaha-dark-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-yamaha text-white py-3 rounded-lg font-bold hover:shadow-glow-blue transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </motion.form>

          {/* Footer */}
          <motion.div 
            className="mt-8 pt-6 border-t border-yamaha-blue-100 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-yamaha-dark-400">
              ¿Problemas para iniciar sesión?{' '}
              <Link 
                to="/contact" 
                className="text-yamaha-blue-600 hover:text-yamaha-blue-700 font-semibold transition-colors"
              >
                Contacta al administrador
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Link */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link 
            to="/" 
            className="text-white hover:text-yamaha-accent transition-colors font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;