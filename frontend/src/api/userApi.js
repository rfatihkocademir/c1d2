// src/api/userApi.js
import axios from 'axios';

export const registerUser = async (userData) => {
  const response = await axios.post('/api/users/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post('/api/users/login', credentials);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axios.get('/api/users/profile');
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await axios.put('/api/users/profile', profileData);
  return response.data;
};