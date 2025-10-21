import { useState, useEffect } from 'react';
import VehicleTable from '../components/Admin/VehicleTable';
import VehicleForm from '../components/Admin/VehicleForm';
import { Plus } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/products'; // ← tu backend MongoDB

const Admin = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleAddVehicle = async (vehicleData, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('name', vehicleData.name);
      formData.append('price', Number(vehicleData.precio));
      formData.append('category', vehicleData.categoria);
      formData.append('description', vehicleData.descripcion);
      if (imageFile) formData.append('image', imageFile);

      await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      await fetchVehicles();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleEditVehicle = async (vehicleData, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('name', vehicleData.name);
      formData.append('price', Number(vehicleData.precio));
      formData.append('category', vehicleData.categoria);
      formData.append('description', vehicleData.descripcion);
      if (imageFile) formData.append('image', imageFile);

      await fetch(`${API_URL}/${editingVehicle._id}`, {
        method: 'PUT',
        body: formData,
      });

      await fetchVehicles();
      setEditingVehicle(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este vehículo?')) return;
    try {
      await fetch(`${API_URL}/${vehicleId}`, { method: 'DELETE' });
      await fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <button
            onClick={() => {
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