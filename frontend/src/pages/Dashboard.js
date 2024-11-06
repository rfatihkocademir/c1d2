// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getAllScenarios } from '../api/scenarioApi';
import Table from '../components/Table';

const Dashboard = () => {
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const data = await getAllScenarios();
        setScenarios(data);
      } catch (error) {
        console.error('Failed to fetch scenarios:', error);
      }
    };

    fetchScenarios();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <Table headers={['Name', 'Description', 'Created At']} data={scenarios} />
    </div>
  );
};

export default Dashboard;