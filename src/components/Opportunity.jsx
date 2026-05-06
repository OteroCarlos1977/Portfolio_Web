import PropTypes from 'prop-types';

const Opportunity = ({ opportunity }) => (
  <section className="section opportunity-section" id="opportunity">
    <div className="section-header">
      <p className="eyebrow">Búsqueda</p>
      <h2>{opportunity.title}</h2>
    </div>
    <p className="opportunity-description">{opportunity.description}</p>
    <div className="opportunity-tags" aria-label="Focos profesionales">
      {opportunity.focus.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  </section>
);

Opportunity.propTypes = {
  opportunity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    focus: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Opportunity;
