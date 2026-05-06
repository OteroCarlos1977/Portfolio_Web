import { useState } from 'react';
import PropTypes from 'prop-types';

const initialForm = {
  name: '',
  replyTo: '',
  subject: '',
  message: '',
};

const Contact = ({ social }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const email = `${social.emailUser}@${social.emailDomain}`;
  const endpoint = social.contactEndpoint;

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const closeModal = () => {
    setIsOpen(false);
    setSent(false);
    setError('');
    setIsSending(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!endpoint) {
      setError('El formulario está casi listo. Falta configurar el endpoint seguro de envío.');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.replyTo,
          subject: form.subject || 'Consulta desde portfolio',
          message: form.message,
          _replyto: form.replyTo,
          _subject: form.subject || 'Consulta desde portfolio',
          destination: email,
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar la consulta.');
      }

      setSent(true);
      setForm(initialForm);
    } catch (submitError) {
      setError('No pude enviar tu consulta en este momento. Intentá nuevamente en unos minutos.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="section-header">
        <p className="eyebrow">Contacto</p>
        <h2>¿Construimos algo con impacto?</h2>
      </div>
      <div className="contact-grid">
        <a className="btn primary" href={social.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="btn ghost" href={social.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <button className="btn secondary" type="button" onClick={() => setIsOpen(true)}>
          Enviar consulta
        </button>
        {social.resumeUrl && (
          <a className="btn ghost" href={social.resumeUrl} target="_blank" rel="noreferrer">
            Descargar CV
          </a>
        )}
      </div>

      {isOpen && (
        <div className="contact-modal" role="dialog" aria-modal="true" aria-label="Formulario de contacto" onClick={closeModal}>
          <div className="contact-modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="project-modal-header">
              <div>
                <p className="eyebrow">Contacto directo</p>
                <h3>Contame qué necesitás construir</h3>
              </div>
              <button className="modal-close" type="button" onClick={closeModal} aria-label="Cerrar formulario de contacto">
                x
              </button>
            </div>

            {sent ? (
              <div className="contact-success" role="status">
                <h4>Recibí tu consulta.</h4>
                <p>
                  A la brevedad me estaré contactando con vos para conocer mejor tu necesidad y ayudarte a construir
                  una solución clara, cercana y funcional.
                </p>
                <button className="btn primary" type="button" onClick={closeModal}>
                  Cerrar
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="contact-name">Nombre</label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  placeholder="Tu nombre"
                  required
                />

                <label htmlFor="contact-reply">Email de contacto</label>
                <input
                  id="contact-reply"
                  type="email"
                  value={form.replyTo}
                  onChange={(event) => updateField('replyTo', event.target.value)}
                  placeholder="tu@email.com"
                  required
                />

                <label htmlFor="contact-subject">Asunto</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(event) => updateField('subject', event.target.value)}
                  placeholder="Desarrollo web, portfolio, sistema interno..."
                />

                <label htmlFor="contact-message">Mensaje</label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  placeholder="Contame brevemente qué necesitás resolver."
                  required
                />

                {error && <p className="error">{error}</p>}

                <button className="btn primary" type="submit" disabled={isSending}>
                  {isSending ? 'Enviando...' : 'Enviar consulta'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

Contact.propTypes = {
  social: PropTypes.shape({
    github: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    emailUser: PropTypes.string.isRequired,
    emailDomain: PropTypes.string.isRequired,
    contactEndpoint: PropTypes.string,
    resumeUrl: PropTypes.string,
  }).isRequired,
};

export default Contact;
