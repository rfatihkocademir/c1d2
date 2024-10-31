// src/models/index.js

const sequelize = require('../config/database');
const User = require('./user.model');
const Scenario = require('./scenario.model');
const Run = require('./run.model');

// Define associations
User.hasMany(Scenario, { foreignKey: 'userId' });
Scenario.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Run, { foreignKey: 'userId' });
Run.belongsTo(User, { foreignKey: 'userId' });

Scenario.hasMany(Run, { foreignKey: 'scenarioId' });
Run.belongsTo(Scenario, { foreignKey: 'scenarioId' });

// Synchronize models with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
};

syncDatabase();

module.exports = {
  User,
  Scenario,
  Run,
};
