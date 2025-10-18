import React, { useState } from 'react';
import { Vehicle, SortField, SortOrder } from '../../types';
import VehicleForm from '../VehicleForm/VehicleForm';
import './VehicleList.css';

interface VehicleListProps {
  vehicles: Vehicle[];
  onUpdateVehicle: (id: number, data: { name?: string; price?: number }) => void;
  onDeleteVehicle: (id: number) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField, order: SortOrder) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  onUpdateVehicle,
  onDeleteVehicle,
  sortField,
  sortOrder,
  onSort
}) => {
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const handleSort = (field: SortField) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(field, newOrder);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
  };

  const handleUpdate = (data: { name?: string; price?: number }) => {
    if (editingVehicle) {
      onUpdateVehicle(editingVehicle.id, data);
      setEditingVehicle(null);
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  if (editingVehicle) {
    return (
      <VehicleForm
        mode="edit"
        onSubmit={handleUpdate}
        onCancel={() => setEditingVehicle(null)}
        initialData={editingVehicle}
      />
    );
  }

  return (
    <div className="vehicle-list">
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Модель</th>
            <th>
              <button
                onClick={() => handleSort('year')}
                className="sort-button"
              >
                Год {getSortIcon('year')}
              </button>
            </th>
            <th>
              <button
                onClick={() => handleSort('price')}
                className="sort-button"
              >
                Цена {getSortIcon('price')}
              </button>
            </th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.id}>
              <td>{vehicle.name}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>${vehicle.price.toLocaleString()}</td>
              <td>
                <button
                  onClick={() => handleEdit(vehicle)}
                  className="btn-edit"
                >
                  Изменить
                </button>
                <button
                  onClick={() => onDeleteVehicle(vehicle.id)}
                  className="btn-delete"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;