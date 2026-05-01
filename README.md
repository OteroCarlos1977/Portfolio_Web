# Portfolio Web - Carlos Octavio Otero

Portfolio personal desarrollado con React + Vite para presentar perfil profesional, tecnologías, proyectos destacados y canales de contacto.

## Objetivo

Este proyecto funciona como carta de presentación técnica. La aplicación muestra una narrativa profesional clara, proyectos reales publicados en GitHub y una sección editable desde la interfaz para actualizar contenido durante el desarrollo.

## Características

- Landing profesional de una página.
- Secciones de perfil, habilidades, proyectos y contacto.
- Datos iniciales centralizados en `src/data/profile.json`.
- Modo de edición local con persistencia en `localStorage`.
- Diseño responsive con CSS propio.
- Proyecto listo para ejecutar con Vite.

## Tecnologías

- React 18
- Vite
- JavaScript
- CSS
- localStorage

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm run dev
```

La aplicación queda disponible normalmente en `http://localhost:5173`.

## Build de producción

```bash
npm run build
```

Para previsualizar el build:

```bash
npm run preview
```

## Deploy

### Netlify

El repo incluye `netlify.toml`, por lo que Netlify puede detectar la configuración automáticamente:

```text
Build command: npm run build
Publish directory: dist
```

La redirección `/* -> /index.html` ya está configurada para que funcionen rutas internas de React.

### GitHub Pages

El repo incluye un workflow en `.github/workflows/deploy-pages.yml`. Para activarlo:

1. Ir a `Settings > Pages`.
2. En `Build and deployment`, elegir `GitHub Actions`.
3. Hacer push a `main` o ejecutar manualmente el workflow.

La URL esperada será:

```text
https://oterocarlos1977.github.io/Portfolio_Web/
```

## Estructura principal

```text
src/
  components/          Componentes visuales del portfolio
  context/             Estado global y edición local
  data/profile.json    Contenido inicial del perfil
  styles/App.css       Estilos principales
```

## Modo edición

El portfolio incluye un login local para editar contenido desde la interfaz durante el desarrollo.

Credenciales demo:

```text
Usuario: carlos
Password: 1234
```

Los cambios se guardan en `localStorage`, por lo que no modifican automáticamente el archivo `profile.json`. Para publicar cambios permanentes, actualizar `src/data/profile.json` y volver a desplegar.

## Próximas mejoras recomendadas

- Publicar una URL de demo y enlazarla desde el perfil de GitHub.
- Agregar capturas del portfolio al README.
- Reemplazar el modo edición local por un CMS simple o backend autenticado si se necesita edición real en producción.
- Incorporar pruebas básicas de renderizado.
- Mejorar SEO con metadatos Open Graph y favicon propio.
