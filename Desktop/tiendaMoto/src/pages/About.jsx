import { Users, Award, Globe, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Excelencia',
      description: 'Comprometidos con la más alta calidad en cada producto que fabricamos.'
    },
    {
      icon: Zap,
      title: 'Innovación',
      description: 'Constantemente evolucionando para ofrecer la última tecnología.'
    },
    {
      icon: Users,
      title: 'Pasión',
      description: 'Apasionados por crear experiencias de conducción inolvidables.'
    },
    {
      icon: Globe,
      title: 'Sostenibilidad',
      description: 'Trabajando por un futuro más limpio y sostenible.'
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sobre Yamaha</h1>
          <p className="text-xl text-gray-600">
            Más de 60 años de innovación y pasión por la excelencia.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Company History */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nuestra Historia
              </h2>
              <p className="text-gray-600 mb-4">
                Fundada en 1955, Yamaha Motor Co., Ltd. ha sido sinónimo de innovación 
                y calidad en la industria de vehículos de motor. Desde nuestra primera 
                motocicleta, la YA-1, hemos estado a la vanguardia del diseño y la 
                tecnología.
              </p>
              <p className="text-gray-600 mb-4">
                Hoy en día, Yamaha es líder global en motocicletas, vehículos marinos, 
                ATV, UTV y mucho más, manteniendo nuestro compromiso con la excelencia 
                y la satisfacción del cliente.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500">Imagen de Yamaha History</span>
            </div>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
              <p className="text-gray-600">
                Crear productos que ofrezcan experiencias únicas y emocionantes a 
                nuestros clientes, superando sus expectativas en calidad, 
                rendimiento y diseño.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
              <p className="text-gray-600">
                Ser la empresa líder en movilidad y experiencias recreativas, 
                innovando constantemente para un futuro más emocionante y sostenible.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-yamaha-blue rounded-full p-3">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;