import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="bg-white shadow-yamaha fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18">
          <div className="flex items-center">
            <Link to="/" className="flex items-center py-2">
              <img 
                src="/public/logoYamahaBlanco2.png" 
                alt="Yamaha" 
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-yamaha-dark-400 hover:text-yamaha-blue font-medium transition-colors">
              Inicio
            </Link>
            <Link to="/models" className="text-yamaha-dark-400 hover:text-yamaha-blue font-medium transition-colors">
              Modelos
            </Link>
            <Link to="/about" className="text-yamaha-dark-400 hover:text-yamaha-blue font-medium transition-colors">
              Nosotros
            </Link>
            <Link to="/contact" className="text-yamaha-dark-400 hover:text-yamaha-blue font-medium transition-colors">
              Contáctanos
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/admin" 
                  className="bg-gradient-yamaha text-white px-4 py-2 rounded-lg hover:shadow-glow-blue transition-all duration-300"
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-yamaha-dark-400 hover:text-yamaha-blue transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-gradient-yamaha text-white px-4 py-2 rounded-lg hover:shadow-glow-blue transition-all duration-300"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-yamaha-dark-400 hover:text-yamaha-blue transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-yamaha-blue-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-yamaha-dark-400 hover:text-yamaha-blue hover:bg-yamaha-blue-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/models"
              className="block px-3 py-2 rounded-md text-yamaha-dark-400 hover:text-yamaha-blue hover:bg-yamaha-blue-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Modelos
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-yamaha-dark-400 hover:text-yamaha-blue hover:bg-yamaha-blue-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-yamaha-dark-400 hover:text-yamaha-blue hover:bg-yamaha-blue-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contáctanos
            </Link>
            {user ? (
              <>
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md bg-gradient-yamaha text-white font-medium hover:shadow-glow-blue transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-yamaha-dark-400 hover:text-yamaha-blue hover:bg-yamaha-blue-50 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md bg-gradient-yamaha text-white font-medium hover:shadow-glow-blue transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;