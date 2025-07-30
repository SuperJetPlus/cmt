import React from 'react';
import PromoSection from '../components/ui/PromoSection';
import './Offers.css';

const Offers = () => {
  return (
    <div className="offers-page">
      <div className="container">
        <h1 className="offers-title">Ofertas Especiales</h1>
        <p className="offers-subtitle">Aprovecha nuestras promociones por tiempo limitado</p>
      </div>
      
      {/* PromoSection ya tiene la lógica para mostrar las promociones */}
      <PromoSection />
    </div>
  );
};

export default Offers;
