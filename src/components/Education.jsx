import PropTypes from 'prop-types';

const Education = ({ education }) => (
  <section className="section education-section" id="education">
    <div className="section-header">
      <p className="eyebrow">Formación</p>
      <h2>Formación técnica y profesional</h2>
    </div>
    <div className="education-grid">
      {education.map((item) => (
        <article className="education-card" key={`${item.title}-${item.institution}`}>
          <div>
            <p className="education-type">{item.type}</p>
            <h3>{item.title}</h3>
          </div>
          <p className="education-institution">{item.institution}</p>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  </section>
);

Education.propTypes = {
  education: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      institution: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Education;
