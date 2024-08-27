"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { refreshAccessToken } from '@/lib/auth';
import { tokenManager } from '@/lib/tokenManager';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      tokenManager.setToken(JSON.parse(storedUser).token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      tokenManager.setToken(user.token);
    } else {
      localStorage.removeItem('user');
      tokenManager.clearToken();
    }
  }, [user]);

  const handleTokenRefresh = async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      setUser((prevUser) => ({ ...prevUser, token: newAccessToken }));
      tokenManager.setToken(newAccessToken);
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      setUser(null);
      tokenManager.clearToken();
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleTokenRefresh }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
