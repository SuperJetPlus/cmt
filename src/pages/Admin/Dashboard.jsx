import React from 'react';
import InventoryManager from './InventoryManager';

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <InventoryManager />
    </div>
  );
};

export default Dashboard;
