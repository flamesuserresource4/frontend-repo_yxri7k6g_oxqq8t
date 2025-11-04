# Rahul Chowdhary J — AIML Portfolio (React + Vite + Tailwind)

A modern, responsive one-page portfolio showcasing projects in computer vision, generative models, and speech. Built with React (Vite), Tailwind CSS, Framer Motion, and an interactive Spline 3D hero.

## Features
- Mobile-first, responsive layout (Header, Hero, About, Projects, Skills, Education, Contact, Footer)
- Light/dark theme with system detection + manual toggle
- Subtle animations with Framer Motion
- Accessible: semantic HTML, labels, focus states, high-contrast palette
- Projects loaded from an editable JSON file (public/projects.json)
- Optimized for performance: lazy assets, SVG badges, CSS grid
- SEO: basic meta and JSON-LD structured data injected at runtime

## Quick start (local)
1. Install dependencies
   ```bash
   npm install
   ```
2. Start dev server
   ```bash
   npm run dev
   ```
3. Open the URL shown in your terminal (usually http://localhost:3000)

## Project content
- Update projects in `public/projects.json` — no code changes required.
- Replace the resume link by placing a PDF at `public/resume.pdf` and it will be downloadable from the hero button.

## Build
```bash
npm run build
```
This creates an optimized production build in `dist/`.

## Deploy

### Netlify (recommended)
1. Create a new site from Git repository or drag-and-drop the `dist/` folder in the Netlify UI.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add a redirect for SPA (optional): create a `_redirects` file in `public/` with:
   ```
   /*    /index.html   200
   ```

### GitHub Pages
Option A — Static hosting using `dist` folder (no router):
1. Build the project: `npm run build`
2. Push the `dist` folder to the `gh-pages` branch
3. Enable GitHub Pages in repository settings, choose `gh-pages` branch as the source

Option B — Use a GitHub Action:
- Use a standard Vite deploy workflow that builds on `main` and publishes `dist` to `gh-pages`.

Example workflow (`.github/workflows/deploy.yml`):
```yaml
name: Deploy Vite app to GitHub Pages
on:
  push:
    branches: [ main ]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Tech
- React + Vite
- Tailwind CSS
- Framer Motion
- Spline 3D (`@splinetool/react-spline`)
- Lucide icons

## Notes
- The header transitions from transparent to solid on scroll.
- The color palette uses a teal→indigo gradient for primary accents and a warm orange for focus rings.
- To change or add projects, edit `public/projects.json`.
- For the contact form, a `mailto:` fallback is implemented; integrate a serverless function later if desired.
