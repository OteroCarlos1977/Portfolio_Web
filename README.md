# Portfolio Web - Carlos Octavio Otero

Portfolio profesional desarrollado con React + Vite para presentar perfil, tecnologias, proyectos destacados, capturas, mini casos de estudio y canales de contacto.

Demo GitHub Pages: https://oterocarlos1977.github.io/Portfolio_Web/

## Objetivo

Este proyecto funciona como carta de presentacion tecnica. Resume el perfil de Carlos Octavio Otero como desarrollador Full Stack con conocimientos en Big Data, muestra proyectos reales y permite contacto directo sin abrir una aplicacion de correo externa.

## Funcionalidades

- Hero profesional con foto de perfil y logo CO.
- Seccion "Sobre mi".
- Seccion "Que puedo aportar".
- Bloque de Big Data aplicado.
- Tarjetas de tecnologias con iconos.
- Proyectos destacados con capturas o imagenes de muestra.
- Carruseles automaticos con controles manuales.
- Vista ampliada en modal para proyectos con imagenes.
- Mini casos de estudio por proyecto: problema, solucion y aporte.
- Botones a demo y repositorio.
- Formulario de contacto integrado con Formspree.
- Modo de edicion local guardado en `localStorage`.
- Deploy automatizado en GitHub Pages con GitHub Actions.

## Tecnologias

- React 18
- Vite
- JavaScript
- CSS
- PropTypes
- Formspree
- GitHub Pages
- localStorage

## Instalacion

```bash
npm install
```

## Ejecucion Local

```bash
npm run dev
```

La aplicacion queda disponible normalmente en:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

Para previsualizar:

```bash
npm run preview
```

Para validar el build que usa GitHub Pages:

```bash
GITHUB_PAGES=true npm run build
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
  projects/             Capturas e imagenes de proyectos
src/
  components/           Componentes visuales del portfolio
  context/              Estado global y edicion local
  data/profile.json     Contenido inicial del perfil
  styles/App.css        Estilos principales
```

## Contenido Editable

El contenido principal esta centralizado en:

```text
src/data/profile.json
```

Desde ahi se pueden modificar:

- Nombre, titulo y presentacion.
- Secciones de aporte profesional.
- Stack tecnico.
- Proyectos, demos, repositorios e imagenes.
- Endpoint de contacto de Formspree.

## Contacto

El formulario usa Formspree:

```text
https://formspree.io/f/mrejqwar
```

El email se almacena dividido en usuario y dominio para reducir exposicion directa en el codigo.

## Modo Edicion

El portfolio incluye un login local para editar contenido desde la interfaz durante desarrollo.

Credenciales demo:

```text
Usuario: carlos
Password: 1234
```

Los cambios se guardan en `localStorage`; no modifican automaticamente `src/data/profile.json`. Para publicar cambios permanentes, actualizar el JSON y volver a desplegar.

## Proyectos Destacados

- Turnero Hospital.
- Catalogo de Peliculas CRUD.
- Portfolio Web.
- Estudio Juridico React.
- Proyecto Final COO, con carrito de compras funcional.

## Mejoras Recomendadas

- Agregar CV descargable.
- Agregar capturas reales del Turnero y del Portfolio, reemplazando imagenes de muestra.
- Revisar envio real del formulario desde el deploy.
- Agregar metadatos Open Graph.
- Incorporar tests basicos de renderizado.
