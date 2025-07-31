import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import './Account.css';

const Account = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setFullName(currentUser.fullName || '');
    setDni(currentUser.dni || '');
    setPhone(currentUser.phone || '');
  }, [currentUser, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { fullName, dni, phone });
      setStatus('✅ Datos actualizados correctamente');
    } catch (error) {
      setStatus('❌ Error al actualizar los datos');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!currentUser) return null;

  return (
    <div className="account-page">
      <div className="container">
        <h2 className="account-header">Mi cuenta</h2>

        <div className="account-info">
          <h3>Información personal</h3>
          <form onSubmit={handleSave}>
            <div>
              <label htmlFor="fullName">Nombre completo</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. Juan Pérez"
              />
            </div>

            <div>
              <label htmlFor="dni">DNI</label>
              <input
                type="text"
                id="dni"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ej. 12345678"
              />
            </div>

            <div>
              <label htmlFor="phone">Celular</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej. 987654321"
              />
            </div>

            <div>
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={currentUser.email}
                disabled
              />
            </div>

            <div className="account-actions">
              <button type="submit" className="account-btn primary">
                Guardar cambios
              </button>
              <button type="button" className="account-btn secondary" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>

            {status && <p className="status-message">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
