import React from 'react';
import './HeroBanner.css';

const HeroBanner = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <a href={ctaLink} className="hero-cta">
          {ctaText}
        </a>
      </div>
    </div>
  );
};

export default HeroBanner;
