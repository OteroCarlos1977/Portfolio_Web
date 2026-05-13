import PropTypes from 'prop-types';
import IconGlyph from './IconGlyph';

const AppliedAI = ({ appliedAI }) => (
  <section className="section ai-section" id="applied-ai">
    <div className="section-header">
      <p className="eyebrow">IA aplicada</p>
      <h2>{appliedAI.title}</h2>
      <p className="section-text">{appliedAI.description}</p>
    </div>
    <div className="ai-grid">
      {appliedAI.items.map((item) => (
        <article className="ai-card" key={item.title}>
          <span className="ai-icon" aria-hidden="true">
            <IconGlyph name={item.icon} />
          </span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

AppliedAI.propTypes = {
  appliedAI: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default AppliedAI;
