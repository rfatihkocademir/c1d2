// src/services/scenario.service.js

const Scenario = require('../models/scenario.model');

// Create Scenario
const createScenario = async (scenarioData) => {
  const { name, steps, userId } = scenarioData;

  // Create new scenario
  const newScenario = new Scenario({
    name,
    steps,
    userId,
  });

  await newScenario.save();
  return newScenario;
};

// Get All Scenarios for a User
const getAllScenarios = async (userId) => {
  const scenarios = await Scenario.find({ userId });
  return scenarios;
};

// Get Scenario by ID
const getScenarioById = async (scenarioId, userId) => {
  const scenario = await Scenario.findOne({ _id: scenarioId, userId });
  if (!scenario) {
    throw new Error('Scenario not found.');
  }
  return scenario;
};

// Update Scenario
const updateScenario = async (scenarioId, userId, updateData) => {
  const { name, steps } = updateData;
  const updateFields = {};

  if (name) updateFields.name = name;
  if (steps) updateFields.steps = steps;

  const updatedScenario = await Scenario.findOneAndUpdate(
    { _id: scenarioId, userId },
    updateFields,
    { new: true, runValidators: true }
  );

  if (!updatedScenario) {
    throw new Error('Scenario not found.');
  }

  return updatedScenario;
};

// Delete Scenario
const deleteScenario = async (scenarioId, userId) => {
  const deletedScenario = await Scenario.findOneAndDelete({ _id: scenarioId, userId });
  if (!deletedScenario) {
    throw new Error('Scenario not found.');
  }
  return deletedScenario;
};

module.exports = {
  createScenario,
  getAllScenarios,
  getScenarioById,
  updateScenario,
  deleteScenario,
};
