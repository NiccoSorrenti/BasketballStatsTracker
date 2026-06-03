import api from './api';
import axios from "axios";

// LOGIN
// export const login = async (credentials) => {
//   const response = await api.post('/auth/login', credentials);

//   const token = response.data.token;

//   localStorage.setItem('token', token);

//   return response.data;
// };
export const login = (credentials) => {
  return axios.post("http://localhost:8080/auth/login", credentials);
};

// REGISTER
export const register = async (data) => {
  const response = await api.post('/auth/register', data);

  return response.data;
};

// GET CURRENT USER (/me)
export const getMe = async () => {
  const response = await api.get('/users/me');

  return response.data;
};