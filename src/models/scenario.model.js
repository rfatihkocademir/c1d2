// src/models/scenario.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const Scenario = sequelize.define('Scenario', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  steps: {
    type: DataTypes.JSON,
    allowNull: false,
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
  tableName: 'scenarios',
});

module.exports = Scenario;
