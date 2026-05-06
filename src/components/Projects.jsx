import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

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

const ProjectCarousel = ({ images, projectName, expanded }) => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const imageCount = images?.length || 0;

  useEffect(() => {
    if (isPaused || imageCount < 2) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % imageCount);
    }, expanded ? 4200 : 3200);

    return () => window.clearInterval(interval);
  }, [expanded, imageCount, isPaused]);

  if (!imageCount) {
    return null;
  }

  const goTo = (direction) => {
    setActive((current) => (current + direction + imageCount) % imageCount);
  };

  const image = images[active];
  const isVideo = image.type === 'video' || /\.(mp4|webm|mov)$/i.test(image.src);

  return (
    <div
      className="project-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="carousel-frame">
        {isVideo ? (
          <video
            src={publicAsset(image.src)}
            poster={image.poster ? publicAsset(image.poster) : undefined}
            controls
            preload="metadata"
            aria-label={image.alt || `${projectName} video ${active + 1}`}
          />
        ) : (
          <img src={publicAsset(image.src)} alt={image.alt || `${projectName} captura ${active + 1}`} loading="lazy" />
        )}
        {images.length > 1 && (
          <>
            <button
              className="carousel-control previous"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goTo(-1);
              }}
              aria-label="Imagen anterior"
            >
              {'<'}
            </button>
            <button
              className="carousel-control next"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goTo(1);
              }}
              aria-label="Imagen siguiente"
            >
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
              onClick={(event) => {
                event.stopPropagation();
                setActive(index);
              }}
              aria-label={`Ver material ${index + 1}`}
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
      poster: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  projectName: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
};

ProjectCarousel.defaultProps = {
  images: [],
  expanded: false,
};

const Projects = ({ projects }) => {
  const [expandedProject, setExpandedProject] = useState(null);

  const openProject = (project) => setExpandedProject(project);
  const closeProject = () => setExpandedProject(null);

  useEffect(() => {
    if (!expandedProject) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeProject();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedProject]);

  return (
    <section className="section" id="projects">
      <div className="section-header">
        <p className="eyebrow">Proyectos</p>
        <h2>Destacados con propósito</h2>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => {
          const canExpand = Boolean(project.images?.length);

          return (
            <article
              className={`card project ${canExpand ? 'expandable' : ''}`}
              key={project.name + index}
              onClick={() => {
                if (canExpand) {
                  openProject(project);
                }
              }}
            >
              <ProjectCarousel images={project.images} projectName={project.name} />
              <div className="project-content">
                <div className="project-title-row">
                  <h3>{project.name}</h3>
                  {canExpand && (
                    <button
                      className="expand-chip"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        openProject(project);
                      }}
                      aria-haspopup="dialog"
                    >
                      Ampliar
                    </button>
                  )}
                </div>
                <p className="section-text small">{project.description}</p>
                {project.caseStudy && (
                  <div className="case-study compact" aria-label={`Caso de estudio de ${project.name}`}>
                    <p>
                      <strong>Problema:</strong> {project.caseStudy.problem}
                    </p>
                    <p>
                      <strong>Aporte:</strong> {project.caseStudy.impact}
                    </p>
                  </div>
                )}
                <div className="tech-list" aria-label={`Tecnologías de ${project.name}`}>
                  {project.technologies.map((tech) => (
                    <TechIcon tech={tech} key={tech} />
                  ))}
                </div>
              </div>
              <div className="project-actions" onClick={(event) => event.stopPropagation()}>
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
          );
        })}
      </div>
      {expandedProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={expandedProject.name} onClick={closeProject}>
          <article className="project-modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="project-modal-header">
              <div>
                <p className="eyebrow">Vista ampliada</p>
                <h3>{expandedProject.name}</h3>
              </div>
              <button className="modal-close" type="button" onClick={closeProject} aria-label="Cerrar vista ampliada">
                x
              </button>
            </div>
            <ProjectCarousel images={expandedProject.images} projectName={expandedProject.name} expanded />
            <p className="section-text small">{expandedProject.description}</p>
            {expandedProject.caseStudy && (
              <div className="case-study" aria-label={`Caso de estudio de ${expandedProject.name}`}>
                <p>
                  <strong>Problema:</strong> {expandedProject.caseStudy.problem}
                </p>
                <p>
                  <strong>Solución:</strong> {expandedProject.caseStudy.solution}
                </p>
                <p>
                  <strong>Aporte:</strong> {expandedProject.caseStudy.impact}
                </p>
              </div>
            )}
            <div className="tech-list" aria-label={`Tecnologías de ${expandedProject.name}`}>
              {expandedProject.technologies.map((tech) => (
                <TechIcon tech={tech} key={tech} />
              ))}
            </div>
            <div className="project-actions">
              {expandedProject.demoUrl && (
                <a href={expandedProject.demoUrl} target="_blank" rel="noreferrer" className="btn primary">
                  Ver demo
                </a>
              )}
              <a href={expandedProject.repoUrl} target="_blank" rel="noreferrer" className="btn ghost">
                Ver repositorio
              </a>
            </div>
          </article>
        </div>
      )}
    </section>
  );
};

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      caseStudy: PropTypes.shape({
        problem: PropTypes.string.isRequired,
        solution: PropTypes.string.isRequired,
        impact: PropTypes.string.isRequired,
      }),
      technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          alt: PropTypes.string,
          poster: PropTypes.string,
          type: PropTypes.string,
        })
      ),
      repoUrl: PropTypes.string.isRequired,
      demoUrl: PropTypes.string,
    })
  ).isRequired,
};

export default Projects;
