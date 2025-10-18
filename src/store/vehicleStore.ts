import { create } from 'zustand';
import { Vehicle, UpdateVehicleData, SortField, SortOrder } from '../types';
import { getVehicles } from '../api';

interface VehicleState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  sortField: SortField;
  sortOrder: SortOrder;

  fetchVehicles: () => Promise<void>;
  createVehicle: (data: Vehicle) => void;
  updateVehicle: (id: number, data: UpdateVehicleData) => void;
  deleteVehicle: (id: number) => void;
  setSort: (field: SortField, order: SortOrder) => void;
  getSortedVehicles: () => Vehicle[];
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: [],
  loading: false,
  error: null,
  sortField: 'none',
  sortOrder: 'asc',

  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const vehicles = await getVehicles();
      set({ vehicles, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch vehicles', loading: false });
    }
  },

  createVehicle: async (data: Vehicle) => {
    try {
      const newVehicle = {
        ...data,
        id: Date.now(),
      };
      set(state => ({
        vehicles: [...state.vehicles, newVehicle],
        error: null
      }));
    } catch (error) {
      set({ error: 'Failed to create vehicle' });
    }
  },

  updateVehicle: async (id: number, data: UpdateVehicleData) => {
    try {
      set(state => ({
        vehicles: state.vehicles.map(vehicle =>
          vehicle.id === id ? { ...vehicle, ...data } : vehicle
        ),
        error: null
      }));
    } catch (error) {
      set({ error: 'Failed to update vehicle' });
    }
  },

  deleteVehicle: async (id: number) => {
    try {
      set(state => ({
        vehicles: state.vehicles.filter(vehicle => vehicle.id !== id),
        error: null
      }));
    } catch (error) {
      set({ error: 'Failed to delete vehicle' });
    }
  },

  setSort: (field: SortField, order: SortOrder) => {
    set({ sortField: field, sortOrder: order });
  },

  getSortedVehicles: () => {
    const { vehicles, sortField, sortOrder } = get();

    if (sortField === 'none') return vehicles;

    return [...vehicles].sort((a, b) => {
      let comparison = 0;

      if (sortField === 'year') {
        comparison = a.year - b.year;
      } else if (sortField === 'price') {
        comparison = a.price - b.price;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }
}));