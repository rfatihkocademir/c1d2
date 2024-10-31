// src/controllers/run.controller.js

const runService = require('../services/run.service');

// Start a New Run
const startRun = async (req, res) => {
  try {
    const run = await runService.startRun(req.body.scenarioId, req.user.id, req.body.runParameters);
    res.status(201).json(run);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Runs for a User
const getAllRuns = async (req, res) => {
  try {
    const runs = await runService.getAllRuns(req.user.id);
    res.status(200).json(runs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Run by ID
const getRunById = async (req, res) => {
  try {
    const run = await runService.getRunById(req.params.id, req.user.id);
    res.status(200).json(run);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Stop a Run
const stopRun = async (req, res) => {
  try {
    const stoppedRun = await runService.stopRun(req.params.id, req.user.id);
    res.status(200).json(stoppedRun);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Run
const deleteRun = async (req, res) => {
  try {
    const deletedRun = await runService.deleteRun(req.params.id, req.user.id);
    res.status(200).json(deletedRun);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  startRun,
  getAllRuns,
  getRunById,
  stopRun,
  deleteRun,
};
