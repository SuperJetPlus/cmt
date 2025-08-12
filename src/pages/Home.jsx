import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedProducts from '../components/products/FeaturedProducts';
import HeroBanner from '../components/ui/HeroBanner';
import PromoSection from '../components/ui/PromoSection';
import Testimonials from '../components/ui/Testimonials';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <HeroBanner 
        title="Bienvenido a Textil CMT"
        subtitle="CMT del Sur S.A.C. ofrece soluciones textiles que combinan estilo, durabilidad y tecnología, posicionándose como una empresa líder en confección dentro del mercado nacional e internacional."
        ctaText="Explorar Productos"
        ctaLink="/products"
      />
      
      <section className="featured-section">
        <div className="container">
          <h2>Productos Destacados</h2>
          <FeaturedProducts />
          <div className="text-center mt-8">
            <Link to="/products" className="view-all-btn">
              Ver todos los productos →
            </Link>
          </div>
        </div>
      </section>

      <PromoSection 
        title="Ofertas Especiales"
        description="Aprovecha nuestras promociones por tiempo limitado"
      />

      <Testimonials />

      <section className="final-cta">
        <div className="container">
          <h3>¿Listo para descubrir más?</h3>
          <div className="cta-buttons">
            <Link to="/products" className="cta-btn primary">
              Comprar Ahora
            </Link>
            <Link to="/about" className="cta-btn secondary">
              Conócenos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
