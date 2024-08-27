import axios from 'axios';
import { tokenManager, isTokenExpired } from './tokenManager';
import { refreshAccessToken } from './auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    let token = tokenManager.getToken();

    if (token && isTokenExpired(token)) {
      try {
        const newAccessToken = await refreshAccessToken();
        tokenManager.setToken(newAccessToken);
        token = newAccessToken;
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    }

    if (token) {
      config.headers['Authorization'] = `${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
