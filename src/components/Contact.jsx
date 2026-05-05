import PropTypes from 'prop-types';

const Contact = ({ social }) => {
  const email = `${social.emailUser}@${social.emailDomain}`;

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
        <button className="btn secondary" type="button" onClick={() => window.location.assign(`mailto:${email}`)}>
          Enviar email
        </button>
      </div>
    </section>
  );
};

Contact.propTypes = {
  social: PropTypes.shape({
    github: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    emailUser: PropTypes.string.isRequired,
    emailDomain: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;
