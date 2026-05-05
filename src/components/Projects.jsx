import PropTypes from 'prop-types';
import { useState } from 'react';

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const techIcons = {
  Bootstrap: 'https://cdn.simpleicons.org/bootstrap/7952B3',
  CSS: 'https://cdn.simpleicons.org/css/1572B6',
  Express: 'https://cdn.simpleicons.org/express/FFFFFF',
  JavaScript: 'https://cdn.simpleicons.org/javascript/F7DF1E',
  MySQL: 'https://cdn.simpleicons.org/mysql/4479A1',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
  React: 'https://cdn.simpleicons.org/react/61DAFB',
  'React Router': 'https://cdn.simpleicons.org/reactrouter/CA4245',
  SQLite: 'https://cdn.simpleicons.org/sqlite/003B57',
  Vite: 'https://cdn.simpleicons.org/vite/646CFF',
};

const fallbackIcons = {
  localStorage: 'LS',
  Multer: 'UP',
};

const TechIcon = ({ tech }) => {
  if (techIcons[tech]) {
    return (
      <span className="tech-icon" title={tech} aria-label={tech}>
        <img src={techIcons[tech]} alt="" loading="lazy" />
      </span>
    );
  }

  return (
    <span className="tech-icon fallback" title={tech} aria-label={tech}>
      {fallbackIcons[tech] || tech.slice(0, 2).toUpperCase()}
    </span>
  );
};

TechIcon.propTypes = {
  tech: PropTypes.string.isRequired,
};

const ProjectCarousel = ({ images, projectName }) => {
  const [active, setActive] = useState(0);

  if (!images?.length) {
    return null;
  }

  const goTo = (direction) => {
    setActive((current) => (current + direction + images.length) % images.length);
  };

  const image = images[active];

  return (
    <div className="project-carousel">
      <div className="carousel-frame">
        <img src={publicAsset(image.src)} alt={image.alt || `${projectName} captura ${active + 1}`} loading="lazy" />
        {images.length > 1 && (
          <>
            <button className="carousel-control previous" type="button" onClick={() => goTo(-1)} aria-label="Imagen anterior">
              {'<'}
            </button>
            <button className="carousel-control next" type="button" onClick={() => goTo(1)} aria-label="Imagen siguiente">
              {'>'}
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="carousel-dots" aria-label={`Capturas de ${projectName}`}>
          {images.map((item, index) => (
            <button
              className={index === active ? 'active' : ''}
              type="button"
              key={item.src}
              onClick={() => setActive(index)}
              aria-label={`Ver captura ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ProjectCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
  projectName: PropTypes.string.isRequired,
};

ProjectCarousel.defaultProps = {
  images: [],
};

const Projects = ({ projects }) => (
  <section className="section" id="projects">
    <div className="section-header">
      <p className="eyebrow">Proyectos</p>
      <h2>Destacados con propósito</h2>
    </div>
    <div className="projects-grid">
      {projects.map((project, index) => (
        <article className="card project" key={project.name + index}>
          <ProjectCarousel images={project.images} projectName={project.name} />
          <div className="project-content">
            <h3>{project.name}</h3>
            <p className="section-text small">{project.description}</p>
            <div className="tech-list" aria-label={`Tecnologías de ${project.name}`}>
              {project.technologies.map((tech) => (
                <TechIcon tech={tech} key={tech} />
              ))}
            </div>
          </div>
          <div className="project-actions">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn primary">
                Ver demo
              </a>
            )}
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn ghost">
              Ver repositorio
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
);

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          alt: PropTypes.string,
        })
      ),
      repoUrl: PropTypes.string.isRequired,
      demoUrl: PropTypes.string,
    })
  ).isRequired,
};

export default Projects;
