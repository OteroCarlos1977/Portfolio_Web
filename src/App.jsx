import { useState } from 'react';
import { usePortfolio } from './context/PortfolioContext';
import Hero from './components/Hero';
import About from './components/About';
import ValueProposition from './components/ValueProposition';
import Opportunity from './components/Opportunity';
import SoftSkills from './components/SoftSkills';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const { data, isAuthenticated, login } = usePortfolio();
  const [showLogin, setShowLogin] = useState(false);
  const publicAsset = (path) => {
    if (!path) {
      return '';
    }

    if (/^https?:\/\//.test(path)) {
      return path;
    }

    return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
  };

  return (
    <div className="app">
      <header className="topbar">
        <a className="logo" href="#hero" aria-label="Inicio">
          <img src={publicAsset('logo-co.png')} alt="Logo CO" />
        </a>
        <nav className="nav">
          <a href="#about">Sobre mí</a>
          <a href="#value">Aporte</a>
          <a href="#opportunity">Búsqueda</a>
          <a href="#soft-skills">Habilidades</a>
          <a href="#education">Formación</a>
          <a href="#skills">Tecnologías</a>
          <a href="#projects">Proyectos</a>
          <a href="#contact">Contacto</a>
        </nav>
        <div className="edit-access">
          {isAuthenticated ? (
            <a className="icon-btn" href="#admin" aria-label="Ir al panel de edición" title="Editar portfolio">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
              </svg>
            </a>
          ) : (
            <button
              className="icon-btn"
              type="button"
              onClick={() => setShowLogin((current) => !current)}
              aria-label="Abrir modo edición"
              title="Editar portfolio"
              aria-expanded={showLogin}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
              </svg>
            </button>
          )}
          {!isAuthenticated && showLogin && (
            <div className="login-popover">
              <Login
                onLogin={(username, password) => {
                  const success = login(username, password);
                  if (success) {
                    setShowLogin(false);
                  }
                  return success;
                }}
              />
            </div>
          )}
        </div>
      </header>

      <main>
        <Hero
          name={data.name}
          title={data.title}
          tagline={data.tagline}
          location={data.location}
          avatarUrl={publicAsset(data.avatarUrl)}
          resumeUrl={data.social.resumeUrl}
        />
        <About about={data.about} />
        <ValueProposition items={data.valueProposition} dataFocus={data.dataFocus} />
        <Opportunity opportunity={data.opportunity} />
        <SoftSkills skills={data.softSkills} />
        <Education education={data.education} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Contact social={data.social} />
        {isAuthenticated && <AdminPanel />}
      </main>

      <footer className="footer">
        <p>
          {data.name} · {data.location}
        </p>
        <small>
          Portfolio dinámico construido con React + Vite. Modo edición guardado en localStorage.
        </small>
      </footer>
    </div>
  );
};

export default App;
