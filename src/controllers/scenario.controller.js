// src/controllers/scenario.controller.js

const scenarioService = require('../services/scenario.service');

// Create Scenario
const createScenario = async (req, res) => {
  try {
    const scenario = await scenarioService.createScenario({ ...req.body, userId: req.user.id });
    res.status(201).json(scenario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Scenarios for a User
const getAllScenarios = async (req, res) => {
  try {
    const scenarios = await scenarioService.getAllScenarios(req.user.id);
    res.status(200).json(scenarios);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Scenario by ID
const getScenarioById = async (req, res) => {
  try {
    const scenario = await scenarioService.getScenarioById(req.params.id, req.user.id);
    res.status(200).json(scenario);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update Scenario
const updateScenario = async (req, res) => {
  try {
    const updatedScenario = await scenarioService.updateScenario(req.params.id, req.user.id, req.body);
    res.status(200).json(updatedScenario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Scenario
const deleteScenario = async (req, res) => {
  try {
    const deletedScenario = await scenarioService.deleteScenario(req.params.id, req.user.id);
    res.status(200).json(deletedScenario);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createScenario,
  getAllScenarios,
  getScenarioById,
  updateScenario,
  deleteScenario,
};
