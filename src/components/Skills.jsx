import PropTypes from 'prop-types';

const Skills = ({ skills }) => (
  <section className="section" id="skills">
    <div className="section-header">
      <p className="eyebrow">Tecnologías</p>
      <h2>Lo que uso para crear impacto</h2>
    </div>
    <div className="skills-grid">
      {Object.entries(skills).map(([category, items]) => (
        <div className="card" key={category}>
          <h3>{category}</h3>
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

Skills.propTypes = {
  skills: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default Skills;
