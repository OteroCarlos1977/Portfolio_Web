import PropTypes from 'prop-types';

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  databases: 'Databases',
  data: 'Big Data',
  tools: 'Tools',
};

const skillIcons = {
  HTML: 'https://cdn.simpleicons.org/html5/E34F26',
  CSS: 'https://cdn.simpleicons.org/css/1572B6',
  JavaScript: 'https://cdn.simpleicons.org/javascript/F7DF1E',
  React: 'https://cdn.simpleicons.org/react/61DAFB',
  Vite: 'https://cdn.simpleicons.org/vite/646CFF',
  Bootstrap: 'https://cdn.simpleicons.org/bootstrap/7952B3',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
  Express: 'https://cdn.simpleicons.org/express/FFFFFF',
  JWT: 'https://cdn.simpleicons.org/jsonwebtokens/FFFFFF',
  MySQL: 'https://cdn.simpleicons.org/mysql/4479A1',
  SQLite: 'https://cdn.simpleicons.org/sqlite/003B57',
  Git: 'https://cdn.simpleicons.org/git/F05032',
  GitHub: 'https://cdn.simpleicons.org/github/FFFFFF',
  Vercel: 'https://cdn.simpleicons.org/vercel/FFFFFF',
  npm: 'https://cdn.simpleicons.org/npm/CB3837',
  Excel: 'https://cdn.simpleicons.org/microsoftexcel/217346',
  'Google Sheets': 'https://cdn.simpleicons.org/googlesheets/34A853',
  Python: 'https://cdn.simpleicons.org/python/3776AB',
  'Power BI': 'https://cdn.simpleicons.org/powerbi/F2C811',
  Looker: 'https://cdn.simpleicons.org/looker/4285F4',
  'Google Colab': 'https://cdn.simpleicons.org/googlecolab/F9AB00',
};

const fallbackIcons = {
  'APIs REST': 'API',
  localStorage: 'LS',
  'Big Data': 'BD',
};

const formatCategory = (category) =>
  categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);

const SkillBadge = ({ skill }) => {
  if (skillIcons[skill]) {
    return (
      <span className="skill-badge" title={skill}>
        <span className="skill-icon" aria-hidden="true">
          <img src={skillIcons[skill]} alt="" loading="lazy" />
        </span>
        <span>{skill}</span>
      </span>
    );
  }

  return (
    <span className="skill-badge" title={skill}>
      <span className="skill-icon fallback" aria-hidden="true">
        {fallbackIcons[skill] || skill.slice(0, 2).toUpperCase()}
      </span>
      <span>{skill}</span>
    </span>
  );
};

SkillBadge.propTypes = {
  skill: PropTypes.string.isRequired,
};

const Skills = ({ skills }) => (
  <section className="section" id="skills">
    <div className="section-header">
      <p className="eyebrow">Tecnologías</p>
      <h2>Lo que uso para crear impacto</h2>
    </div>
    <div className="skills-grid">
      {Object.entries(skills).map(([category, items]) => (
        <div className="card" key={category}>
          <h3>{formatCategory(category)}</h3>
          <div className="skill-stack">
            {items.map((item) => (
              <SkillBadge skill={item} key={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

Skills.propTypes = {
  skills: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default Skills;
