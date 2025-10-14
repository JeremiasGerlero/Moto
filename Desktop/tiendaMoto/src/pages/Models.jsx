import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { motion } from 'framer-motion';

const Models = () => {
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

  // Obtener el conteo de productos por categoría
  const getCategoryCount = (category) => {
    if (category === 'all') return products.length;
    return products.filter(p => p.categoria === category).length;
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header Hero Section */}
      <div className="relative bg-gradient-yamaha text-white overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yamaha-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yamaha-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-1 bg-yamaha-accent rounded-full"></div>
              <span className="text-yamaha-accent font-semibold tracking-wider uppercase text-sm">
                Catálogo Completo
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Nuestros Modelos
            </h1>
            
            <p className="text-xl text-yamaha-blue-100 max-w-3xl leading-relaxed">
              Descubre toda la gama de vehículos Yamaha diseñados para ofrecerte 
              la mejor experiencia de conducción. Calidad, potencia y tecnología en cada modelo.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {[
                { label: 'Total', category: 'all', icon: '🏍️' },
                { label: 'Motos', category: 'moto', icon: '🏍️' },
                { label: 'UTV', category: 'utv', icon: '🚙' },
                { label: 'ATV', category: 'atv', icon: '🛞' }
              ].map((item, index) => (
                <motion.div
                  key={item.category}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-3xl font-bold text-yamaha-accent mb-1">
                    {getCategoryCount(item.category)}
                  </div>
                  <div className="text-sm text-yamaha-blue-100 font-medium">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48h1440V0c-197.333 32-410.667 48-640 48S197.333 32 0 0v48z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Category Filter - Sticky */}
      <div className="sticky top-16 z-20 bg-white border-b border-gray-200 shadow-sm">
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Section Header */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold text-yamaha-dark-500 mb-2">
                {selectedCategory === 'all' ? 'Todos los Vehículos' : 
                 selectedCategory === 'moto' ? 'Motocicletas' :
                 selectedCategory === 'utv' ? 'Vehículos Utilitarios' : 'Todo Terreno'}
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'modelo disponible' : 'modelos disponibles'}
              </p>
            </div>

            {/* View Options - opcional */}
            <div className="flex gap-2 bg-white rounded-lg p-1 border border-gray-200">
              <button className="px-4 py-2 rounded-md bg-yamaha-blue-500 text-white text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
              <button className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="w-20 h-1 bg-yamaha-accent rounded-full mt-4"></div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
                  <div className="flex gap-2">
                    <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                    <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Products Grid */
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                whileHover={{ y: -8 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <motion.div 
            className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-7xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-yamaha-dark-500 mb-3">
              No hay vehículos disponibles
            </h3>
            <p className="text-gray-500 text-lg mb-6">
              No encontramos modelos en la categoría 
              <span className="font-semibold text-yamaha-blue-600"> {selectedCategory}</span>
            </p>
            <button 
              onClick={() => setSelectedCategory('all')}
              className="bg-yamaha-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yamaha-blue-600 transition-colors duration-300"
            >
              Ver todos los modelos
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom CTA Section */}
      {!loading && filteredProducts.length > 0 && (
        <div className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <motion.div 
              className="bg-gradient-yamaha rounded-2xl p-12 text-center text-white relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Elementos decorativos */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yamaha-accent/10 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  ¿Encontraste tu modelo ideal?
                </h3>
                <p className="text-yamaha-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                  Agenda una cita con nuestros asesores y descubre todo lo que Yamaha tiene para ofrecerte
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-yamaha-accent text-yamaha-dark-900 px-8 py-4 rounded-lg font-bold hover:bg-yamaha-accent-light transition-all duration-300 shadow-lg hover:shadow-glow-accent">
                    Contactar Asesor
                  </button>
                  <button className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-yamaha-blue-600 transition-all duration-300">
                    Ver Financiamiento
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Models;