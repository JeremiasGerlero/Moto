import { useState } from 'react';
import { X } from 'lucide-react';

export default function VehicleForm({ vehicle, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: vehicle?.nombre || '',
    categoria: vehicle?.categoria || 'moto',
    precio: vehicle?.precio || '',
    descripcion: vehicle?.descripcion || '',
    imageUrl: vehicle?.imagen || ''
  });

  const [imagePreview, setImagePreview] = useState(vehicle?.imagen || null);

  function handleImageUrlChange(e) {
    const url = e.target.value;
    setFormData({ ...formData, imageUrl: url });
    setImagePreview(url);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('📤 Enviando formulario con datos:', formData);
    
    // Solo pasamos formData, sin el segundo parámetro imageFile
    onSubmit(formData);
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 max-w-md shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {vehicle ? 'Editar Vehículo' : 'Agregar Vehículo'}
          </h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
              placeholder="Ej: Yamaha R1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
            >
              <option value="moto">Moto</option>
              <option value="utv">UTV</option>
              <option value="atv">ATV</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Precio (USD)</label>
            <input
              type="number"
              required
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
              placeholder="15000"
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              required
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
              placeholder="Descripción del vehículo..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de la Imagen
            </label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Pega la URL completa de la imagen
            </p>
            
            {/* Preview de la imagen */}
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              onClick={onCancel} 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-white bg-yamaha-blue rounded-md hover:bg-yamaha-dark transition"
            >
              {vehicle ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}