# Kappelhoj Web — Developer & AI Guide

Welcome to **`kappelhoj-web`** (`www.kappelhoj.com`), a lightweight, modular personal website and playground built with **Astro**.

---

## 1. Branch Protection & Git Workflow

> [!IMPORTANT]
> The **`main` branch is protected** on GitHub. Direct pushes to `main` are disallowed.
> * Always create a feature branch (`git checkout -b feat/<name>`).
> * Open a Pull Request into `main` for changes.
> * Pushing Git tags (e.g., `v1.0.0`) triggers the automated CI/CD deployment to the `gh-pages` branch.

---

## 2. Project Architecture & Technologies

* **Framework:** [Astro](https://astro.build/) (Static Site Generation, 0 KB JS baseline).
* **Styles:** Scoped CSS + CSS custom properties (`--main-dark-color`, `--secondary-dark-color`, `--main-white-color`).
* **Submodule Architecture:** Standalone widgets and experiments located in `src/submodules/` that can be embedded into any page.
* **Hosting:** GitHub Pages via custom domain `www.kappelhoj.com` (configured in `public/CNAME`).

---

## 3. Directory Structure

```text
kappelhoj-web/
├── .github/
│   └── workflows/
│       └── web-build-and-publish.yml   # Tag-triggered GitHub Pages deployment
├── public/
│   ├── CNAME                           # Custom domain configuration (www.kappelhoj.com)
│   ├── favicon.ico
│   └── social-logos/                   # Social media branding icons
├── src/
│   ├── components/                     # Shared UI components
│   │   ├── Header.astro                # Site navigation
│   │   ├── Footer.astro                # Footer with social profile links
│   │   └── SubmoduleCard.astro         # Card container for modular experiments
│   ├── layouts/
│   │   └── Layout.astro                # Base HTML layout, header, footer, & styles
│   ├── pages/
│   │   ├── index.astro                 # Homepage (/)
│   │   └── dev.astro                   # Dev Playground (/dev)
│   ├── styles/
│   │   └── global.css                  # Global variables & typography
│   └── submodules/                     # Experiments & drop-in interactive widgets
│       ├── htmx-demo/
│       └── canvas-demo/
├── astro.config.mjs                    # Astro configuration
├── package.json                        # Scripts and dependencies
└── README.md
```

---

## 4. Development Commands

Run from `project/kappelhoj-web`:

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:4321)
npm run dev

# Build static site to dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 5. Adding New Submodules / Experiments

To add an experiment to the `/dev` playground:
1. Create a component in `src/submodules/<experiment-name>/` (as a `.astro`, `.html`, vanilla JS, HTMX, or framework component).
2. Import it into `src/pages/dev.astro` inside `<SubmoduleCard>`:
   ```astro
   ---
   import SubmoduleCard from '../components/SubmoduleCard.astro';
   import MyExperiment from '../submodules/my-experiment/Widget.astro';
   ---
   <SubmoduleCard title="My Experiment" description="Testing new ideas">
     <MyExperiment />
   </SubmoduleCard>
   ```
