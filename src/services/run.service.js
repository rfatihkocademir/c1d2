// src/services/run.service.js

const Run = require('../models/run.model');
const Scenario = require('../models/scenario.model');

// Start a New Run
const startRun = async (scenarioId, userId, runParameters) => {
  // Validate scenario
  const scenario = await Scenario.findOne({ _id: scenarioId, userId });
  if (!scenario) {
    throw new Error('Scenario not found.');
  }

  // Create new run
  const newRun = new Run({
    scenarioId,
    userId,
    runParameters,
    status: 'in_progress',
    progress: 0,
  });

  await newRun.save();
  return newRun;
};

// Get All Runs for a User
const getAllRuns = async (userId) => {
  const runs = await Run.find({ userId });
  return runs;
};

// Get Run by ID
const getRunById = async (runId, userId) => {
  const run = await Run.findOne({ _id: runId, userId });
  if (!run) {
    throw new Error('Run not found.');
  }
  return run;
};

// Stop a Run
const stopRun = async (runId, userId) => {
  const run = await Run.findOneAndUpdate(
    { _id: runId, userId, status: 'in_progress' },
    { status: 'stopped', progress: 100 },
    { new: true }
  );

  if (!run) {
    throw new Error('Run not found or already completed.');
  }

  return run;
};

// Delete Run
const deleteRun = async (runId, userId) => {
  const deletedRun = await Run.findOneAndDelete({ _id: runId, userId });
  if (!deletedRun) {
    throw new Error('Run not found.');
  }
  return deletedRun;
};

module.exports = {
  startRun,
  getAllRuns,
  getRunById,
  stopRun,
  deleteRun,
};
