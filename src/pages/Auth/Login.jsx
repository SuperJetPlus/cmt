import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../Contact.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      await login(email, password);
      setStatus('✅ Sesión iniciada correctamente');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setStatus('❌ Error al iniciar sesión');
    }

    setLoading(false);
  };

  return (
    <div className="contact-form">
      <span className="heading">Iniciar Sesión</span>
      <p>Ingresa tus credenciales para acceder a tu cuenta.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@ejemplo.com"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Tu contraseña"
        />

        <div style={{ textAlign: 'right', marginTop: '-0.5rem', marginBottom: '1rem' }}>
          <Link to="/forgot-password" style={{ fontSize: '0.9rem' }}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>

        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
};

export default Login;
