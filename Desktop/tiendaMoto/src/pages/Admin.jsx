import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import VehicleTable from '../components/Admin/VehicleTable';
import VehicleForm from '../components/Admin/VehicleForm';
import { Plus } from 'lucide-react';

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
      const querySnapshot = await getDocs(collection(db, 'vehiculos'));
      const vehiclesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVehicles(vehiclesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setLoading(false);
    }
  };

  const handleAddVehicle = async (vehicleData, imageFile) => {
    try {
      let imageUrl = '';
      
      if (imageFile) {
        const imageRef = ref(storage, `vehicles/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const newVehicle = {
        ...vehicleData,
        imageUrl: imageUrl || vehicleData.imageUrl,
        precio: Number(vehicleData.precio)
      };

      await addDoc(collection(db, 'vehiculos'), newVehicle);
      await fetchVehicles();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleEditVehicle = async (vehicleData, imageFile) => {
    try {
      let imageUrl = vehicleData.imageUrl;
      
      if (imageFile) {
        const imageRef = ref(storage, `vehicles/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const updatedVehicle = {
        ...vehicleData,
        imageUrl: imageUrl,
        precio: Number(vehicleData.precio)
      };

      await updateDoc(doc(db, 'vehiculos', editingVehicle.id), updatedVehicle);
      await fetchVehicles();
      setEditingVehicle(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
      try {
        await deleteDoc(doc(db, 'vehiculos', vehicleId));
        await fetchVehicles();
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
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