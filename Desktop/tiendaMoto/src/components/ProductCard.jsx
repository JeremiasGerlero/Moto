import { ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        <img 
          src={product.imageUrl} 
          alt={product.nombre}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Yamaha';
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {product.nombre}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.descripcion}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-yamaha-blue">
            ${product.precio.toLocaleString()}
          </span>
          <button className="flex items-center space-x-2 bg-yamaha-blue text-white px-4 py-2 rounded-lg hover:bg-yamaha-dark transition">
            <span>Cotizar</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;