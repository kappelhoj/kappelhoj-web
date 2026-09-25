import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kappelhoj.com',
  outDir: './dist',
  build: {
    format: 'directory'
  }
});
