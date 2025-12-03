import { usePortfolio } from './context/PortfolioContext';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const { data, isAuthenticated, login } = usePortfolio();

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">CO</div>
        <nav className="nav">
          <a href="#about">Sobre mí</a>
          <a href="#skills">Tecnologías</a>
          <a href="#projects">Proyectos</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      <main>
        <Hero name={data.name} title={data.title} tagline={data.tagline} location={data.location} />
        <About about={data.about} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Contact social={data.social} />
        {!isAuthenticated ? <Login onLogin={login} /> : <AdminPanel />}
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
