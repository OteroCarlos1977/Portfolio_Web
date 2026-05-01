import PropTypes from 'prop-types';

const Hero = ({ name, title, tagline, location, avatarUrl }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div>
          <div className="badge">{location}</div>
          <h1>{name}</h1>
          <p className="title">{title}</p>
          <p className="tagline">{tagline}</p>
          <div className="cta">
            <button className="btn primary" onClick={() => scrollToSection('projects')}>
              Ver proyectos
            </button>
            <button className="btn ghost" onClick={() => scrollToSection('contact')}>
              Contactar
            </button>
          </div>
        </div>
        <img className="avatar" src={avatarUrl} alt={`Foto de ${name}`} />
      </div>
    </section>
  );
};

Hero.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default Hero;
