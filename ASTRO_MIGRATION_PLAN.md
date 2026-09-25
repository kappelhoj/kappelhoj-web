# Astro Migration & Modular Architecture Plan

This document outlines the step-by-step plan to migrate **`kappelhoj-web`** from its legacy Vue CLI / Webpack multi-page setup to **Astro**, enabling easy submodule insertion while maintaining the GitHub Pages build and deploy pipeline.

---

## 1. Goals & Objectives

1. **Simplicity & Performance:** Pure static HTML/CSS by default (0 KB JavaScript baseline).
2. **Modular Sandbox:** Ability to drop in HTMX widgets, vanilla canvas demos, or isolated framework components (Vue, React, Svelte) anywhere with minimal boilerplate.
3. **Clean Layout Templating:** Centralized Layout component (Header, Nav, Footer, metadata) shared across all pages.
4. **Maintained & Modernized CI/CD:** Maintain the automated build and deployment to the `gh-pages` branch on Git tag pushes (with modernized GitHub Actions steps).

---

## 2. Target Project Structure

We recommend flattening the nested `Web/main/` directory to the repository root for cleaner navigation:

```text
project/kappelhoj-web/
├── .github/
│   └── workflows/
│       └── web-build-and-publish.yml  # Modernized GitHub Pages deploy workflow
├── public/
│   ├── favicon.ico
│   └── social-logos/                  # LinkedIn, GitHub icons
├── src/
│   ├── components/
│   │   ├── Header.astro               # Site header & navigation bar
│   │   ├── Footer.astro               # Social links & copyright
│   │   └── SubmoduleCard.astro        # Reusable container for experiments/demos
│   ├── layouts/
│   │   └── Layout.astro               # Base HTML shell, metadata, CSS styles
│   ├── pages/
│   │   ├── index.astro                # Home page (kappelhoj.com/)
│   │   └── dev.astro                  # Playground / experiments page (kappelhoj.com/dev)
│   └── submodules/                    # Playground modules & experimental widgets
│       ├── htmx-demo/                 # Example HTMX widget
│       └── canvas-demo/               # Example Canvas/JS widget
├── astro.config.mjs                   # Astro configuration
├── package.json                       # Dependencies & build scripts
├── tsconfig.json                      # Optional TypeScript config
└── README.md
```

---

## 3. Step-by-Step Execution Plan

### Phase 1: Initialize Astro in `kappelhoj-web`
* Clean up legacy Vue CLI configs (`vue.config.js`, `babel.config.js`, legacy `yarn.lock`).
* Initialize Astro (`astro.config.mjs` with `site: 'https://kappelhoj.github.io'` or custom domain `https://kappelhoj.com`).
* Install dependencies (`astro` core + optional integrations like `@astrojs/vue` if desired).

### Phase 2: Create Core Components & Layout
1. **[`Layout.astro`](file:///c:/Users/arvid/development/project/kappelhoj-web/src/layouts/Layout.astro):**
   - Base HTML structure with CSS Grid matching the original design.
   - Slot for page content (`<slot />`).
   - Shared CSS variables / styling.
2. **[`Header.astro`](file:///c:/Users/arvid/development/project/kappelhoj-web/src/components/Header.astro):**
   - Navigation links (`Home` -> `/`, `Dev` -> `/dev`).
3. **[`Footer.astro`](file:///c:/Users/arvid/development/project/kappelhoj-web/src/components/Footer.astro):**
   - LinkedIn & GitHub social links matching the current footer.

### Phase 3: Create Pages & Submodule Template
1. **[`index.astro`](file:///c:/Users/arvid/development/project/kappelhoj-web/src/pages/index.astro):**
   - Welcome landing page.
2. **[`dev.astro`](file:///c:/Users/arvid/development/project/kappelhoj-web/src/pages/dev.astro):**
   - Playground hub showcasing inserted submodules.
3. **Submodule Architecture Demonstration:**
   - Create sample submodules (e.g. an interactive HTMX snippet or canvas widget) to demonstrate how easy it is to drop new experiments into pages.

### Phase 4: Modernize CI/CD Pipeline (`web-build-and-publish.yml`)
Maintain the existing tag-based deployment flow while upgrading to modern Node & Action versions:

```yaml
name: Build and Publish to Github Pages

on:
  push:
    tags: 
      - '**'

jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Astro Site
        run: npm run build

      - name: Upload Build Artifact
        uses: actions/upload-artifact@v4
        with:
          name: web-publish
          path: ./dist

  deploy:
    needs: build-and-publish
    runs-on: ubuntu-latest
    steps:
      - name: Checkout gh-pages branch
        uses: actions/checkout@v4
        with: 
          ref: gh-pages

      - name: Clean existing files
        run: |
          git rm -rf . || true
          rm -rf *

      - name: Download Build Artifact
        uses: actions/download-artifact@v4
        with:
          name: web-publish
          path: .

      - name: Deploy to gh-pages
        run: |
          git config --global user.name "kappelhoj-build"
          git config --global user.email "kappelhoj-build@users.noreply.github.com"
          git add -A
          git commit -m "Deploy ${GITHUB_REF##*/}" || echo "No changes to commit"
          git push origin gh-pages
```

---

## 4. Verification & Testing
1. Test local build (`npm run build` producing static files in `dist/`).
2. Test local preview (`npm run preview` / `npm run dev`).
3. Verify routing for `/` and `/dev`.
4. Validate that GitHub Action workflow syntax is valid.
