import { Users, Award, Globe, Zap, Target, Eye, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Excelencia',
      description: 'Comprometidos con la más alta calidad en cada producto que fabricamos.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Innovación',
      description: 'Constantemente evolucionando para ofrecer la última tecnología.',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      icon: Users,
      title: 'Pasión',
      description: 'Apasionados por crear experiencias de conducción inolvidables.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Globe,
      title: 'Sostenibilidad',
      description: 'Trabajando por un futuro más limpio y sostenible.',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const stats = [
    { number: '60+', label: 'Años de Historia', icon: TrendingUp },
    { number: '180+', label: 'Países', icon: Globe },
    { number: '50M+', label: 'Clientes Satisfechos', icon: Users },
    { number: '100%', label: 'Compromiso', icon: Shield }
  ];

  const timeline = [
    { year: '1955', event: 'Fundación de Yamaha Motor' },
    { year: '1960', event: 'Primera exportación internacional' },
    { year: '1980', event: 'Líder en innovación tecnológica' },
    { year: '2000', event: 'Expansión global consolidada' },
    { year: '2023', event: 'Presente en más de 180 países' }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-yamaha text-white overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yamaha-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yamaha-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-1 bg-yamaha-accent rounded-full"></div>
              <span className="text-yamaha-accent font-semibold tracking-wider uppercase text-sm">
                Sobre Nosotros
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Yamaha Motor
            </h1>
            
            <p className="text-2xl text-yamaha-blue-100 max-w-3xl leading-relaxed">
              Más de 60 años de innovación y pasión por la excelencia.
            </p>
          </motion.div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48h1440V0c-197.333 32-410.667 48-640 48S197.333 32 0 0v48z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="bg-yamaha-blue-50 rounded-full p-3">
                      <Icon className="w-6 h-6 text-yamaha-blue-600" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-yamaha-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Company History */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-1 bg-yamaha-accent rounded-full"></div>
                <span className="text-yamaha-blue-600 font-semibold text-sm uppercase tracking-wider">
                  Historia
                </span>
              </div>
              
              <h2 className="text-4xl font-bold text-yamaha-dark-500 mb-6">
                Nuestra Historia
              </h2>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                Fundada en 1955, Yamaha Motor Co., Ltd. ha sido sinónimo de innovación 
                y calidad en la industria de vehículos de motor. Desde nuestra primera 
                motocicleta, la YA-1, hemos estado a la vanguardia del diseño y la 
                tecnología.
              </p>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hoy en día, Yamaha es líder global en motocicletas, vehículos marinos, 
                ATV, UTV y mucho más, manteniendo nuestro compromiso con la excelencia 
                y la satisfacción del cliente.
              </p>

              {/* Timeline Mini */}
              <div className="space-y-3">
                {timeline.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="bg-yamaha-blue-600 text-white px-3 py-1 rounded-lg font-bold text-sm min-w-[60px] text-center">
                      {item.year}
                    </div>
                    <div className="text-gray-700 text-sm">{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <motion.div 
              className="relative h-96 bg-gradient-to-br from-yamaha-blue-500 to-yamaha-blue-700 rounded-2xl overflow-hidden shadow-yamaha"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl font-bold mb-4">1955</div>
                  <div className="text-2xl font-semibold">Fundación</div>
                  <div className="text-yamaha-blue-100 mt-2">Yamaha Motor Co.</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yamaha-accent/10 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission and Vision */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yamaha-dark-500 mb-4">
              Misión y Visión
            </h2>
            <div className="w-20 h-1 bg-yamaha-accent rounded-full mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white p-10 rounded-2xl shadow-yamaha border-l-4 border-yamaha-blue-500 hover:shadow-yamaha-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-yamaha-blue-500 to-yamaha-blue-600 rounded-full p-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-yamaha-dark-500">
                  Nuestra Misión
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Crear productos que ofrezcan experiencias únicas y emocionantes a 
                nuestros clientes, superando sus expectativas en calidad, 
                rendimiento y diseño.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-10 rounded-2xl shadow-yamaha border-l-4 border-yamaha-accent hover:shadow-yamaha-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-accent rounded-full p-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-yamaha-dark-500">
                  Nuestra Visión
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Ser la empresa líder en movilidad y experiencias recreativas, 
                innovando constantemente para un futuro más emocionante y sostenible.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-yamaha-accent rounded-full"></div>
              <span className="text-yamaha-blue-600 font-semibold text-sm uppercase tracking-wider">
                Valores Corporativos
              </span>
              <div className="w-8 h-1 bg-yamaha-accent rounded-full"></div>
            </div>
            <h2 className="text-4xl font-bold text-yamaha-dark-500 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los pilares fundamentales que guían cada decisión y acción en Yamaha
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={index} 
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-yamaha transition-all duration-300 text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="flex justify-center mb-6">
                    <div className={`bg-gradient-to-br ${value.color} rounded-2xl p-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-yamaha-dark-500 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-yamaha-dark text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Únete a la Familia Yamaha
            </h2>
            <p className="text-yamaha-blue-100 text-xl mb-10 max-w-2xl mx-auto">
              Descubre por qué millones de personas en todo el mundo confían en Yamaha
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yamaha-accent text-yamaha-dark-900 px-10 py-4 rounded-lg font-bold hover:bg-yamaha-accent-light transition-all duration-300 shadow-lg hover:shadow-glow-accent transform hover:-translate-y-1">
                Ver Modelos
              </button>
              <button className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white hover:text-yamaha-blue-600 transition-all duration-300">
                Contactar
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;