import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/yamaha-logo-white.png" 
              alt="Yamaha" 
              className="h-12 mb-4"
            />
            <p className="text-gray-400 mb-4">
              Yamaha Motor Corporation - Líder en innovación y tecnología 
              para vehículos de motor. Descubre nuestra gama completa de 
              productos diseñados para ofrecer el máximo rendimiento.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yamaha-blue" />
                <span className="text-gray-400">
                  Av. Principal 123<br />
                  Ciudad, País 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yamaha-blue" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yamaha-blue" />
                <span className="text-gray-400">info@yamaha.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition">
                Términos y Condiciones
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition">
                Política de Privacidad
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition">
                Preguntas Frecuentes
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition">
                Soporte Técnico
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Yamaha Motor Corporation. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;