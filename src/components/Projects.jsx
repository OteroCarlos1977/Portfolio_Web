import PropTypes from 'prop-types';

const Projects = ({ projects }) => (
  <section className="section" id="projects">
    <div className="section-header">
      <p className="eyebrow">Proyectos</p>
      <h2>Destacados con propósito</h2>
    </div>
    <div className="projects-grid">
      {projects.map((project, index) => (
        <article className="card project" key={project.name + index}>
          <div>
            <h3>{project.name}</h3>
            <p className="section-text small">{project.description}</p>
            <div className="tech-list">
              {project.technologies.map((tech) => (
                <span className="pill" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn ghost">
            Ver repositorio
          </a>
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
      repoUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Projects;
