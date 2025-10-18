import axios from 'axios';
import { Vehicle } from './types';

const API_URL = 'https://ofc-test-01.tspb.su/test-task/vehicles';

export const getVehicles = async (): Promise<Vehicle[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};