import { useState, useEffect } from 'react';
import VehicleTable from '../components/Admin/VehicleTable';
import VehicleForm from '../components/Admin/VehicleForm';
import { Plus } from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api/products';

const Admin = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);
  
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async (data) => {
    try {
      console.log('📦 Datos recibidos del formulario:', data);
      
      // Crear objeto con los campos que espera el backend
      const productData = {
        nombre: data.nombre || data.name || '',
        categoria: data.categoria || data.category || 'moto',
        precio: Number(data.precio || data.price || 0),
        descripcion: data.descripcion || data.description || '',
       imagen: data.imageUrl || data.imagen || '',
        cilindrada: data.cilindrada || '',
        velocidadMax: data.velocidadMax || '',
        peso: data.peso || '',
        disponible: true
      };

      console.log('📤 Enviando al backend:', productData);

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('❌ Error del servidor:', errorData);
        throw new Error(errorData.message || 'Error al guardar');
      }

      const newProduct = await res.json();
      console.log('✅ Vehículo creado exitosamente:', newProduct);

      await fetchVehicles();
      setShowForm(false);
      alert('✅ Vehículo agregado exitosamente');
    } catch (error) {
      console.error('❌ Error al agregar vehículo:', error);
      alert('❌ Error: ' + error.message);
    }
  };

  const handleEditVehicle = async (vehicleData, imageFile) => {
    try {
      console.log('✏️ Editando vehículo:', vehicleData);
      
      const productData = {
        nombre: vehicleData.nombre || vehicleData.name || editingVehicle.nombre,
        precio: Number(vehicleData.precio || vehicleData.price || editingVehicle.precio),
        categoria: vehicleData.categoria || vehicleData.category || editingVehicle.categoria,
        descripcion: vehicleData.descripcion || vehicleData.description || editingVehicle.descripcion,
        imagen: vehicleData.imageUrl || vehicleData.imagen || editingVehicle.imagen,
        cilindrada: vehicleData.cilindrada || editingVehicle.cilindrada || '',
        velocidadMax: vehicleData.velocidadMax || editingVehicle.velocidadMax || '',
        peso: vehicleData.peso || editingVehicle.peso || '',
        disponible: vehicleData.disponible !== undefined ? vehicleData.disponible : editingVehicle.disponible
      };

      console.log('📤 Actualizando en backend:', productData);

      const res = await fetch(`${API_URL}/${editingVehicle._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error al actualizar vehículo');
      }

      const updatedProduct = await res.json();
      console.log('✅ Vehículo actualizado:', updatedProduct);

      await fetchVehicles();
      setEditingVehicle(null);
      setShowForm(false);
      alert('✅ Vehículo actualizado exitosamente');
    } catch (error) {
      console.error('❌ Error updating vehicle:', error);
      alert('❌ Error al actualizar: ' + error.message);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (!vehicleId || vehicleId === 'undefined' || vehicleId.length !== 24) {
      alert('ID de vehículo no válido');
      return;
    }
    if (!window.confirm('¿Estás seguro de que quieres eliminar este vehículo?')) return;

    try {
      const res = await fetch(`${API_URL}/${vehicleId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');
      await fetchVehicles();
      alert('✅ Vehículo eliminado');
    } catch (error) {
      console.error(error);
      alert('❌ Error al eliminar: ' + error.message);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <button
            onClick={() => {
              console.log('🔘 Botón Agregar Vehículo clickeado');
              setEditingVehicle(null);
              setShowForm(true);
            }}
            className="flex items-center space-x-2 bg-yamaha-blue text-white px-4 py-2 rounded-lg hover:bg-yamaha-dark transition"
          >
            <Plus className="h-5 w-5" />
            <span>Agregar Vehículo</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Cargando vehículos...</p>
          </div>
        ) : (
          <VehicleTable
            vehicles={vehicles}
            onEdit={(vehicle) => {
              setEditingVehicle(vehicle);
              setShowForm(true);
            }}
            onDelete={handleDeleteVehicle}
          />
        )}

        {showForm && (
          <VehicleForm
            vehicle={editingVehicle}
            onSubmit={editingVehicle ? handleEditVehicle : handleAddVehicle}
            onCancel={() => {
              setShowForm(false);
              setEditingVehicle(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;