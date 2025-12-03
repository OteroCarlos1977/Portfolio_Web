import PropTypes from 'prop-types';

const Hero = ({ name, title, tagline, location }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
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
    </section>
  );
};

Hero.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default Hero;
