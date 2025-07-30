import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'medium',
  color = 'primary',
  fullPage = false,
  text = 'Cargando...'
}) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  const colorClasses = {
    primary: 'spinner-primary',
    secondary: 'spinner-secondary',
    accent: 'spinner-accent',
    white: 'spinner-white'
  };

  return (
    <div className={`loading-spinner-container ${fullPage ? 'full-page' : ''}`}>
      <div 
        className={`spinner ${sizeClasses[size]} ${colorClasses[color]}`}
        aria-label="Cargando"
      >
        <div className="spinner-sector spinner-sector-1"></div>
        <div className="spinner-sector spinner-sector-2"></div>
        <div className="spinner-sector spinner-sector-3"></div>
      </div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
