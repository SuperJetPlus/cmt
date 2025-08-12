import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminRoute from '../../components/admin/AdminRoute';
import InventoryManager from './InventoryManager';
import './Dashboard.css';

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-title">Panel Admin</h2>
        <nav>
          <ul>
            <li>
              <Link
                to="/admin/inventory"
                className={location.pathname === '/admin/inventory' ? 'active' : ''}
              >
                Gestor de Inventario
              </Link>

            </li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <Routes>
          <Route
            path="inventory"
            element={
              <AdminRoute>
                <InventoryManager />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
