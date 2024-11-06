// src/api/scenarioApi.js
import axios from 'axios';

export const createScenario = async (scenarioData) => {
  const response = await axios.post('/api/scenarios', scenarioData);
  return response.data;
};

export const getAllScenarios = async () => {
  const response = await axios.get('/api/scenarios');
  return response.data;
};

export const getScenarioById = async (scenarioId) => {
  const response = await axios.get(`/api/scenarios/${scenarioId}`);
  return response.data;
};

export const updateScenario = async (scenarioId, scenarioData) => {
  const response = await axios.put(`/api/scenarios/${scenarioId}`, scenarioData);
  return response.data;
};

export const deleteScenario = async (scenarioId) => {
  const response = await axios.delete(`/api/scenarios/${scenarioId}`);
  return response.data;
};

export const runScenario = async (scenarioId) => {
  const response = await axios.post(`/api/scenarios/${scenarioId}/run`);
  return response.data;
};
