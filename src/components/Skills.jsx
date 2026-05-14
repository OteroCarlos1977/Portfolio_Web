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
  'Framer Motion': 'https://cdn.simpleicons.org/framer/0055FF',
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
  Codex: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai.svg',
  ChatGPT: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai.svg',
  Gemini: 'https://cdn.simpleicons.org/googlegemini/8E75B2',
  'GitHub Copilot': 'https://cdn.simpleicons.org/githubcopilot/FFFFFF',
  'Microsoft Copilot': 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-copilot.svg',
  'Google Sheets': 'https://cdn.simpleicons.org/googlesheets/34A853',
  Python: 'https://cdn.simpleicons.org/python/3776AB',
  Looker: 'https://cdn.simpleicons.org/looker/4285F4',
  'Google Colab': 'https://cdn.simpleicons.org/googlecolab/F9AB00',
};

const fallbackIcons = {
  'APIs REST': 'API',
  localStorage: 'LS',
  'Big Data': 'BD',
};

const customIcons = {
  Excel: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="custom-skill-svg">
      <rect x="4" y="3" width="16" height="18" rx="2" fill="#217346" />
      <rect x="9" y="6" width="9" height="2" fill="#ffffff" opacity="0.82" />
      <rect x="9" y="11" width="9" height="2" fill="#ffffff" opacity="0.72" />
      <rect x="9" y="16" width="9" height="2" fill="#ffffff" opacity="0.72" />
      <path d="M3 7.5 10.5 6v12L3 16.5Z" fill="#185c37" />
      <path d="m4.9 10 1.25 2.05L7.45 10h1.4l-1.9 3 2.05 3H7.55l-1.4-2.15L4.8 16H3.4l2-3-1.9-3Z" fill="#ffffff" />
    </svg>
  ),
  'Power BI': (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="custom-skill-svg">
      <rect x="4" y="11" width="3.5" height="8" rx="1.2" fill="#f2c811" />
      <rect x="9" y="7" width="3.5" height="12" rx="1.2" fill="#e6b800" />
      <rect x="14" y="4" width="3.5" height="15" rx="1.2" fill="#d9a300" />
      <path d="M4.8 20h14.4" stroke="#f6d84a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const formatCategory = (category) =>
  categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);

const SkillBadge = ({ skill }) => {
  const specialClass = skill === 'Codex' ? ' codex-skill' : '';

  if (customIcons[skill]) {
    return (
      <span className={`skill-badge${specialClass}`} title={skill}>
        <span className="skill-icon" aria-hidden="true">
          {customIcons[skill]}
        </span>
        <span>{skill}</span>
      </span>
    );
  }

  if (skillIcons[skill]) {
    return (
      <span className={`skill-badge${specialClass}`} title={skill}>
        <span className="skill-icon" aria-hidden="true">
          <img src={skillIcons[skill]} alt="" loading="lazy" />
        </span>
        <span>{skill}</span>
      </span>
    );
  }

  return (
    <span className={`skill-badge${specialClass}`} title={skill}>
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
