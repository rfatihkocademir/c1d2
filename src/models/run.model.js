// src/models/run.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Scenario = require('./scenario.model');
const User = require('./user.model');

const Run = sequelize.define('Run', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM('in_progress', 'completed', 'stopped'),
    defaultValue: 'in_progress',
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  runParameters: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  scenarioId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Scenario,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,
  tableName: 'runs',
});

module.exports = Run;
