import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const AdminPanel = () => {
  const {
    data,
    updateProfileField,
    updateSkills,
    addProject,
    updateProject,
    deleteProject,
    logout,
  } = usePortfolio();

  const [newProject, setNewProject] = useState({ name: '', description: '', technologies: '', repoUrl: '' });

  const handleSkillChange = (category, value) => {
    const items = value.split(',').map((item) => item.trim()).filter(Boolean);
    updateSkills(category, items);
  };

  const handleProjectChange = (index, key, value) => {
    const updated = { ...data.projects[index], [key]: value };
    if (key === 'technologies') {
      updated.technologies = value.split(',').map((item) => item.trim()).filter(Boolean);
    }
    updateProject(index, updated);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.name || !newProject.description || !newProject.repoUrl) return;
    const formatted = {
      ...newProject,
      technologies: newProject.technologies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    };
    addProject(formatted);
    setNewProject({ name: '', description: '', technologies: '', repoUrl: '' });
  };

  return (
    <section className="section admin" id="admin">
      <div className="section-header">
        <p className="eyebrow">Edición</p>
        <h2>Controla tu narrativa</h2>
        <button className="btn ghost" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <div className="admin-grid">
        <div className="card">
          <h3>Copy principal</h3>
          <label htmlFor="tagline">Tagline</label>
          <textarea
            id="tagline"
            value={data.tagline}
            onChange={(e) => updateProfileField('tagline', e.target.value)}
          />
          <label htmlFor="about">Sobre mí</label>
          <textarea
            id="about"
            value={data.about}
            onChange={(e) => updateProfileField('about', e.target.value)}
          />
          <label htmlFor="location">Ubicación</label>
          <input
            id="location"
            type="text"
            value={data.location}
            onChange={(e) => updateProfileField('location', e.target.value)}
          />
        </div>

        <div className="card">
          <h3>Habilidades</h3>
          {Object.entries(data.skills).map(([category, items]) => (
            <div key={category} className="skill-edit">
              <label htmlFor={category}>{category}</label>
              <textarea
                id={category}
                value={items.join(', ')}
                onChange={(e) => handleSkillChange(category, e.target.value)}
                placeholder="Tecnología, otra tecnología"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="section-header compact">
          <div>
            <p className="eyebrow">Proyectos</p>
            <h3>Editar o agregar</h3>
          </div>
        </div>

        {data.projects.map((project, index) => (
          <div key={project.name + index} className="project-edit">
            <div className="project-edit-grid">
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                placeholder="Nombre"
              />
              <input
                type="text"
                value={project.repoUrl}
                onChange={(e) => handleProjectChange(index, 'repoUrl', e.target.value)}
                placeholder="URL del repo"
              />
            </div>
            <textarea
              value={project.description}
              onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
              placeholder="Descripción"
            />
            <input
              type="text"
              value={project.technologies.join(', ')}
              onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
              placeholder="React, Node, ..."
            />
            <button className="btn secondary" onClick={() => deleteProject(index)}>
              Eliminar
            </button>
          </div>
        ))}

        <form className="project-edit" onSubmit={handleAddProject}>
          <h4>Nuevo proyecto</h4>
          <div className="project-edit-grid">
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nombre"
            />
            <input
              type="text"
              value={newProject.repoUrl}
              onChange={(e) => setNewProject((prev) => ({ ...prev, repoUrl: e.target.value }))}
              placeholder="URL del repo"
            />
          </div>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Descripción"
          />
          <input
            type="text"
            value={newProject.technologies}
            onChange={(e) => setNewProject((prev) => ({ ...prev, technologies: e.target.value }))}
            placeholder="React, API, ..."
          />
          <button className="btn primary" type="submit">
            Agregar proyecto
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminPanel;
