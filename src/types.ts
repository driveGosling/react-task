export interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

export interface UpdateVehicleData {
  name?: string;
  price?: number;
}

export type SortField = 'year' | 'price' | 'none';
export type SortOrder = 'asc' | 'desc';