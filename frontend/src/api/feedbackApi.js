// src/api/feedbackApi.js
import axios from 'axios';

export const submitFeedback = async (feedbackData) => {
  const response = await axios.post('/api/feedback', feedbackData);
  return response.data;
};

export const getAllFeedback = async () => {
  const response = await axios.get('/api/feedback');
  return response.data;
};