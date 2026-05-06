import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const root = process.cwd();
const profile = JSON.parse(readFileSync(join(root, 'src/data/profile.json'), 'utf8'));

test('perfil principal contiene datos profesionales visibles', () => {
  assert.equal(profile.name, 'Carlos Octavio Otero');
  assert.match(profile.title, /Full Stack Jr\./);
  assert.match(profile.tagline, /aplicaciones web simples/i);
  assert.match(profile.tagline, /herramientas digitales claras/i);
  assert.ok(profile.about.length > 120);
  assert.equal(profile.avatarUrl, 'foto.jpeg');
});

test('proyectos destacados tienen repositorio, caso de estudio y material visual existente', () => {
  assert.ok(profile.projects.length >= 5);

  for (const project of profile.projects) {
    assert.match(project.repoUrl, /^https:\/\/github\.com\/OteroCarlos1977\//);
    assert.ok(project.description.length > 60, `${project.name} necesita descripcion suficiente`);
    assert.ok(project.caseStudy?.problem, `${project.name} necesita problema`);
    assert.ok(project.caseStudy?.solution, `${project.name} necesita solucion`);
    assert.ok(project.caseStudy?.impact, `${project.name} necesita aporte`);

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
});

test('Formspree usa icono real en proyectos y no cae en fallback FO', () => {
  const projectsSource = readFileSync(join(root, 'src/components/Projects.jsx'), 'utf8');

  assert.match(projectsSource, /Formspree:\s*'https:\/\/cdn\.simpleicons\.org\/formspree\/E5126F'/);
  assert.ok(profile.projects.some((project) => project.technologies.includes('Formspree')));
});
