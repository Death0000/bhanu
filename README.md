# DZNSTUDEO

Portfolio website for multidisciplinary designer Bhanu Partap. The site
features selected design projects, achievements, services, and information
about the DZNSTUDEO creative practice.

## Built with

- React 19 and TypeScript
- Vite 8
- React Router 7
- Tailwind CSS 4
- GSAP and ScrollTrigger, with Lenis for smooth scrolling

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

Install the project dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

The development server uses port `8443` by default. Open the local URL printed
in the terminal. If the port is already in use, select another one:

```bash
npm run dev -- --port 5173
```

Keep the terminal open while the server is running. Press `Ctrl+C` to stop it.

## Site pages

- `/` — Homepage, selected work, achievements, and services preview
- `/work` — Project collection with category filters
- `/work/respira` — Respira packaging concept
- `/work/audible-budget` — The Audible Budget speculative civic-design project
- `/work/dznstudeo` — DZNSTUDEO creative practice
- `/about` — Designer profile and approach
- `/services` — Services and disciplines
- `/contact` — Contact form

The contact form currently provides client-side validation only; it does not
send submissions to a backend or form service.

## Production

Build an optimized production version:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Build output is written to `dist/`. Configure the hosting provider to serve
`index.html` for application routes so direct visits to paths such as `/about`
and `/work/respira` work with client-side routing.

## Project structure

```text
src/
  components/  Shared site components and homepage sections
  data/        Studio, project, award, and service content
  pages/       Route-level page components
  App.tsx      Routes, page title, and motion lifecycle
  index.css    Global styles and responsive layout
  main.tsx     React entry point
public/
  images/      Portfolio, achievement, and service imagery
  favicon.png  DZNSTUDEO browser-tab icon
  favicon.svg  Scalable DZNSTUDEO browser-tab icon
```

## Useful commands

```bash
npm run dev       # Start the development server
npm run build     # Build for production
npm run preview   # Preview the production build
npm run format    # Format files with oxfmt
```
