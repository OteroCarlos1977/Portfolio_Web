import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const initialForm = {
  name: '',
  replyTo: '',
  subject: '',
  message: '',
};

const icons = {
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.31-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V8.98h3.42v1.57h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.28 2.38 4.28 5.47v6.28ZM5.32 7.42a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.03H3.54V8.98H7.1v11.47ZM22.23 0H1.76C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.76 24h20.47c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0Z"
      />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.52 3.49A11.87 11.87 0 0 0 12.08 0C5.5 0 .15 5.35.15 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a11.92 11.92 0 0 0 5.82 1.48h.01C18.65 23.84 24 18.49 24 11.91c0-3.18-1.24-6.18-3.48-8.42ZM12.08 21.82h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.7.97.99-3.61-.23-.37a9.86 9.86 0 0 1-1.52-5.29c0-5.47 4.45-9.92 9.93-9.92a9.86 9.86 0 0 1 7.01 2.91 9.86 9.86 0 0 1 2.9 7c0 5.47-4.45 9.91-9.97 9.91Zm5.45-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.13-.27-.2-.57-.35Z"
      />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285f4" d="M3 6.5v11A1.5 1.5 0 0 0 4.5 19H7V9.9L3 6.5Z" />
      <path fill="#34a853" d="M17 19h2.5A1.5 1.5 0 0 0 21 17.5v-11l-4 3.4V19Z" />
      <path fill="#fbbc04" d="M7 9.9V19h10V9.9l-5 4.25L7 9.9Z" />
      <path fill="#ea4335" d="M3 6.5 7 9.9l5 4.25 5-4.25 4-3.4V6a1.5 1.5 0 0 0-2.47-1.14L12 10.42 5.47 4.86A1.5 1.5 0 0 0 3 6Z" />
    </svg>
  ),
  cv: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#e53935" d="M6.5 2.75h7.25L18.5 7.5v13.75H6.5z" />
      <path fill="#ffcdd2" d="M13.75 2.75V7.5h4.75z" />
      <path
        fill="#ffffff"
        d="M8.45 12.2h1.65c1.04 0 1.72.62 1.72 1.56 0 .95-.68 1.58-1.72 1.58h-.67v1.46h-.98v-4.6Zm1.57 2.31c.5 0 .8-.27.8-.74 0-.46-.3-.72-.8-.72h-.59v1.46h.59Zm2.27-2.31h1.64c1.35 0 2.24.9 2.24 2.3 0 1.39-.89 2.3-2.24 2.3h-1.64v-4.6Zm1.55 3.72c.82 0 1.33-.54 1.33-1.42s-.51-1.42-1.33-1.42h-.57v2.84h.57Zm2.88-3.72h3.07v.88H17.7v1.05h1.82v.86H17.7v1.81h-.98v-4.6Z"
      />
    </svg>
  ),
};

const ContactAction = ({ href = '', label, icon, variant = '', onClick }) => {
  const className = `contact-action ${variant || ''}`.trim();

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
        <span className="contact-icon">{icon}</span>
        <span className="sr-only">{label}</span>
      </a>
    );
  }

  return (
    <button className={className} type="button" onClick={onClick} aria-label={label} title={label}>
      <span className="contact-icon">{icon}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
};

ContactAction.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func,
};

const Contact = ({ social }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const closeButtonRef = useRef(null);
  const email = `${social.emailUser}@${social.emailDomain}`;
  const endpoint = social.contactEndpoint;
  const whatsappUrl = social.whatsappPhone
    ? `https://wa.me/${social.whatsappPhone}?text=${encodeURIComponent(
        social.whatsappMessage || 'Hola Carlos, vi tu portfolio y me gustaria contactarte.'
      )}`
    : '';

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSent(false);
    setError('');
    setIsSending(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal, isOpen]);

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
        <ContactAction href={social.github} label="GitHub" icon={icons.github} variant="github" />
        <ContactAction href={social.linkedin} label="LinkedIn" icon={icons.linkedin} variant="linkedin" />
        {whatsappUrl && <ContactAction href={whatsappUrl} label="WhatsApp" icon={icons.whatsapp} variant="whatsapp" />}
        <ContactAction label="Enviar consulta por email" icon={icons.mail} variant="mail" onClick={() => setIsOpen(true)} />
        {social.resumeUrl && (
          <ContactAction href={social.resumeUrl} label="Descargar CV" icon={icons.cv} variant="cv" />
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
              <button
                className="modal-close"
                type="button"
                onClick={closeModal}
                aria-label="Cerrar formulario de contacto"
                ref={closeButtonRef}
              >
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
    whatsappPhone: PropTypes.string,
    whatsappMessage: PropTypes.string,
  }).isRequired,
};

export default Contact;
