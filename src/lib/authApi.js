import axios from 'axios';
import { useRouter } from "next/navigation";
import { useUser } from '@/context/UserContext';
import { tokenManager, isTokenExpired } from './tokenManager';
import { useMemo } from 'react';

export function useAuth() {
  const router = useRouter();
  const { setUser } = useUser();

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh-token`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      setUser(null);
      router.push("/?redirected=true");
      throw error;
    }
  };

  const api = useMemo(() => {
    const apiInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      withCredentials: true,
    });

    apiInstance.interceptors.request.use(
      async (config) => {
        let token = tokenManager.getToken();

        if (token && isTokenExpired(token)) {
          try {
            const newAccessToken = await refreshAccessToken();
            tokenManager.setToken(newAccessToken);
            token = newAccessToken;
          } catch (error) {
            console.error('Token refresh failed:', error);
            throw error;
          }
        }

        if (token) {
          config.headers['Authorization'] = `${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    return apiInstance;
  }, [refreshAccessToken]);

  return { api };
}
