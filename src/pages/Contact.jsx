import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('tu_service_id', 'tu_template_id', form.current, 'tu_public_key')
      .then(() => {
        setStatus('✅ Mensaje enviado con éxito');
        form.current.reset();
      })
      .catch(() => {
        setStatus('❌ Hubo un error al enviar el mensaje');
      });
  };

  return (
    <div className="contact-form">
      <span className="heading">Contáctanos</span>
      <p>¿Tienes dudas o sugerencias? Envíanos un mensaje.</p>

      <form ref={form} onSubmit={sendEmail}>
        <label htmlFor="user_email">Tu correo</label>
        <input
          type="email"
          name="user_email"
          id="user_email"
          required
          placeholder="tucorreo@ejemplo.com"
        />

        <label htmlFor="subject">Asunto</label>
        <input
          type="text"
          name="subject"
          id="subject"
          required
          placeholder="Motivo del mensaje"
        />

        <label htmlFor="message">Mensaje</label>
        <textarea
          name="message"
          id="message"
          rows="6"
          required
          placeholder="Escribe tu mensaje aquí..."
        />

        <button type="submit">Enviar</button>

        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
};

export default Contact;
