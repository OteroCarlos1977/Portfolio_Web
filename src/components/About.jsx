import PropTypes from 'prop-types';

const About = ({ about }) => (
  <section className="section" id="about">
    <div className="section-header">
      <p className="eyebrow">Sobre mí</p>
      <h2>Desarrollo full stack + Big Data</h2>
    </div>
    <p className="section-text">{about}</p>
  </section>
);

About.propTypes = {
  about: PropTypes.string.isRequired,
};

export default About;
