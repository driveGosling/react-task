import React, { useEffect, useState } from 'react';
import { useVehicleStore } from './store/vehicleStore';
import VehicleList from './components/VehicleList/VehicleList';
import VehicleForm from './components/VehicleForm/VehicleForm';
import { Vehicle } from './types';
import './App.css';

const App: React.FC = () => {
  const {
    loading,
    error,
    sortField,
    sortOrder,
    fetchVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    setSort,
    getSortedVehicles
  } = useVehicleStore();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const sortedVehicles = getSortedVehicles();

  const handleCreateVehicle = async (data: Vehicle) => {
    await createVehicle(data);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Loading vehicles...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Управление транспортом</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Добавить новый транспорт
        </button>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <VehicleForm
              mode="create"
              onSubmit={handleCreateVehicle}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <main className="app-main">
        <section className="list-section">
          <h2>Список транспортных средств</h2>
          <VehicleList
            vehicles={sortedVehicles}
            onUpdateVehicle={updateVehicle}
            onDeleteVehicle={deleteVehicle}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={setSort}
          />
        </section>
      </main>
    </div>
  );
};

export default App;