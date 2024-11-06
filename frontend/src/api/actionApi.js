// src/api/actionApi.js
import axios from 'axios';

export const addActionToScenario = async (scenarioId, actionData) => {
  const response = await axios.post(`/api/scenarios/${scenarioId}/actions`, actionData);
  return response.data;
};

export const updateAction = async (actionId, actionData) => {
  const response = await axios.put(`/api/actions/${actionId}`, actionData);
  return response.data;
};

export const deleteAction = async (actionId) => {
  const response = await axios.delete(`/api/actions/${actionId}`);
  return response.data;
};
