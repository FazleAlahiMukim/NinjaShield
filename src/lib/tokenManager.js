import { jwtDecode } from 'jwt-decode';

let token = null;

export const tokenManager = {
  setToken: (newToken) => {
    token = newToken;
    localStorage.setItem('token', newToken);
  },
  getToken: () => {
    if (!token) {
      token = localStorage.getItem('token');
    }
    return token;
  },
  clearToken: () => {
    token = null;
    localStorage.removeItem('token');
  },
};

export function isTokenExpired(token) {
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp < currentTime;
}
