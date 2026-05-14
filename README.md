# Portfolio Web - Carlos Octavio Otero

Portfolio profesional desarrollado con React + Vite para presentar perfil, tecnologias, proyectos destacados, videos demo, mini casos de estudio y canales de contacto.

Demo GitHub Pages: https://oterocarlos1977.github.io/Portfolio_Web/

## Objetivo

Este proyecto funciona como carta de presentacion tecnica. Resume el perfil de Carlos Octavio Otero como desarrollador Full Stack con conocimientos en Big Data, muestra proyectos reales y permite contacto directo sin abrir una aplicacion de correo externa.

## Funcionalidades

- Hero profesional con foto de perfil y logo CO.
- Seccion "Sobre mi".
- Seccion "Que puedo aportar".
- Seccion de busqueda profesional y focos de oportunidad.
- Bloque de Big Data aplicado.
- Seccion de habilidades blandas y forma de trabajo.
- Seccion de formacion tecnica y profesional.
- Tarjetas de tecnologias con iconos.
- Proyectos destacados con videos demo breves.
- Proyecto Android nativo en desarrollo para running y asistencia por voz.
- Vista ampliada en modal para proyectos con material visual.
- Cards de proyectos accesibles por teclado.
- Videos optimizados para no reproducirse en las tarjetas chicas y activarse en la vista ampliada.
- Transiciones suaves entre secciones con Framer Motion y soporte para usuarios con reduccion de movimiento.
- Mini casos de estudio por proyecto: problema, solucion y aporte.
- Botones a demo y repositorio.
- Boton de descarga de CV actualizado desde Google Drive.
- Accesos de contacto con iconos para GitHub, LinkedIn, WhatsApp, email y CV.
- Formulario de contacto integrado con Formspree, sin abrir una aplicacion externa de correo.
- Modales con cierre por `Escape` y bloqueo de scroll del fondo.
- Metadatos Open Graph para compartir el portfolio con vista previa profesional.
- Ajustes de accesibilidad visual con `focus-visible` y soporte para usuarios con reduccion de movimiento.
- Deploy automatizado en GitHub Pages con GitHub Actions.

## Tecnologias

- React 18
- Vite
- JavaScript
- CSS
- PropTypes
- Framer Motion
- Formspree
- GitHub Pages
- pnpm

## Instalacion

Requisito recomendado:

```bash
node --version
pnpm --version
```

El proyecto usa Node 22 o superior y pnpm 11.

```bash
pnpm install
```

## Ejecucion Local

```bash
pnpm dev
```

La aplicacion queda disponible normalmente en:

```text
http://localhost:5173
```

## Build

```bash
pnpm build
```

Para previsualizar:

```bash
pnpm preview
```

Para validar el build que usa GitHub Pages:

```bash
GITHUB_PAGES=true pnpm build
```

## Tests

```bash
pnpm test
```

Los tests validan datos principales del perfil, proyectos destacados, assets referenciados, contacto, metadatos Open Graph e iconos críticos del stack.

## Gestion De Dependencias

El proyecto usa pnpm como gestor de paquetes principal. Se versiona `pnpm-lock.yaml` para instalaciones reproducibles y se permite de forma explicita el build script de `esbuild`, dependencia necesaria para Vite.

Comandos recomendados:

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm build
```

## Deploy En GitHub Pages

El repo incluye `.github/workflows/deploy-pages.yml`.

Para activarlo:

1. Ir a `Settings > Pages`.
2. En `Build and deployment`, elegir `GitHub Actions`.
3. Hacer push a `main` o ejecutar manualmente el workflow.

## Estructura

```text
public/
  projects/             Videos demo y material visual de proyectos
src/
  components/           Componentes visuales del portfolio
  data/profile.json     Contenido inicial del perfil
  styles/App.css        Estilos principales
  utils/assets.js        Resolucion de rutas publicas para assets locales y externos
```

## Contenido Editable

El contenido principal esta centralizado en:

```text
src/data/profile.json
```

Desde ahi se pueden modificar:

- Nombre, titulo y presentacion.
- Secciones de aporte profesional.
- Habilidades blandas.
- Formacion tecnica y profesional.
- Stack tecnico.
- Proyectos, demos, repositorios y videos.
- Endpoint de contacto de Formspree.
- Numero y mensaje inicial de WhatsApp.

## Contacto

El formulario usa Formspree:

```text
https://formspree.io/f/mrejqwar
```

El email se almacena dividido en usuario y dominio para reducir exposicion directa en el codigo.

## Proyectos Destacados

- Estudio Juridico React.
- Asistente de Running por Voz.
- Turnero Hospital.
- Catalogo de Peliculas CRUD.
- Proyecto Final COO, con carrito de compras funcional.
- Portfolio Web.
