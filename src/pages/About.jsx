import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>Sobre Nosotros</h1>
        <p>Conectando productos de calidad con personas increíbles.</p>
      </div>

      <section className="about-section">
        <h2>Nuestra Historia</h2>
        <p>
          Fundada en Chincha, Perú, CMT del Sur S.A.C. nació con el propósito de transformar el talento local en confecciones de calidad internacional. Desde nuestros inicios, hemos apostado por la capacitación constante, la inclusión de tecnología de punta y el trabajo colaborativo con artesanos y técnicos de la región. A lo largo de los años, hemos crecido junto a nuestra comunidad, generando empleo formal, fortaleciendo el ecosistema textil y posicionando a Chincha como un referente de confección en el país. Nuestra trayectoria está marcada por la innovación, el compromiso con la sostenibilidad y una profunda pasión por la excelencia que se refleja en cada prenda que producimos.
        </p>
      </section>

      <section className="about-section">
        <h2>Qué Hacemos</h2>
        <p>
          Nos especializamos en la fabricación de prendas de vestir de alto estándar, con énfasis en ropa deportiva, casual y de moda, diseñadas para satisfacer las exigencias del mercado actual. Cada etapa de producción incorpora tecnología de última generación, estrictos controles de calidad y un compromiso constante con prácticas sostenibles. Gracias a la experiencia de nuestro equipo y a una infraestructura eficiente, logramos elaborar productos que combinan estilo, comodidad y durabilidad. Atendemos tanto al mercado nacional como al internacional, estableciendo alianzas con marcas reconocidas que confían en nuestra capacidad para llevar el sello peruano con orgullo y prestigio a nivel global.        </p>
      </section>

      <section className="about-section">
        <h2>Nuestra Misión</h2>
        <p>
          Elevar la confección peruana hacia nuevos horizontes, generando empleo digno, cuidando el entorno, y fortaleciendo la economía local. Nos dedicamos a crear prendas que expresen identidad, comodidad y durabilidad, mientras tejemos relaciones justas y transparentes con nuestros clientes, colaboradores y proveedores.        </p>
      </section>

      <section className="about-section">
        <h2>Contacto</h2>
        <p>
          ¿Tienes alguna pregunta o sugerencia? Escríbenos a{' '}
          <a href="mailto:adm_mods@stayhome.li">adm_mods@stayhome.li</a> o llámanos al <strong>+51 (056) 272272</strong>.
        </p>
      </section>
    </div>
  );
};

export default About;
