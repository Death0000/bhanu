# DZNSTUDEO — Bhanu Partap

A responsive portfolio for multidisciplinary designer Bhanu Partap, built with
React, TypeScript, Vite, Tailwind CSS, and React Router.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

```bash
npm install
npm run dev
```

Vite starts the development server on port `8443` by default in this project.
Open the URL printed in the terminal. If that port is already occupied, choose
another port:

```bash
npm run dev -- --port 5173
```

Keep the terminal open while developing. Press `Ctrl+C` to stop the server.

## Pages

- `/` — Home
- `/work` — Collection, with project-category filters
- `/work/:slug` — Individual project details
- `/about` — Designer profile
- `/services` — Services and disciplines
- `/contact` — Contact form and social link

The contact form currently validates input in the browser but does not deliver
submissions. Configure a form service or backend before relying on it in
production.

## Production

Create an optimized production build:

```bash
npm run build
```

Preview the build locally:

```bash
npm run preview
```

The production files are written to `dist/`. Configure the hosting provider to
serve `index.html` for application routes so direct visits to routes such as
`/about` and `/work/respira` work with client-side routing.

## Project structure

```text
src/
  components/  Shared site components and home-page sections
  data/        Project, studio, and service content
  pages/       Route-level page components
  App.tsx      Application routes and motion lifecycle
  index.css    Global styles
  main.tsx     React entry point
public/
  images/      Portfolio imagery
```

## Useful commands

```bash
npm run dev       # Start the development server
npm run build     # Build for production
npm run preview   # Preview the production build
npm run format    # Format the project with oxfmt
```
