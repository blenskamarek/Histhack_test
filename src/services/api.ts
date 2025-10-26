import axios from 'axios';
import { API_URL } from '@/config/env';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const fetchStatus = async () => {
  const response = await apiClient.get('/status');
  return response.data;
};
