import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import '../Contact.css';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await resetPassword(email);
      setMessage('📧 Revisa tu correo para restablecer la contraseña.');
    } catch (err) {
      setError('❌ Error al enviar el correo. Verifica tu email.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Restablecer contraseña</h2>
      <p>Ingresa tu correo electrónico para recibir un enlace de recuperación.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          placeholder="tucorreo@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar enlace</button>
      </form>

      {message && <p className="auth-success">{message}</p>}
      {error && <p className="auth-error">{error}</p>}

      <div style={{ marginTop: '1rem' }}>
        <Link to="/login">Volver al inicio de sesión</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
