import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const root = process.cwd();
const profile = JSON.parse(readFileSync(join(root, 'src/data/profile.json'), 'utf8'));
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

test('perfil principal contiene datos profesionales visibles', () => {
  assert.equal(profile.name, 'Carlos Octavio Otero');
  assert.match(profile.title, /Full Stack Jr\./);
  assert.match(profile.tagline, /aplicaciones web simples/i);
  assert.match(profile.tagline, /turnos, expedientes, catálogos y reportes/i);
  assert.ok(profile.about.length > 120);
  assert.equal(profile.avatarUrl, 'foto.jpeg');
});

test('proyectos destacados tienen repositorio, caso de estudio y material visual existente', () => {
  assert.ok(profile.projects.length >= 5);

  for (const project of profile.projects) {
    if (project.repoUrl) {
      assert.match(project.repoUrl, /^https:\/\/github\.com\/OteroCarlos1977\//);
    } else {
      assert.match(project.status, /desarrollo|preparación/i, `${project.name} sin repo necesita estado visible`);
    }
    assert.ok(project.description.length > 60, `${project.name} necesita descripcion suficiente`);
    assert.ok(project.caseStudy?.problem, `${project.name} necesita problema`);
    assert.ok(project.caseStudy?.solution, `${project.name} necesita solucion`);
    assert.ok(project.caseStudy?.impact, `${project.name} necesita aporte`);
    assert.ok(project.aiOpportunity?.length > 40, `${project.name} necesita oportunidad IA concreta`);

    for (const media of project.images || []) {
      assert.ok(existsSync(join(root, 'public', media.src)), `No existe el asset ${media.src}`);
    }
  }
});

test('contacto mantiene canales principales configurados', () => {
  assert.match(profile.social.github, /^https:\/\/github\.com\/OteroCarlos1977/);
  assert.match(profile.social.linkedin, /^https:\/\/www\.linkedin\.com\//);
  assert.equal(`${profile.social.emailUser}@${profile.social.emailDomain}`, 'oterocarlosprogramacion@gmail.com');
  assert.match(profile.social.contactEndpoint, /^https:\/\/formspree\.io\/f\//);
  assert.match(profile.social.whatsappPhone, /^54\d+$/);
  assert.match(profile.social.resumeUrl, /^https:\/\/docs\.google\.com\/document\/d\//);
});

test('open graph queda preparado para compartir el portfolio', () => {
  const html = readFileSync(join(root, 'index.html'), 'utf8');

  assert.match(html, /property="og:title"/);
  assert.match(html, /property="og:description"/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:card"/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /https:\/\/oterocarlos1977\.github\.io\/Portfolio_Web\//);
  assert.doesNotMatch(html, /TU-LINK-DE-VERCEL|portfolio-web-otero-carlos\.vercel\.app/);
});

test('sitemap y robots apuntan a GitHub Pages como URL canonica', () => {
  const sitemap = readFileSync(join(root, 'public/sitemap.xml'), 'utf8');
  const robots = readFileSync(join(root, 'public/robots.txt'), 'utf8');

  assert.match(sitemap, /https:\/\/oterocarlos1977\.github\.io\/Portfolio_Web\//);
  assert.match(robots, /https:\/\/oterocarlos1977\.github\.io\/Portfolio_Web\/sitemap\.xml/);
  assert.doesNotMatch(`${sitemap}\n${robots}`, /vercel\.app|TU-LINK/);
});

test('Formspree usa icono real en proyectos y no cae en fallback FO', () => {
  const projectsSource = readFileSync(join(root, 'src/components/Projects.jsx'), 'utf8');

  assert.match(projectsSource, /Formspree:\s*'https:\/\/cdn\.simpleicons\.org\/formspree\/E5126F'/);
  assert.ok(profile.projects.some((project) => project.technologies.includes('Formspree')));
});

test('IA aplicada queda integrada como capacidad profesional', () => {
  assert.match(profile.appliedAI.title, /IA/i);
  assert.ok(profile.appliedAI.description.length > 120);
  assert.equal(profile.appliedAI.items.length, 4);

  for (const item of profile.appliedAI.items) {
    assert.ok(item.icon);
    assert.ok(item.title.length > 8);
    assert.ok(item.description.length > 60);
  }
});

test('Framer Motion queda integrado para transiciones de secciones', () => {
  const appSource = readFileSync(join(root, 'src/App.jsx'), 'utf8');
  const revealSourceExists = existsSync(join(root, 'src/components/RevealSection.jsx'));

  assert.ok(packageJson.dependencies['framer-motion']);
  assert.ok(profile.skills.frontend.includes('Framer Motion'));
  assert.ok(revealSourceExists);
  assert.match(appSource, /<RevealSection/);
});

test('React Spring queda integrado para microinteracciones del logo', () => {
  const appSource = readFileSync(join(root, 'src/App.jsx'), 'utf8');
  const animatedLogoExists = existsSync(join(root, 'src/components/AnimatedLogo.jsx'));

  assert.ok(packageJson.dependencies['@react-spring/web']);
  assert.ok(profile.skills.frontend.includes('React Spring'));
  assert.ok(animatedLogoExists);
  assert.match(appSource, /<AnimatedLogo/);
});
