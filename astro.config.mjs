import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kappelhoj.eu',
  outDir: './dist',
  build: {
    format: 'directory'
  }
});
