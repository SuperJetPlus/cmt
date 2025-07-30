import React, { useEffect, useState } from 'react';
import { promotions as initialPromos } from '../../data/promoData';
import './PromoSection.css';

const PromoSection = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const startTimes = Date.now();
    const interval = setInterval(() => {
      setPromotions(
        initialPromos.map((promo) => {
          if (!promo.duration) return { ...promo, timeLeft: 'Siempre disponible' };

          const elapsed = Math.floor((Date.now() - startTimes) / 1000);
          const remaining = promo.duration - elapsed;

          const hours = String(Math.floor(remaining / 3600)).padStart(2, '0');
          const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
          const seconds = String(remaining % 60).padStart(2, '0');

          return {
            ...promo,
            timeLeft: remaining > 0 ? `${hours}:${minutes}:${seconds}` : 'Finalizado'
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="promo-section">
      <div className="container">
        <div className="promo-grid">
          {promotions.map((promo) => (
            <div key={promo.id} className="promo-card">
              <div className="promo-header">
                {promo.icon}
                <h3>{promo.title}</h3>
              </div>
              <p className="promo-description">{promo.description}</p>
              <div className="promo-timer">
                <span className="time-label">Termina en:</span>
                <span className="time-value">{promo.timeLeft}</span>
              </div>
              <div className="promo-code-container">
                <span className="promo-code-label">Usa el código:</span>
                <span className="promo-code">{promo.promoCode}</span>
              </div>
              <button className="promo-button" aria-label={`Aplicar código ${promo.promoCode}`}>
                Aplicar Oferta
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
