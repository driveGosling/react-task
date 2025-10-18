import React, { useState } from 'react';
import { UpdateVehicleData, Vehicle } from '../../types';
import './VehicleForm.css';

type BaseFormProps = {
  onCancel: () => void;
};

type CreateFormProps = BaseFormProps & {
  mode: 'create';
  onSubmit: (data: Vehicle) => void;
  initialData?: Partial<Vehicle>;
};

type EditFormProps = BaseFormProps & {
  mode: 'edit';
  onSubmit: (data: UpdateVehicleData) => void;
  initialData: Partial<Vehicle>;
};

type VehicleFormProps = CreateFormProps | EditFormProps;

const VehicleForm: React.FC<VehicleFormProps> = (props) => {
  const { mode, onSubmit, onCancel, initialData = {} } = props;

  const [formData, setFormData] = useState({
    name: initialData.name || '',
    model: initialData.model || '',
    year: initialData.year || new Date().getFullYear(),
    color: initialData.color || '#000000',
    price: initialData.price || 0,
    latitude: initialData.latitude || 55.753332,
    longitude: initialData.longitude || 37.621676
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'edit') {
      const updateData: UpdateVehicleData = {
        ...(formData.name !== initialData.name && { name: formData.name }),
        ...(formData.price !== initialData.price && { price: formData.price })
      };

      if (Object.keys(updateData).length > 0) {
        onSubmit(updateData);
      } else {
        onCancel();
      }
    } else {
      onSubmit(formData as Vehicle);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const isEdit = mode === 'edit';

  return (
    <form onSubmit={handleSubmit} className="vehicle-form">
      <h3>{isEdit ? 'Редактирование транспорта' : 'Добавление транспорта'}</h3>

      <div className="form-group">
        <label>Имя:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required={!isEdit}
        />
      </div>

      {!isEdit && (
        <>
          <div className="form-group">
            <label>Модель:</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Год:</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1900"
              max="2030"
              required
            />
          </div>

          <div className="form-group">
            <label>Цвет:</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Широта:</label>
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              step="any"
              required
            />
          </div>

          <div className="form-group">
            <label>Долгота:</label>
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              step="any"
              required
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label>Цена:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required={!isEdit}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {isEdit ? 'Изменить' : 'Добавить'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Отмена
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;