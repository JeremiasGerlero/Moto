import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, Home, Car, Info, Mail, Shield, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleNavClick = (e, to) => {
  // Si ya estamos en la misma ruta, recargar la página
  if (location.pathname === to) {
    e.preventDefault();
    window.location.reload();
  }
};


  const navLinks = [
    { to: '/', label: 'Inicio', icon: Home },
    { to: '/models', label: 'Modelos', icon: Car },
    { to: '/about', label: 'Nosotros', icon: Info },
    { to: '/contact', label: 'Contáctanos', icon: Mail }
  ];

  return (
    <>
      {/* Navbar con backdrop blur y gradiente */}
      <motion.nav
        className="fixed w-full top-0 z-50 bg-yamaha-dark-900/95 backdrop-blur-lg border-b border-yamaha-blue-900/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glow superior */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yamaha-accent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/" className="flex items-center py-2 group">
                <motion.img
                  src="/logoYamahaBlanco2.png"
                  alt="Yamaha"
                  className="h-16 w-auto transition-all duration-300"
                  whileHover={{
                    filter: "drop-shadow(0 0 12px rgba(255,193,7,0.6)) drop-shadow(0 0 20px rgba(255,193,7,0.3))",
                    scale: 1.02
                  }}
                />
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
             {navLinks.map((link) => {
               const Icon = link.icon;
               return (
                <Link
                 key={link.to}
                 to={link.to}
                 onClick={(e) => handleNavClick(e, link.to)}
                 className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                 location.pathname === link.to
                 ? 'bg-yamaha-blue text-white'
                 : 'text-gray-700 hover:bg-gray-100'
              }`} >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
           );
        })}

              {currentUser ? (
                <div className="flex items-center space-x-3 ml-4">
                  {/* Badge de usuario */}
                  <motion.div
                    className="flex items-center gap-2 bg-yamaha-blue-500/20 backdrop-blur-sm border border-yamaha-blue-400/30 rounded-full px-3 py-1.5"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Sparkles className="w-3 h-3 text-yamaha-accent" />
                    <span className="text-xs font-medium text-yamaha-blue-100">
                      {currentUser.role === 'user' ? 'Comprador' : 'Administrador'}
                    </span>
                  </motion.div>

                  {currentUser.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="bg-yamaha-blue text-white px-5 py-2.5 rounded-xl font-bold hover:bg-yamaha-dark transition"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Panel
                      </span>
                    </Link>
                  )}

                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-400 hover:text-yamaha-accent transition-colors px-3 py-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Salir</span>
                  </motion.button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-accent text-black px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-yamaha-accent-light transition-colors"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu con animación */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-20 left-0 right-0 z-40 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-yamaha-dark-900/98 backdrop-blur-xl border-b border-yamaha-blue-900/30 shadow-2xl">
                <div className="px-4 py-6 space-y-2">
                  {navLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.to}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={link.to}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-yamaha-dark-800/50 transition-all"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="p-2 rounded-lg bg-yamaha-dark-700/50 group-hover:bg-yamaha-blue-500/20 transition-colors">
                            <Icon className="w-5 h-5 text-yamaha-blue-400 group-hover:text-yamaha-accent transition-colors" />
                          </div>
                          <span className="font-medium">{link.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Divider */}
                  <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-yamaha-blue-900/50 to-transparent my-4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4 }}
                  />

                  {currentUser ? (
                    <>
                      {currentUser.role === 'admin' && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Link
                            to="/admin"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-accent text-black font-bold shadow-lg"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Shield className="w-5 h-5" />
                            <span>Panel Admin</span>
                          </Link>
                        </motion.div>
                      )}

                      <motion.button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:text-yamaha-accent hover:bg-yamaha-dark-800/50 transition-all"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="p-2 rounded-lg bg-yamaha-dark-700/50">
                          <LogOut className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Cerrar Sesión</span>
                      </motion.button>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-accent text-black font-bold shadow-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>Iniciar Sesión</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;