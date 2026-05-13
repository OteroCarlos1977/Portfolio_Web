import Hero from './components/Hero';
import About from './components/About';
import ValueProposition from './components/ValueProposition';
import Opportunity from './components/Opportunity';
import SoftSkills from './components/SoftSkills';
import Education from './components/Education';
import Skills from './components/Skills';
import AppliedAI from './components/AppliedAI';
import Projects from './components/Projects';
import Contact from './components/Contact';
import data from './data/profile.json';
import { publicAsset } from './utils/assets';

const App = () => {
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
          <a href="#applied-ai">IA aplicada</a>
          <a href="#projects">Proyectos</a>
          <a href="#contact">Contacto</a>
        </nav>
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
        <AppliedAI appliedAI={data.appliedAI} />
        <Projects projects={data.projects} />
        <Contact social={data.social} />
      </main>

      <footer className="footer">
        <p>
          {data.name} · {data.location}
        </p>
        <small>Portfolio profesional construido con React + Vite.</small>
      </footer>
    </div>
  );
};

export default App;
