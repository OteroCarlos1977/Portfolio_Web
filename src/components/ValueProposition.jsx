import PropTypes from 'prop-types';
import IconGlyph from './IconGlyph';

const ValueProposition = ({ items, dataFocus }) => (
  <section className="section value-section" id="value">
    <div className="section-header">
      <p className="eyebrow">Qué puedo aportar</p>
      <h2>Desarrollo orientado a soluciones reales</h2>
    </div>
    <div className="value-grid">
      {items.map((item) => (
        <article className="value-card" key={item.title}>
          <span className="value-index" aria-hidden="true">
            <IconGlyph name={item.icon} />
          </span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
    <div className="data-focus">
      <div>
        <p className="eyebrow">Big Data y análisis</p>
        <h3>{dataFocus.title}</h3>
      </div>
      <p>{dataFocus.description}</p>
    </div>
  </section>
);

ValueProposition.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  dataFocus: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ValueProposition;
