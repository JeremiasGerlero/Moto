import { useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de instalar react-router-dom

// Importa tu logo desde la carpeta de assets
// import YamahaLogo from '../../assets/yamaha-logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              {/* <img className="h-8 w-auto" src={YamahaLogo} alt="Yamaha Logo" /> */}
              <span className="font-bold text-xl">YAMAHA</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Inicio</Link>
              <Link to="/modelos" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Modelos</Link>
              <Link to="/nosotros" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Nosotros</Link>
              <Link to="/contacto" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Contáctanos</Link>
              <Link to="/admin/login" className="bg-white text-blue-800 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">Admin Login</Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-blue-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Inicio</Link>
            <Link to="/modelos" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Modelos</Link>
            <Link to="/nosotros" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Nosotros</Link>
            <Link to="/contacto" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Contáctanos</Link>
            <Link to="/admin/login" className="bg-white text-blue-800 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium mt-2">Admin Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;