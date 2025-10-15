import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, Shield, Award } from 'lucide-react';
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
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black via-yamaha-dark-900 to-yamaha-blue-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(13, 71, 161, 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(13, 71, 161, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Elementos decorativos con glow animados */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-yamaha-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-yamaha-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      ></motion.div>
      
      {/* Logo YAMAHA de fondo con animación sutil */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <span className="text-[200px] font-black text-white tracking-widest">
          YAMAHA
        </span>
      </motion.div>

      <div className="max-w-md w-full mx-4 relative z-10">
        <motion.div 
          className="bg-yamaha-dark-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-yamaha-blue-900/30 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Borde animado sutil */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,193,7,0.1), transparent)',
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2
            }}
          />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <motion.div
              className="inline-flex items-center gap-2 bg-yamaha-blue-500/20 backdrop-blur-sm border border-yamaha-blue-400/30 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Shield className="w-4 h-4 text-yamaha-accent" />
              <span className="text-sm font-medium text-yamaha-blue-100">
                Acceso Seguro
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl sm:text-4xl font-black text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-yamaha-blue-200 to-white">
                Bienvenido
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Accede al panel de administración
            </motion.p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div 
              className="bg-red-500/10 border border-red-500/30 backdrop-blur-sm text-red-300 px-4 py-3 rounded-xl mb-6"
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <motion.div 
                className="relative"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-yamaha-blue-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-yamaha-dark-700/50 border-2 border-yamaha-blue-900/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-yamaha-blue-400/50 focus:border-yamaha-blue-400 transition-all outline-none backdrop-blur-sm"
                  placeholder="admin@yamaha.com"
                />
              </motion.div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Contraseña
              </label>
              <motion.div 
                className="relative"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-yamaha-blue-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-yamaha-dark-700/50 border-2 border-yamaha-blue-900/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-yamaha-blue-400/50 focus:border-yamaha-blue-400 transition-all outline-none backdrop-blur-sm"
                  placeholder="••••••••"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-yamaha-accent transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </motion.button>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-gradient-accent text-black py-3 rounded-xl font-bold overflow-hidden shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <motion.svg 
                      className="w-5 h-5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </motion.svg>
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Iniciar Sesión
                  </>
                )}
              </span>
              {!loading && (
                <motion.div
                  className="absolute inset-0 bg-yamaha-accent-light"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.div 
            className="mt-8 pt-6 border-t border-yamaha-blue-900/30 text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-sm text-gray-400">
              ¿Problemas para iniciar sesión?{' '}
              <Link 
                to="/contact" 
                className="text-yamaha-accent hover:text-yamaha-accent-light font-semibold transition-colors"
              >
                Contacta al administrador
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Link */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white hover:text-yamaha-accent transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative floating elements */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 opacity-20"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Award className="w-full h-full text-yamaha-accent" />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;