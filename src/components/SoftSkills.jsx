import PropTypes from 'prop-types';

const SoftSkills = ({ skills }) => (
  <section className="section soft-skills-section" id="soft-skills">
    <div className="section-header">
      <p className="eyebrow">Habilidades blandas</p>
      <h2>Forma de trabajo</h2>
    </div>
    <div className="soft-skills-grid">
      {skills.map((skill) => (
        <article className="soft-skill-card" key={skill.title}>
          <span className="soft-skill-icon" aria-hidden="true">
            {skill.icon}
          </span>
          <div>
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

SoftSkills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SoftSkills;
