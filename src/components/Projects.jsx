import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { publicAsset } from '../utils/assets';

const techIcons = {
  Bootstrap: 'https://cdn.simpleicons.org/bootstrap/7952B3',
  CSS: 'https://cdn.simpleicons.org/css/1572B6',
  Express: 'https://cdn.simpleicons.org/express/FFFFFF',
  Formspree: 'https://cdn.simpleicons.org/formspree/E5126F',
  JavaScript: 'https://cdn.simpleicons.org/javascript/F7DF1E',
  MySQL: 'https://cdn.simpleicons.org/mysql/4479A1',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
  React: 'https://cdn.simpleicons.org/react/61DAFB',
  'Framer Motion': 'https://cdn.simpleicons.org/framer/0055FF',
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

const ProjectMedia = ({ images = [], projectName, expanded = false }) => {
  const media = images?.[0];

  if (!media) {
    return null;
  }

  const isVideo = media.type === 'video' || /\.(mp4|webm|mov)$/i.test(media.src);

  return (
    <div className="project-media">
      <div className="media-frame">
        {isVideo ? (
          <video
            src={publicAsset(media.src)}
            poster={media.poster ? publicAsset(media.poster) : undefined}
            autoPlay={expanded}
            controls={expanded}
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={media.alt || `Video demo de ${projectName}`}
          />
        ) : (
          <img src={publicAsset(media.src)} alt={media.alt || `Captura de ${projectName}`} loading="lazy" />
        )}
      </div>
    </div>
  );
};

ProjectMedia.propTypes = {
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

const Projects = ({ projects }) => {
  const [expandedProject, setExpandedProject] = useState(null);

  const openProject = useCallback((project) => setExpandedProject(project), []);
  const closeProject = useCallback(() => setExpandedProject(null), []);
  const handleCardKeyDown = useCallback((event, project) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject(project);
    }
  }, [openProject]);

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
  }, [closeProject, expandedProject]);

  return (
    <section className="section" id="projects">
      <div className="section-header">
        <p className="eyebrow">Proyectos</p>
        <h2>Destacados con propósito</h2>
      </div>
      <div className="projects-grid">
        {projects.map((project) => {
          const canExpand = Boolean(project.images?.length);

          return (
            <article
              className={`card project ${canExpand ? 'expandable' : ''}`}
              key={project.name}
              role={canExpand ? 'button' : undefined}
              tabIndex={canExpand ? 0 : undefined}
              aria-label={canExpand ? `Ampliar ${project.name}` : undefined}
              onClick={() => {
                if (canExpand) {
                  openProject(project);
                }
              }}
              onKeyDown={(event) => {
                if (canExpand) {
                  handleCardKeyDown(event, project);
                }
              }}
            >
              <ProjectMedia images={project.images} projectName={project.name} />
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
                {project.aiOpportunity && (
                  <p className="ai-project-note">
                    <strong>IA posible:</strong> {project.aiOpportunity}
                  </p>
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
            <ProjectMedia images={expandedProject.images} projectName={expandedProject.name} expanded />
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
            {expandedProject.aiOpportunity && (
              <p className="ai-project-note expanded">
                <strong>IA posible:</strong> {expandedProject.aiOpportunity}
              </p>
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
      aiOpportunity: PropTypes.string,
    })
  ).isRequired,
};

export default Projects;
