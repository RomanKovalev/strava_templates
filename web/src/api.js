import axios from 'axios';

const apiUrl = import.meta.env.BACKEND_API_URL;

console.log("apiUrl: ", apiUrl);

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});


export default api;
