import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { motion } from 'framer-motion';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.categoria === selectedCategory));
    }
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'vehiculos'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 bg-gray-50">
      {/* Hero Banner con Fondo Negro */}
      <div className="relative h-[500px] bg-black overflow-hidden">
        {/* Logo y Texto YAMAHA de Fondo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="flex items-center gap-12">
            <img 
              src="/yamaha-logo-white.png" 
              alt="Yamaha Background" 
              className="h-72 w-auto"
            />
            <span className="text-[220px] font-black text-white tracking-wider font-yamaha">
              YAMAHA
            </span>
          </div>
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yamaha-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yamaha-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center z-10">
          <motion.div 
            className="text-white max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
                Descubre la Pasión 
                <span className="block text-yamaha-accent">de Conducir</span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-xl mb-8 text-gray-200 leading-relaxed drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Explora nuestra gama completa de vehículos Yamaha. Calidad, rendimiento y tecnología en cada modelo.
            </motion.p>
            
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <button className="bg-yamaha-accent text-yamaha-dark-900 px-8 py-4 rounded-lg font-bold hover:bg-yamaha-accent-light transition-all duration-300 shadow-xl hover:shadow-glow-accent transform hover:-translate-y-1">
                Ver Modelos
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-black transition-all duration-300">
                Contactar
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Indicador de scroll */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Modelos Disponibles' },
              { number: '1000+', label: 'Clientes Satisfechos' },
              { number: '15', label: 'Años de Experiencia' },
              { number: '24/7', label: 'Soporte Técnico' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-yamaha-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10 shadow-sm">
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header de sección */}
        <div className="mb-12">
          <motion.h2 
            className="text-4xl font-bold text-yamaha-dark-500 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {selectedCategory === 'all' ? 'Todos los Vehículos' : 
             selectedCategory === 'moto' ? 'Motocicletas' :
             selectedCategory === 'utv' ? 'Vehículos Utilitarios' : 'Todo Terreno'}
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-yamaha-accent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          ></motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ y: -5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <motion.div 
            className="text-center py-16 bg-white rounded-xl shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-4">🏍️</div>
            <p className="text-gray-500 text-lg font-medium mb-2">
              No hay vehículos disponibles
            </p>
            <p className="text-gray-400 text-sm">
              en la categoría {selectedCategory}
            </p>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-yamaha-dark-500 text-white py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              ¿Listo para tu próxima aventura?
            </h2>
            <p className="text-yamaha-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Visítanos en nuestro showroom o agenda una prueba de manejo. Nuestro equipo está listo para ayudarte.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-yamaha-accent text-yamaha-dark-900 px-8 py-4 rounded-lg font-bold hover:bg-yamaha-accent-light transition-all duration-300 shadow-lg">
                Agendar Test Drive
              </button>
              <button className="bg-transparent border-2 border-yamaha-accent text-yamaha-accent px-8 py-4 rounded-lg font-bold hover:bg-yamaha-accent hover:text-yamaha-dark-900 transition-all duration-300">
                Ver Financiamiento
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;