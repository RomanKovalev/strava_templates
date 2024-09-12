import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

console.log('apiUrl11', apiUrl);

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
