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
import RevealSection from './components/RevealSection';
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
        <RevealSection>
          <About about={data.about} />
        </RevealSection>
        <RevealSection>
          <ValueProposition items={data.valueProposition} dataFocus={data.dataFocus} />
        </RevealSection>
        <RevealSection>
          <Opportunity opportunity={data.opportunity} />
        </RevealSection>
        <RevealSection>
          <SoftSkills skills={data.softSkills} />
        </RevealSection>
        <RevealSection variant="page">
          <Education education={data.education} />
        </RevealSection>
        <RevealSection>
          <Skills skills={data.skills} />
        </RevealSection>
        <RevealSection variant="page">
          <AppliedAI appliedAI={data.appliedAI} />
        </RevealSection>
        <RevealSection variant="page">
          <Projects projects={data.projects} />
        </RevealSection>
        <RevealSection>
          <Contact social={data.social} />
        </RevealSection>
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
