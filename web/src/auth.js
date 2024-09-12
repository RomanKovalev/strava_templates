import api from './api';
import Cookies from 'js-cookie';

export const login = async (username, password) => {
  const response = await api.post('token/', { username, password });
  const { access, refresh } = response.data;

  Cookies.set('access_token', access);
  Cookies.set('refresh_token', refresh);
  return response.data;
};

export const refreshToken = async () => {
  const refresh = Cookies.get('refresh_token');
  const response = await api.post('token/refresh/', { refresh });
  const { access } = response.data;

  Cookies.set('access_token', access);

  return access;
};
