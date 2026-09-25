# Kappelhoj.com

Personal website and developer playground for [Arvid Langsøe](https://www.kappelhoj.com).

Built with [Astro](https://astro.build/) for static HTML output with 0 KB JavaScript baseline, plus a modular architecture for experimenting with drop-in interactive submodules (HTMX, Canvas, Vue, etc.).

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:4321)
npm run dev

# Build static output to dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 🧩 Adding Submodules / Experiments

Submodules live in `src/submodules/` as isolated widgets or experiments. To embed one in the playground:

1. Create your component in `src/submodules/<my-experiment>/Widget.astro` (or `.html`, `.vue`, etc.).
2. Import and drop it into `src/pages/dev.astro`:

```astro
---
import SubmoduleCard from '../components/SubmoduleCard.astro';
import MyExperiment from '../submodules/my-experiment/Widget.astro';
---

<SubmoduleCard 
  title="My New Experiment" 
  description="Testing an interactive idea"
  techBadge="HTMX / Canvas"
>
  <MyExperiment />
</SubmoduleCard>
```

---

## 🛡️ Git Workflow & Deployment

* **Protected `main` branch:** All changes should be developed on feature branches and merged via Pull Request.
* **Automated GitHub Pages Deployment:** Pushing a Git tag (`git tag vX.Y.Z && git push --tags`) automatically builds the static site with GitHub Actions and publishes the `dist/` directory to the `gh-pages` branch.
