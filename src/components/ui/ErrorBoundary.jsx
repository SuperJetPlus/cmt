import React, { Component } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Button from '../ui/Button';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    // Aquí puedes integrar con un servicio de logging como Sentry
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null 
    });
    // Opcional: Recargar la aplicación o navegar a la página principal
    // window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">
              <FaExclamationTriangle />
            </div>
            <h1>Algo salió mal</h1>
            <p className="error-message">
              Lo sentimos, encontramos un problema inesperado.
            </p>
            
            {this.props.showDetails && (
              <div className="technical-details">
                <details>
                  <summary>Detalles técnicos</summary>
                  <p className="error-detail">
                    {this.state.error && this.state.error.toString()}
                  </p>
                  <pre className="error-stack">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              </div>
            )}

            <div className="error-actions">
              <Button 
                onClick={this.handleReset}
                variant="primary"
              >
                Reintentar
              </Button>
              <Button 
                onClick={() => window.location.reload()}
                variant="secondary"
              >
                Recargar Página
              </Button>
              {this.props.contactSupport && (
                <Button 
                  onClick={() => window.location.href = "mailto:soporte@tienda.com"}
                  variant="outline"
                >
                  Contactar Soporte
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.defaultProps = {
  showDetails: process.env.NODE_ENV === 'development',
  contactSupport: true
};

export default ErrorBoundary;
