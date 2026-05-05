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
  Gemini: 'https://cdn.simpleicons.org/googlegemini/8E75B2',
  'GitHub Copilot': 'https://cdn.simpleicons.org/githubcopilot/FFFFFF',
  'Google Sheets': 'https://cdn.simpleicons.org/googlesheets/34A853',
  Python: 'https://cdn.simpleicons.org/python/3776AB',
  Looker: 'https://cdn.simpleicons.org/looker/4285F4',
  'Google Colab': 'https://cdn.simpleicons.org/googlecolab/F9AB00',
};

const fallbackIcons = {
  'APIs REST': 'API',
  localStorage: 'LS',
  'Big Data': 'BD',
  Codex: 'CX',
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
  ChatGPT: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="custom-skill-svg">
      <circle cx="12" cy="12" r="9" fill="#101820" stroke="#ffffff" strokeWidth="1.4" />
      <path
        d="M8.4 9.1a4 4 0 0 1 6.7-2.3 4 4 0 0 1 2.2 6.6 4 4 0 0 1-6.7 3.8 4 4 0 0 1-3.8-5.8 4 4 0 0 1 1.6-2.3Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="12" y="14.7" textAnchor="middle" fontSize="4.7" fontWeight="800" fill="#ffffff">
        GPT
      </text>
    </svg>
  ),
  'Microsoft Copilot': (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="custom-skill-svg">
      <path d="M5.2 13.8c0-4.2 2.9-7.6 6.7-7.6 3.9 0 6.9 3.3 6.9 7.5 0 3-1.8 4.9-4.2 4.9-1.3 0-2.4-.5-3.2-1.5-.7.9-1.8 1.5-3.1 1.5-1.9 0-3.1-1.7-3.1-4.8Z" fill="#7f52ff" />
      <path d="M4.3 11.7c.8-3.7 3.5-6.4 7.1-6.4 2 0 3.7.8 5 2.2-1-.5-2.1-.8-3.4-.8-3.8 0-6.7 3.2-7.1 7.5-.9-.4-1.8-1.2-1.6-2.5Z" fill="#00a4ef" />
      <path d="M11.2 17.1c.8 1.3 2 2 3.6 2 2.8 0 4.9-2.2 4.9-5.5 0-.9-.1-1.7-.4-2.5 1.2 1 1.9 2.4 1.9 4 0 3.8-2.7 6-6 6-2.2 0-3.8-1-4.7-2.7Z" fill="#7bd88f" />
      <path d="M7.7 10.8c1.2-1.4 2.7-2.1 4.5-2.1 2 0 3.7.9 4.8 2.5-.9-.5-1.9-.8-3.1-.8-2.5 0-4.5 1.5-5.4 4.1-.9-.5-1.3-2.4-.8-3.7Z" fill="#fbbc05" />
    </svg>
  ),
};

const formatCategory = (category) =>
  categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);

const SkillBadge = ({ skill }) => {
  if (customIcons[skill]) {
    return (
      <span className="skill-badge" title={skill}>
        <span className="skill-icon" aria-hidden="true">
          {customIcons[skill]}
        </span>
        <span>{skill}</span>
      </span>
    );
  }

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
