import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../Contact.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    if (password !== confirmPassword) {
      return setStatus('❌ Las contraseñas no coinciden');
    }

    try {
      setLoading(true);

      const userData = {
        name: email.split('@')[0],
        email: email,
        role: 'user'
      };

      login(userData);
      setStatus('✅ Registro exitoso');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setStatus('❌ Error al registrarse');
    }

    setLoading(false);
  };

  return (
    <div className="contact-form">
      <span className="heading">Registrarse</span>
      <p>Crea una nueva cuenta para comenzar a comprar.</p>

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
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
        />

        <label htmlFor="confirm">Confirmar Contraseña</label>
        <input
          type="password"
          id="confirm"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Vuelve a escribir tu contraseña"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>

        {status && <p className="status-message">{status}</p>}
      </form>

      <div style={{ marginTop: '1rem', fontSize: '0.95rem' }}>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </div>
    </div>
  );
};

export default Register;
