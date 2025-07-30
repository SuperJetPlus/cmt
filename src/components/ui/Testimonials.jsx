import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Lucía Herrera",
      role: "Compradora frecuente",
      content: "La bufanda de lana que compré es de excelente calidad. Abriga mucho y se nota que está hecha a mano. ¡Volveré por más!",
      rating: 5,
      avatar: "/images/avatars/1.jpg"
    },
    {
      id: 2,
      name: "Pedro Ramírez",
      role: "Cliente verificado",
      content: "El poncho andino es precioso, los colores son vivos y auténticos. Lo recibí a tiempo y en perfectas condiciones.",
      rating: 5,
      avatar: "/images/avatars/2.jpg"
    },
    {
      id: 3,
      name: "Valeria Torres",
      role: "Fan de productos artesanales",
      content: "El mantel bordado que pedí superó mis expectativas. Se nota el trabajo artesanal y queda hermoso en mi comedor.",
      rating: 4,
      avatar: "/images/avatars/3.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);


  return (
    <section className="testimonials-section">
      <div className="container">
        <h2>Lo que dicen nuestros clientes</h2>

        <div className="testimonials-carousel">
          <button
            onClick={prevTestimonial}
            className="nav-button prev"
            aria-label="Testimonio anterior"
          >
            <FaChevronLeft />
          </button>

          {}
          <div className="testimonial-card active">
            <div className="quote-icon">
              <FaQuoteLeft />
            </div>
            <p className="testimonial-content">
              {testimonials[currentIndex].content}
            </p>
            <div className="testimonial-author">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="author-avatar"
              />
              <div className="author-info">
                <h4>{testimonials[currentIndex].name}</h4>
                <p>{testimonials[currentIndex].role}</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < testimonials[currentIndex].rating ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={nextTestimonial}
            className="nav-button next"
            aria-label="Siguiente testimonio"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
